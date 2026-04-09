import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, LogIn, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { Translation } from '../types';

interface UserMenuProps {
  t: Translation;
}

export const UserMenu = ({ t }: UserMenuProps) => {
  const { user, signInWithGoogle, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-xs font-bold uppercase border border-white/10"
      >
        <LogIn className="w-4 h-4 text-france-blue" />
        <span className="hidden sm:inline">{t.login}</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
      >
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-[10px] text-white/50 leading-none uppercase">{t.welcome}</span>
          <span className="text-xs font-bold text-white leading-tight">{user.displayName?.split(' ')[0]}</span>
        </div>
        <div className="relative">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full border border-france-blue/30 group-hover:border-france-blue transition-colors"
          />
          <ChevronDown className={cn("absolute -bottom-1 -right-1 w-3 h-3 bg-slate-900 rounded-full transition-transform", isOpen && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-white/5 mb-2">
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{t.profile}</p>
              <p className="text-sm font-semibold truncate text-france-blue">{user.email}</p>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
            >
              <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t.profile}
            </button>

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-france-red hover:bg-france-red/10 rounded-xl transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              {t.logout}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
