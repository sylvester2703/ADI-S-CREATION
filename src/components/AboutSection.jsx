import React from 'react';
import { Sparkles, CheckCircle2, Heart, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function AboutSection({ onExploreClick, onOpenEnquiry }) {
  return (
    <section id="about" className="section-padding" style={{
      background: 'linear-gradient(180deg, #FAF4EB 0%, #FDFBF7 100%)',
      position: 'relative',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Sparkles size={15} color="#D4AF37" className="diya-glow" />
            <span>Our Heritage &amp; Craft</span>
          </div>
          <h2 className="section-title">
            {BRAND_INFO.aboutHeading}
          </h2>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="about-grid">

          {/* Left Column: Brand Emblem Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#3D0816',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--gold-500)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center',
              color: '#FFF',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Gold Top Light Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
              }} />

              <img 
                src="/assets/brand/adis_creation_logo.jpg" 
                alt="Adi's Creation – Lights n Lamps" 
                style={{
                  maxWidth: '240px',
                  margin: '0 auto 1.5rem auto',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              />

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#F6E6AC',
                marginBottom: '0.4rem'
              }}>
                ADI’S CREATION
              </div>

              <div style={{
                fontSize: '0.9rem',
                color: '#D4AF37',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                Lights n Lamps • Hadapsar, Pune
              </div>

              <p style={{
                fontStyle: 'italic',
                fontFamily: 'var(--font-editorial)',
                color: '#EEDBDF',
                fontSize: '1.05rem',
                lineHeight: 1.6
              }}>
                “Decorate Your Homes With Adi’s Creation”
              </p>

              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                display: 'flex',
                justifyContent: 'space-around',
                fontSize: '0.85rem',
                color: '#F6E6AC'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>15 Years</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Legacy</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(212, 175, 55, 0.3)' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>50+</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Varieties/Yr</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(212, 175, 55, 0.3)' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Diwali 2026</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Collection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Story Copy */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              {BRAND_INFO.aboutStory.map((paragraph, index) => (
                <p key={index} style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)'
                }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Brochure Tenet Chips */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2rem',
              background: '#FFF',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#027A48" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  15 Years of Crafting Tradition
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#027A48" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  50+ Diya Varieties Every Year
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#027A48" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  New Designs Every Diwali
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#027A48" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Affordable For Everyone
                </span>
              </div>
            </div>

            {/* Closing Line */}
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--maroon-50)',
              borderLeft: '4px solid var(--maroon-800)',
              color: 'var(--maroon-900)',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '2rem'
            }}>
              <Flame size={20} color="#BA922B" className="diya-glow" />
              <span>{BRAND_INFO.closingLine}</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={onExploreClick} className="btn btn-primary">
                <span>Browse 2026 Collection</span>
              </button>
              <button onClick={onOpenEnquiry} className="btn btn-outline">
                <span>Connect with Rani Toshniwal</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
