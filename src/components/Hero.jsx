import React from 'react';
import { Sparkles, BookOpen, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function Hero({ onExploreClick, onViewBrochureClick, onOpenEnquiry }) {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #FDFBF7 0%, #F6EFE2 100%)',
      padding: '3.5rem 0 4.5rem 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Background Decorative Rings */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(92, 15, 34, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Left Column: Brand Story & Headlines */}
          <div style={{ textAlign: 'center' }} className="hero-text-col">
            {/* Top Heritage Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'linear-gradient(135deg, #FCF4F7 0%, #F9EBEF 100%)',
              border: '1px solid rgba(92, 15, 34, 0.2)',
              color: 'var(--maroon-800)',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Sparkles size={14} color="#D4AF37" className="diya-glow" />
              <span>ADI’S CREATION • DIYA COLLECTION 2026</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
              lineHeight: 1.15,
              color: 'var(--maroon-900)',
              marginBottom: '1rem',
              fontWeight: 800
            }}>
              LIGHT UP YOUR <br />
              <span style={{
                background: 'linear-gradient(135deg, #73132D 0%, #C25934 60%, #BA922B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CELEBRATIONS
              </span>
            </h1>

            {/* Supporting Copy */}
            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--terracotta-700)',
              fontWeight: 600,
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.02em',
              marginBottom: '1rem'
            }}>
              Handcrafted Diyas • Traditional Beauty • Creative Designs
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto 2rem auto'
            }}>
              Celebrating 15 years of artistry from Pune. Over 50+ unique handcrafted diya varieties created with love, devotion, and festive brilliance for every home and budget.
            </p>

            {/* Call to Actions */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button
                onClick={onExploreClick}
                className="btn btn-primary btn-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onViewBrochureClick}
                className="btn btn-gold btn-lg"
              >
                <BookOpen size={18} />
                <span>View Brochure</span>
              </button>

              <button
                onClick={onOpenEnquiry}
                className="btn btn-outline btn-lg"
              >
                <MessageSquare size={18} />
                <span>Make an Enquiry</span>
              </button>
            </div>

            {/* Trust Mini-bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.25)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="#BA922B" />
                <span>100% Authentic Handcrafted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="#C25934" />
                <span>Hadapsar, Pune • India &amp; Worldwide Supply</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#FFF',
              padding: '0.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--border-gold)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src="/assets/products/hero_cover_mosaic.jpg" 
                alt="Adi's Creation Handcrafted Diya Collection 2026"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(61, 8, 22, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                color: '#FFF',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: '#F6E6AC' }}>
                    Diya Collection 2026
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#EEDBDF' }}>
                    “Decorate Your Homes With Adi’s Creation”
                  </div>
                </div>
                <div className="badge-gold">
                  50+ Designs
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            text-align: left !important;
          }
          .hero-text-col {
            text-align: left !important;
          }
          .hero-text-col p {
            margin-left: 0 !important;
          }
          .hero-text-col div[style*="justify-content: center"] {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
