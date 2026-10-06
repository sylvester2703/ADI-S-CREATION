import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Sparkles, Download, Shield } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function Navbar({ activePage, setActivePage, onOpenEnquiry, onSelectProduct }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'collection', label: 'Collection' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'brochure', label: 'Brochure' },
    { id: 'how-to-enquire', label: 'How to Enquire' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #3D0816 0%, #5C0F22 50%, #3D0816 100%)',
        color: '#FDFBF7',
        fontSize: '0.8rem',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        letterSpacing: '0.03em'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#D4AF37', fontWeight: 600 }}>
          <Sparkles size={14} className="diya-glow" /> 15 Years of Crafting Festive Light
        </span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span style={{ display: 'none', md: 'inline' }} className="hidden-mobile">
          India-Wide &amp; International Supply Available
        </span>
        <span style={{ opacity: 0.5 }}>•</span>
        <a href="tel:7058182383" style={{ color: '#F6E6AC', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Phone size={12} /> Call: 7058182383
        </a>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem' }}>
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textAlign: 'left', cursor: 'pointer' }}
          aria-label="Adi's Creation Home"
        >
          <img 
            src="/assets/brand/adis_creation_logo.jpg" 
            alt="Adi's Creation Logo" 
            style={{ 
              height: '48px', 
              width: 'auto', 
              borderRadius: '8px', 
              border: '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 2px 8px rgba(61, 8, 22, 0.12)'
            }} 
          />
          <div>
            <div style={{ 
              fontFamily: 'var(--font-serif)', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              color: 'var(--maroon-900)',
              letterSpacing: '0.04em',
              lineHeight: 1.1
            }}>
              ADI’S CREATION
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--terracotta-600)', 
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Lights n Lamps • Diya 2026
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: activePage === item.id ? 700 : 500,
                    color: activePage === item.id ? 'var(--maroon-800)' : 'var(--text-secondary)',
                    padding: '0.35rem 0',
                    position: 'relative',
                    transition: 'color var(--transition-fast)',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                  {activePage === item.id && (
                    <span style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--maroon-800), var(--gold-500))',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => onOpenEnquiry()}
            className="btn btn-primary btn-sm hidden-mobile"
            style={{ display: 'none' }}
            id="desktop-enquire-btn"
          >
            <MessageSquare size={16} />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: '0.55rem',
              color: 'var(--maroon-900)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              background: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFF',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '2px solid var(--gold-500)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.25rem',
          animation: 'fadeIn 0.2s ease-out forwards'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: activePage === item.id ? 700 : 500,
                  fontSize: '1rem',
                  color: activePage === item.id ? 'var(--maroon-900)' : 'var(--text-primary)',
                  background: activePage === item.id ? 'var(--maroon-50)' : 'transparent',
                  borderLeft: activePage === item.id ? '3px solid var(--maroon-800)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.label}</span>
                {activePage === item.id && <Sparkles size={16} color="#BA922B" />}
              </button>
            ))}

            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.5rem 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.4rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} />
                <span>Enquire</span>
              </button>

              <a
                href="tel:7058182383"
                className="btn btn-outline btn-sm"
                style={{ width: '100%' }}
              >
                <Phone size={16} />
                <span>Call Us</span>
              </a>
            </div>

            <button
              onClick={() => handleNavClick('admin-login')}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Shield size={13} />
              <span>Admin Portal Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Style hook for responsive desktop nav visibility */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: block !important; }
          #desktop-enquire-btn { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
          .hidden-mobile { display: inline !important; }
        }
      `}</style>
    </header>
  );
}
