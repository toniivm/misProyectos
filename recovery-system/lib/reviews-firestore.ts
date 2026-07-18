import {
  collection, query, where, orderBy, getDocs, addDoc, serverTimestamp,
  doc, getDoc, updateDoc, increment, onSnapshot, type DocumentData,
} from 'firebase/firestore'
import { getDb } from './firebase'

export interface Review {
  id: string
  productSlug: string
  author: string
  userEmail: string
  rating: number
  title?: string
  comment: string
  verified: boolean
  helpful: number
  reported: boolean
  createdAt: string
}

const REVIEWS_COLLECTION = 'reviews'

function docToReview(docSnap: DocumentData): Review {
  const d = docSnap.data()
  return {
    id: docSnap.id,
    productSlug: d.productSlug,
    author: d.author,
    userEmail: d.userEmail,
    rating: d.rating,
    title: d.title,
    comment: d.comment,
    verified: d.verified,
    helpful: d.helpful ?? 0,
    reported: d.reported ?? false,
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
  }
}

export async function getProductReviews(productSlug: string): Promise<Review[]> {
  const db = getDb()
  if (!db) return []
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where('productSlug', '==', productSlug),
    where('reported', '==', false),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToReview)
}

export function subscribeToProductReviews(
  productSlug: string,
  callback: (reviews: Review[]) => void
): () => void {
  const db = getDb()
  if (!db) { callback([]); return () => {} }
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where('productSlug', '==', productSlug),
    where('reported', '==', false),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(docToReview))
  })
}

export async function hasUserReviewedProduct(userEmail: string, productSlug: string): Promise<boolean> {
  const db = getDb()
  if (!db || !userEmail) return false
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where('productSlug', '==', productSlug),
    where('userEmail', '==', userEmail.toLowerCase())
  )
  const snapshot = await getDocs(q)
  return !snapshot.empty
}

export async function submitReview(review: Omit<Review, 'id' | 'helpful' | 'reported' | 'createdAt'>): Promise<{ ok: boolean; error?: string }> {
  const db = getDb()
  if (!db) return { ok: false, error: 'Database not configured' }

  const exists = await hasUserReviewedProduct(review.userEmail, review.productSlug)
  if (exists) return { ok: false, error: 'You have already reviewed this product' }

  await addDoc(collection(db, REVIEWS_COLLECTION), {
    ...review,
    userEmail: review.userEmail.toLowerCase(),
    helpful: 0,
    reported: false,
    createdAt: serverTimestamp(),
  })

  return { ok: true }
}

export async function markReviewHelpful(reviewId: string): Promise<void> {
  const db = getDb()
  if (!db) return
  const ref = doc(db, REVIEWS_COLLECTION, reviewId)
  await updateDoc(ref, { helpful: increment(1) })
}

export async function reportReview(reviewId: string): Promise<void> {
  const db = getDb()
  if (!db) return
  const ref = doc(db, REVIEWS_COLLECTION, reviewId)
  await updateDoc(ref, { reported: true })
}

export interface ReviewStats {
  average: number
  total: number
  distribution: Record<number, number>
}

export function calculateReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) {
    return { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number> }
  }
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let sum = 0
  for (const r of reviews) {
    const rounded = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5
    distribution[rounded]++
    sum += r.rating
  }
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    total: reviews.length,
    distribution,
  }
}

export async function getProductReviewStats(productSlug: string): Promise<ReviewStats> {
  const reviews = await getProductReviews(productSlug)
  return calculateReviewStats(reviews)
}
