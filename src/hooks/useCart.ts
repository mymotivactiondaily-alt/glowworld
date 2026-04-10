import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent } from '../lib/analytics';
import type { Product, CartItem, Translation } from '../types';

export const useCart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isInitialMount = useRef(true);

  // Load cart from Firestore on login
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const remoteCart = cartSnap.data().items || [];
            if (remoteCart.length > 0) {
              setCart(remoteCart);
            }
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        // Clear cart on logout if desired, or keep local
        // setCart([]); 
      }
    };
    loadCart();
  }, [user]);

  // Save cart to Firestore on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const saveCart = async () => {
      if (user) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, {
            items: cart,
            updatedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    const timeoutId = setTimeout(saveCart, 1000); // Debounce saves
    return () => clearTimeout(timeoutId);
  }, [cart, user]);

  const addToCart = (product: Product) => {
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name.fr,
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

  const clearCart = async () => {
    setCart([]);
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: [], updatedAt: new Date().toISOString() });
      } catch (error) {
        console.error('Error clearing remote cart:', error);
      }
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async (t: Translation) => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    trackEvent('begin_checkout', {
      value: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      currency: 'EUR',
      items: cart.map((item) => ({
        item_id: item.id,
        item_name: item.name.fr,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          lang: t._lang,
          userId: user?.uid,
          userEmail: user?.email 
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t._lang === 'fr' 
        ? `Erreur lors du paiement : ${error instanceof Error ? error.message : 'Détail inconnu'}` 
        : `Payment error: ${error instanceof Error ? error.message : 'Unknown detail'}`);
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
