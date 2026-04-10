import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, X, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { Translation } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
}

type AuthView = 'login' | 'signup' | 'reset-password';

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Cette adresse e-mail est déjà utilisée.',
  'auth/invalid-email': 'L\'adresse e-mail n\'est pas valide.',
  'auth/operation-not-allowed': 'Cette méthode n\'est pas activée.',
  'auth/weak-password': 'Le mot de passe est trop court.',
  'auth/user-not-found': 'Aucun compte trouvé avec cet e-mail.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-credential': 'Identifiants invalides.',
  'auth/popup-closed-by-user': 'Connexion Google annulée.',
};

export const AuthModal = ({ isOpen, onClose, t }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView('login');
        setError(null);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('');
        setIsSubmitting(false);
        setResetSent(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (view === 'login') {
        await signInWithEmail(email, password);
        onClose();
      } else if (view === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('passwords-don-t-match');
        }
        await signUpWithEmail(email, password, displayName);
        onClose();
      } else if (view === 'reset-password') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err: any) {
      if (err.message === 'passwords-don-t-match') {
        setError('Les mots de passe ne correspondent pas.');
      } else {
        setError(authErrorMessages[err.code] || 'Une erreur est survenue.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(authErrorMessages[err.code] || 'Connexion Google échouée.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {view === 'login' ? 'Bon retour !' : view === 'signup' ? 'Créer un compte' : 'Réinitialiser'}
                </h2>
                <p className="text-sm text-white/50">
                  {view === 'login' 
                    ? 'Connectez-vous pour gérer vos commandes' 
                    : view === 'signup' 
                      ? 'Rejoignez l\'aventure GlowWorld 2026' 
                      : 'Saisissez votre e-mail pour recevoir un lien'}
                </p>
              </div>

              {/* Tabs */}
              {view !== 'reset-password' && (
                <div className="flex p-1 bg-white/5 rounded-xl mb-6">
                  <button
                    onClick={() => setView('login')}
                    className={cn(
                      "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                      view === 'login' ? "bg-france-blue text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => setView('signup')}
                    className={cn(
                      "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                      view === 'signup' ? "bg-france-blue text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    S'inscrire
                  </button>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-france-red/10 border border-france-red/20 rounded-xl flex items-center gap-3 text-france-red text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {resetSent ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-white/70 mb-6">
                    Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
                  </p>
                  <button
                    onClick={() => setView('login')}
                    className="text-france-blue hover:underline text-sm font-bold"
                  >
                    Retour à la connexion
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {view === 'signup' && (
                    <div className="space-y-1">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="text"
                          placeholder="Nom complet"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-france-blue/50 focus:ring-1 focus:ring-france-blue/50 transition-all font-medium"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="email"
                        placeholder="Adresse e-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-france-blue/50 focus:ring-1 focus:ring-france-blue/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {view !== 'reset-password' && (
                    <div className="space-y-1">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="password"
                          placeholder="Mot de passe"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-france-blue/50 focus:ring-1 focus:ring-france-blue/50 transition-all font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {view === 'signup' && (
                    <div className="space-y-1">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-france-blue/50 focus:ring-1 focus:ring-france-blue/50 transition-all font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {view === 'login' && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setView('reset-password')}
                        className="text-xs text-france-blue hover:text-france-blue/80 font-bold transition-colors"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-france-blue hover:bg-france-blue/90 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {view === 'login' ? 'Se connecter' : view === 'signup' ? 'S\'inscrire' : 'Envoyer le lien'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {view === 'reset-password' && (
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="w-full text-center text-sm text-white/40 hover:text-white transition-colors"
                    >
                      Annuler
                    </button>
                  )}
                </form>
              )}

              {/* Separator */}
              {view !== 'reset-password' && !resetSent && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-[#0f172a] px-4 text-white/30 font-bold tracking-[0.2em]">OU</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continuer avec Google
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
