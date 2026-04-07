import { useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Product, CartItem, Translation } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addToCart = (product: Product) => {
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      currency: 'EUR',
    });
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async (t: Translation) => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    trackEvent('begin_checkout', {
      value: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      currency: 'EUR',
      items: cart.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, lang: t._lang }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t._lang === 'fr' ? 'Erreur lors du paiement. Veuillez réessayer.' : 'Payment error. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    isCheckingOut,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    handleCheckout,
  };
};
