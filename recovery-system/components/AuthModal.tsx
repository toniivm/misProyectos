'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { type PasswordResetResult, useAuth } from '../context/AuthContext';
import { useTranslations } from 'next-intl';

export default function AuthModal() {
  const {
    showModal, closeModal, signInWithGoogle, signInWithEmail,
    signUpWithEmail, requestPasswordReset, error,
  } = useAuth();

  const t = useTranslations('auth');

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetState, setResetState] = useState<PasswordResetResult | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!showModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimeout = setTimeout(() => emailRef.current?.focus(), 50);
    return () => {
      clearTimeout(focusTimeout);
      document.body.style.overflow = prev || '';
    };
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, closeModal]);

  useEffect(() => {
    if (showModal) return;
    setResetState(null);
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResetState(null);
    try {
      if (mode === 'login') await signInWithEmail(email, password);
      else await signUpWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setResetState(null);
    try { await signInWithGoogle(); }
    finally { setLoading(false); }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setResetState(null);
    try {
      const result = await requestPasswordReset(email);
      setResetState(result);
    } finally { setLoading(false); }
  };

  const switchMode = () => {
    setResetState(null);
    setMode((m) => (m === 'login' ? 'signup' : 'login'));
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-modal-title"
              className="relative max-h-[calc(100vh-2rem)] w-full max-w-sm overflow-y-auto rounded-2xl bg-[#0d1219] border border-white/[0.1] shadow-modal"
            >
              {/* Decorative gradient */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(16,191,216,0.06)] to-transparent rounded-t-2xl" />

              <button onClick={closeModal}
                className="absolute right-4 top-4 rounded-lg p-2 text-[#6b7785] transition hover:bg-white/[0.06] hover:text-[#f2eee7]"
                aria-label="Close">
                <X size={16} />
              </button>

              <div className="relative mb-6 mt-8 text-center px-6">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#8ea7c7] uppercase">
                  <Sparkles size={10} />
                  NOCTAS
                </div>
                <h2 id="auth-modal-title" className="mt-4 text-[22px] font-bold text-[#f6f2eb]">
                  {mode === 'login' ? t('welcomeBack') : t('createAccount')}
                </h2>
                <p className="mt-1.5 text-[13px] text-[#8791a1]">
                  {mode === 'login' ? t('signInToAccount') : t('createSubtitle')}
                </p>
              </div>

              <div className="px-6 pb-6">
                {/* Google */}
                <button onClick={handleGoogle} disabled={loading}
                  className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-[#c8d4e2] transition hover:bg-white/[0.06] hover:border-white/[0.2] active:scale-[0.98] disabled:opacity-60">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {t('continueWithGoogle')}
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <span className="text-[11px] text-[#5a6678]">{t('or')}</span>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a6678]" />
                    <input ref={emailRef} type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')} required autoComplete="email"
                      className="input-premium !pl-10" />
                  </div>

                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a6678]" />
                    <input type={showPassword ? 'text' : 'password'} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('passwordPlaceholder')} required minLength={6}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      className="input-premium !pl-10 !pr-10" />
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a6678] hover:text-[#c8d4e2]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button type="button" onClick={handlePasswordReset} disabled={loading}
                        className="text-[12px] font-semibold text-[#8791a1] transition hover:text-[#f2eee7] disabled:opacity-60">
                        {t('forgotPassword')}
                      </button>
                    </div>
                  )}

                  {error && (
                    <p className="rounded-xl bg-red-950/30 border border-red-900/40 px-4 py-2.5 text-[12px] text-red-400">{error}</p>
                  )}

                  {resetState && (
                    <p className="rounded-xl bg-emerald-950/30 border border-emerald-900/40 px-4 py-2.5 text-[12px] text-emerald-400">
                      {resetState === 'sent' ? t('resetSent') : t('resetDevHint')}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="btn-primary w-full py-3 disabled:opacity-60">
                    {loading ? t('loading') : mode === 'login' ? t('signIn') : t('createAccount')}
                  </button>
                </form>

                <p className="mt-4 text-center text-[12px] text-[#6b7785]">
                  {mode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                  <button onClick={switchMode}
                    className="font-semibold text-[#8ea7c7] hover:text-[#f2eee7] transition-colors">
                    {mode === 'login' ? t('signUp') : t('signIn')}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
