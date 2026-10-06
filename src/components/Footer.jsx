import React from 'react';
import { Sparkles, Phone, MapPin, Mail, Shield, Download, Lock, LayoutDashboard } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function Footer({ setActivePage, onOpenEnquiry, adminToken }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#24060E',
      color: '#FDFBF7',
      borderTop: '3px solid var(--gold-500)',
      paddingTop: '4rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="container">
        
        {/* Main 4 Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img 
                src="/assets/brand/adis_creation_logo.jpg" 
                alt="Adi's Creation Logo" 
                style={{ height: '52px', width: 'auto', borderRadius: '8px', border: '1px solid #D4AF37' }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#F6E6AC',
                  letterSpacing: '0.04em'
                }}>
                  ADI’S CREATION
                </div>
                <div style={{ fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Lights n Lamps
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.9rem',
              color: '#EADBCE',
              lineHeight: 1.7,
              marginBottom: '1rem',
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic'
            }}>
              “{BRAND_INFO.tagline}”
            </p>

            <div style={{
              fontSize: '0.8rem',
              color: '#C7B2A4',
              lineHeight: 1.6
            }}>
              Handcrafted diya collection celebrating 15 years of artistry, warmth, and festive tradition for Diwali 2026.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              color: '#F6E6AC',
              fontWeight: 700,
              marginBottom: '1.25rem',
              position: 'relative',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              Explore Collection
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <button onClick={() => handleNav('home')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  About Adi's Creation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('collection')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  2026 Diya Collection
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bestsellers')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  Best Seller Diyas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('brochure')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  Digital Brochure (18 Pages)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-to-enquire')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  How to Enquire
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Information & Delivery */}
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              color: '#F6E6AC',
              fontWeight: 700,
              marginBottom: '1.25rem',
              position: 'relative',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              Customer &amp; Orders
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => onOpenEnquiry()} style={{ color: '#F6E6AC', fontWeight: 600, cursor: 'pointer' }}>
                  • Make an Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-to-enquire')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  • Home Delivery Details
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-to-enquire')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  • India-Wide Supply
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-to-enquire')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  • International Supply
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy-terms')} style={{ color: '#EADBCE', cursor: 'pointer' }}>
                  • Privacy Policy &amp; Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Person & Details */}
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              color: '#F6E6AC',
              fontWeight: 700,
              marginBottom: '1.25rem',
              position: 'relative',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              Contact &amp; Studio
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#EADBCE' }}>
              <div style={{ fontWeight: 700, color: '#FFF' }}>
                {BRAND_INFO.founder}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="#D4AF37" />
                <a href={`mailto:${BRAND_INFO.email}`} style={{ color: '#F6E6AC' }}>
                  {BRAND_INFO.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} color="#D4AF37" />
                <span>{BRAND_INFO.location}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {BRAND_INFO.phones.map((p, idx) => (
                  <a key={idx} href={`tel:${p.number}`} style={{ color: '#F6E6AC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={14} />
                    <span>{p.number}</span>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href="/assets/brochure/Adis_Creation_Diya_Collection_2026.pdf"
                  download="Adis_Creation_Diya_Collection_2026.pdf"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#D4AF37',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  <Download size={14} /> Download 2026 Brochure PDF
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Admin Dashboard Banner at bottom */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(61, 8, 22, 0.9) 0%, rgba(92, 15, 34, 0.9) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F6E6AC'
            }}>
              <Shield size={22} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#F6E6AC'
              }}>
                Admin Dashboard &amp; CRM Portal
              </div>
              <div style={{ fontSize: '0.82rem', color: '#EADBCE' }}>
                Secure lead management, order tracking, and status controls for Adi's Creation
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNav(adminToken ? 'admin-dashboard' : 'admin-login')}
            className="btn btn-gold btn-sm"
            style={{ padding: '0.65rem 1.35rem', fontWeight: 700 }}
          >
            <LayoutDashboard size={16} />
            <span>{adminToken ? 'Open Admin Dashboard' : 'Admin Login (Dashboard)'}</span>
          </button>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#A89284'
        }}>
          <div>
            © 2026 Adi’s Creation. All Rights Reserved. • Hadapsar, Pune • Email: knowaboutrani@gmail.com
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => handleNav('privacy-terms')}
              style={{ color: '#A89284', cursor: 'pointer' }}
            >
              Privacy &amp; Terms
            </button>
            <button
              onClick={() => handleNav(adminToken ? 'admin-dashboard' : 'admin-login')}
              style={{
                color: '#D4AF37',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <Shield size={14} />
              <span>Admin Portal ({adminToken ? 'Dashboard Active' : 'Sign In'})</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
