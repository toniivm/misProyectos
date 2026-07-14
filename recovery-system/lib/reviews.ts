export interface Review {
  id: string;
  productSlug: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  author: string;
  userEmail: string;
  verified: boolean;
  helpful: number;
  reported: boolean;
}

const STORAGE_KEY = 'noctip_reviews';
const ORDERS_KEY = 'noctas_orders';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getAllReviews(): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAllReviews(reviews: Review[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // localStorage full or unavailable
  }
}

export function getProductReviews(productSlug: string): Review[] {
  return getAllReviews()
    .filter((r) => r.productSlug === productSlug && !r.reported)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProductReviewStats(productSlug: string): {
  average: number;
  total: number;
  distribution: Record<number, number>;
} {
  const reviews = getAllReviews().filter(
    (r) => r.productSlug === productSlug && !r.reported,
  );
  const total = reviews.length;
  if (total === 0) return { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };

  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of reviews) {
    distribution[r.rating as keyof typeof distribution]++;
  }

  return {
    average: Math.round((sum / total) * 10) / 10,
    total,
    distribution,
  };
}

export function hasUserReviewedProduct(productSlug: string, userEmail: string): boolean {
  return getAllReviews().some(
    (r) => r.productSlug === productSlug && r.userEmail === userEmail,
  );
}

export function hasUserPurchasedProduct(userEmail: string, productSlug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return false;
    const orders = JSON.parse(raw);
    if (typeof orders !== 'object') return false;

    return Object.values(orders).some((order: any) => {
      if (!order) return false;
      const orderEmail = order.email?.toLowerCase();
      const isPaid = order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered';
      const hasProduct = order.items?.some((item: any) => {
        const itemId = item.id || item.slug;
        return itemId === productSlug;
      });
      return orderEmail === userEmail.toLowerCase() && isPaid && hasProduct;
    });
  } catch {
    return false;
  }
}

export function addReview(review: Omit<Review, 'id' | 'date' | 'helpful' | 'reported'>): Review {
  const all = getAllReviews();
  const newReview: Review = {
    ...review,
    id: generateId(),
    date: new Date().toISOString(),
    helpful: 0,
    reported: false,
  };
  all.push(newReview);
  saveAllReviews(all);
  return newReview;
}

export function toggleHelpful(reviewId: string): void {
  const all = getAllReviews();
  const idx = all.findIndex((r) => r.id === reviewId);
  if (idx !== -1) {
    all[idx].helpful += 1;
    saveAllReviews(all);
  }
}

export function reportReview(reviewId: string): void {
  const all = getAllReviews();
  const idx = all.findIndex((r) => r.id === reviewId);
  if (idx !== -1) {
    all[idx].reported = true;
    saveAllReviews(all);
  }
}

export function sortReviews(reviews: Review[], sortBy: string): Review[] {
  const sorted = [...reviews];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'highest':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'helpful':
      return sorted.sort((a, b) => b.helpful - a.helpful);
    default:
      return sorted;
  }
}
