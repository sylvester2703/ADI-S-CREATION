import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import ProductDetailModal from './components/ProductDetailModal';
import EnquiryModal from './components/EnquiryModal';

// Pages
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import BestSellersPage from './pages/BestSellersPage';
import BrochurePage from './pages/BrochurePage';
import AboutPage from './pages/AboutPage';
import HowToEnquirePage from './pages/HowToEnquirePage';
import ContactPage from './pages/ContactPage';
import PrivacyTermsPage from './pages/PrivacyTermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'about', 'collection', 'bestsellers', 'brochure', 'how-to-enquire', 'contact', 'privacy-terms', 'admin-login', 'admin-dashboard'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  // Admin session state
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adis_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adis_admin_user')) || null;
    } catch {
      return null;
    }
  });

  // Sync hash routing
  useEffect(() => {
    window.location.hash = activePage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== activePage) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage]);

  const handleOpenEnquiry = (product = null) => {
    setEnquiryProduct(product);
    setEnquiryModalOpen(true);
  };

  const handleAdminLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    setActivePage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adis_admin_token');
    localStorage.removeItem('adis_admin_user');
    setAdminToken(null);
    setAdminUser(null);
    setActivePage('admin-login');
  };

  // Render Admin Dashboard directly if requested & authenticated
  if (activePage === 'admin-dashboard') {
    if (!adminToken) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToSite={() => setActivePage('home')}
        />
      );
    }
    return (
      <AdminDashboardPage
        token={adminToken}
        user={adminUser}
        onLogout={handleAdminLogout}
        onBackToSite={() => setActivePage('home')}
      />
    );
  }

  // Render Admin Login Page
  if (activePage === 'admin-login') {
    if (adminToken) {
      return (
        <AdminDashboardPage
          token={adminToken}
          user={adminUser}
          onLogout={handleAdminLogout}
          onBackToSite={() => setActivePage('home')}
        />
      );
    }
    return (
      <AdminLoginPage
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToSite={() => setActivePage('home')}
      />
    );
  }

  // Customer-facing website layout
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Page Views */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'collection' && (
          <CollectionPage
            setActivePage={setActivePage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'bestsellers' && (
          <BestSellersPage
            setActivePage={setActivePage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'brochure' && (
          <BrochurePage
            setActivePage={setActivePage}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'how-to-enquire' && (
          <HowToEnquirePage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            setActivePage={setActivePage}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activePage === 'privacy-terms' && (
          <PrivacyTermsPage
            setActivePage={setActivePage}
          />
        )}

        {!['home', 'collection', 'bestsellers', 'brochure', 'about', 'how-to-enquire', 'contact', 'privacy-terms', 'admin-login', 'admin-dashboard'].includes(activePage) && (
          <NotFoundPage setActivePage={setActivePage} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenEnquiry={() => handleOpenEnquiry()}
        adminToken={adminToken}
      />

      {/* Floating WhatsApp & Mobile Sticky Action Bar */}
      <WhatsAppFloatingButton onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={(prod) => handleOpenEnquiry(prod)}
        />
      )}

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          initialProduct={enquiryProduct}
          onClose={() => {
            setEnquiryModalOpen(false);
            setEnquiryProduct(null);
          }}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
