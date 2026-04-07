/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TRANSLATIONS } from './i18n/translations';
import { trackEvent } from './lib/analytics';
import { useCart } from './hooks/useCart';
import type { Lang } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SocialProof } from './components/SocialProof';
import { HowItWorks } from './components/HowItWorks';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { AppPage } from './pages/AppPage';
import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';
import { LegalPage } from './pages/LegalPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPage } from './pages/ShippingPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const [lang, setLang] = useState<Lang>('fr');
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const {
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
  } = useCart();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });

    if (location.pathname === '/success') {
      clearCart();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} lang={lang} setLang={setLang} t={t} />
      <SocialProof />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<><HomePage onAddToCart={addToCart} t={t} /><HowItWorks t={t} /></>} />
          <Route path="/catalog" element={<CatalogPage onAddToCart={addToCart} t={t} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} t={t} />} />
          <Route path="/blog" element={<BlogPage t={t} />} />
          <Route path="/blog/:slug" element={<BlogPostPage t={t} />} />
          <Route path="/about" element={<AboutPage t={t} />} />
          <Route path="/partners" element={<PartnersPage t={t} />} />
          <Route path="/app" element={<AppPage t={t} />} />
          <Route path="/success" element={<SuccessPage t={t} />} />
          <Route path="/cancel" element={<CancelPage t={t} />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer t={t} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        t={t}
        onCheckout={() => handleCheckout(t)}
        isCheckingOut={isCheckingOut}
      />

      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}
