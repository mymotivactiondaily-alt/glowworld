import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart, X, CheckCircle, Loader2 } from 'lucide-react';
import type { CartItem, Translation } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  t: Translation;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  t,
  onCheckout,
  isCheckingOut,
}: CartDrawerProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900 z-[70] p-8 flex flex-col shadow-2xl border-l border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{t.cart_title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-white/50 mb-8">{t.cart_empty}</p>
                  <button
                    onClick={onClose}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-all border border-white/10"
                  >
                    {t.cart_continue}
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <img 
                          src={item.image} 
                          alt={item.name[t._lang as 'fr' | 'en' | 'es'] || item.name.fr} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm leading-tight">
                            {item.name[t._lang as 'fr' | 'en' | 'es'] || item.name.fr}
                          </h4>
                          <button onClick={() => onRemove(item.id)} className="text-white/40 hover:text-france-red">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      <p className="text-france-red font-bold text-sm mb-2">{item.price}€</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-8 border-t border-white/10 mt-auto">
                {/* Upsell */}
                {cart.length === 1 && (
                  <div className="mb-6 p-4 bg-france-blue/20 border border-france-blue/30 rounded-xl">
                    <p className="text-xs font-bold mb-2 text-france-blue uppercase tracking-wider">
                      {t.cart_upsell_title}
                    </p>
                    <p className="text-sm mb-3">
                      {t.cart_upsell_desc}
                    </p>
                    <button className="text-xs font-black uppercase underline hover:text-france-blue">
                      {t.cart_upsell_cta}
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/60 font-bold uppercase tracking-widest text-xs">{t.cart_total}</span>
                  <span className="text-3xl font-black text-france-red">{total.toFixed(2)}€</span>
                </div>
                <button
                  onClick={onCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-france-blue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all relative flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Chargement...</>
                  ) : (
                    t.cart_checkout
                  )}
                </button>
                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {t.trust_badge}
                  </div>
                  <div className="flex justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-4" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
