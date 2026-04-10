import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, LogIn, ChevronDown, X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { Translation } from '../types';

interface UserMenuProps { t: Translation; }

const FIREBASE_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'Cet email est déjà utilisé.',
  'auth/invalid-email': 'Email invalide.',
  'auth/weak-password': 'Mot de passe trop court (6 caractères minimum).',
  'auth/user-not-found': 'Aucun compte avec cet email.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-credential': 'Email ou mot de passe incorrect.',
  'auth/popup-closed-by-user': 'Connexion annulée.',
  'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
};

export const UserMenu = ({ t }: UserMenuProps) => {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ferme le modal quand l'utilisateur est connecté
  useEffect(() => { if (user) setShowModal(false); }, [user]);

  const resetForm = () => { setEmail(''); setPassword(''); setConfirmPassword(''); setDisplayName(''); setError(''); setSuccess(''); };

  const handleSubmit = async () => {
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      if (tab === 'login') {
        await signInWithEmail(email, password);
      } else if (tab === 'signup') {
        if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas.'); return; }
        if (password.length < 6) { setError('Mot de passe trop court (6 caractères minimum).'); return; }
        await signUpWithEmail(email, password, displayName);
      } else if (tab === 'reset') {
        await resetPassword(email);
        setSuccess('Email de réinitialisation envoyé ! Vérifiez votre boîte mail.');
      }
    } catch (err: any) {
      setError(FIREBASE_ERRORS[err.code] || 'Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(''); setSubmitting(true);
    try { await signInWithGoogle(); }
    catch (err: any) { setError(FIREBASE_ERRORS[err.code] || 'Erreur Google Sign-In.'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;

  if (!user) return (
    <>
      <button onClick={() => { resetForm(); setShowModal(true); }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-xs font-bold uppercase border border-white/10">
        <LogIn className="w-4 h-4 text-france-blue" />
        <span className="hidden sm:inline">{t.login}</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">
                  {tab === 'reset' ? 'Réinitialiser' : tab === 'login' ? 'Connexion' : 'Créer un compte'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {tab !== 'reset' && (
                <div className="flex bg-white/5 rounded-xl p-1 mb-5">
                  {(['login', 'signup'] as const).map(t => (
                    <button key={t} onClick={() => { setTab(t); resetForm(); }}
                      className={cn("flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all",
                        tab === t ? "bg-france-blue text-white" : "text-white/50 hover:text-white")}>
                      {t === 'login' ? 'Connexion' : 'Inscription'}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {tab === 'signup' && (
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                      placeholder="Prénom et nom" type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-france-blue" />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Email" type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-france-blue" />
                </div>
                {tab !== 'reset' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Mot de passe" type={showPassword ? 'text' : 'password'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-france-blue" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                )}
                {tab === 'signup' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirmer le mot de passe" type={showPassword ? 'text' : 'password'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-france-blue" />
                  </div>
                )}
              </div>

              {error && <p className="text-france-red text-xs mt-3">{error}</p>}
              {success && <p className="text-green-400 text-xs mt-3">{success}</p>}

              {tab === 'login' && (
                <button onClick={() => { setTab('reset'); resetForm(); }} className="text-xs text-white/40 hover:text-france-blue mt-2 block transition-colors">
                  Mot de passe oublié ?
                </button>
              )}
              {tab === 'reset' && (
                <button onClick={() => { setTab('login'); resetForm(); }} className="text-xs text-white/40 hover:text-france-blue mt-2 block transition-colors">
                  ← Retour à la connexion
                </button>
              )}

              <button onClick={handleSubmit} disabled={submitting}
                className="w-full mt-4 py-3 bg-france-blue hover:bg-france-blue/80 disabled:opacity-50 text-white font-bold rounded-xl transition-all text-sm">
                {submitting ? '...' : tab === 'login' ? 'Se connecter' : tab === 'signup' ? "S'inscrire" : 'Envoyer'}
              </button>

              {tab !== 'reset' && (
                <>
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/30">ou</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <button onClick={handleGoogle} disabled={submitting}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group">
        <div className="flex-col items-end hidden sm:flex">
          <span className="text-[10px] text-white/50 leading-none uppercase">{t.welcome}</span>
          <span className="text-xs font-bold text-white leading-tight">{user.displayName?.split(' ')[0]}</span>
        </div>
        <div className="relative">
          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full border border-france-blue/30 group-hover:border-france-blue transition-colors" />
          <ChevronDown className={cn("absolute -bottom-1 -right-1 w-3 h-3 bg-slate-900 rounded-full transition-transform", isOpen && "rotate-180")} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50">
            <div className="px-3 py-2 border-b border-white/5 mb-2">
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{t.profile}</p>
              <p className="text-sm font-semibold truncate text-france-blue">{user.email}</p>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
              <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t.profile}
            </button>
            <button onClick={() => { logout(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-france-red hover:bg-france-red/10 rounded-xl transition-all group">
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              {t.logout}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
