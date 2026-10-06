import React from 'react';
import { Phone, MessageSquare, MapPin, User, Sparkles, Mail, Send } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function ContactSection({ onOpenEnquiry }) {
  const generalWhatsappMsg = encodeURIComponent(
    "Hello Adi’s Creation, I would like to enquire about your Diya Collection 2026."
  );

  return (
    <section id="contact" className="section-padding" style={{
      background: '#FFF',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Sparkles size={15} color="#D4AF37" className="diya-glow" />
            <span>Direct Business Communication</span>
          </div>
          <h2 className="section-title">
            Connect With Adi’s Creation
          </h2>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            We are here to assist you with single pieces, pair sets, custom festive requirements, and India-wide or international shipments.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto 3rem auto'
        }}>
          {/* Founder & Call Card */}
          <div className="card-luxury" style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-primary)' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--maroon-100)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <User size={28} color="var(--maroon-800)" />
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Founder &amp; Artisan
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              color: 'var(--maroon-900)',
              marginBottom: '0.5rem'
            }}>
              {BRAND_INFO.founder}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <Mail size={14} color="var(--terracotta-600)" />
              <a href={`mailto:${BRAND_INFO.email}`} style={{ color: 'var(--maroon-800)', fontSize: '0.88rem', fontWeight: 600 }}>
                {BRAND_INFO.email}
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
              {BRAND_INFO.phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.number}`}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '0.95rem' }}
                >
                  <Phone size={16} />
                  <span>Call {phone.number}</span>
                </a>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Click to call directly on mobile
            </div>
          </div>

          {/* Location & WhatsApp Card */}
          <div className="card-luxury" style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-primary)' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--gold-100)',
              border: '1px solid var(--gold-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <MapPin size={28} color="var(--gold-800)" />
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Workshop &amp; Studio Location
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              color: 'var(--maroon-900)',
              marginBottom: '1.25rem'
            }}>
              {BRAND_INFO.location}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${generalWhatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                <MessageSquare size={16} />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                <Send size={16} />
                <span>Submit Detailed Enquiry</span>
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Pune Studio Pickup • All-India &amp; International Delivery
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'linear-gradient(135deg, #FCF4F7 0%, #FAF1E4 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-gold)',
          maxWidth: '780px',
          margin: '0 auto'
        }}>
          <div style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
            color: 'var(--maroon-900)',
            fontStyle: 'italic',
            marginBottom: '0.4rem'
          }}>
            “{BRAND_INFO.tagline}”
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--terracotta-700)', fontWeight: 600, letterSpacing: '0.05em' }}>
            ADI’S CREATION • LIGHTS N LAMPS • DIYA COLLECTION 2026
          </div>
        </div>

      </div>
    </section>
  );
}
