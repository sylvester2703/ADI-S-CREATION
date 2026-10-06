import React from 'react';
import AboutSection from '../components/AboutSection';
import TrustHighlights from '../components/TrustHighlights';
import { ArrowLeft, Sparkles, Heart, Award, ShieldCheck, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function AboutPage({ setActivePage, onOpenEnquiry }) {
  return (
    <div style={{ flexGrow: 1, background: 'var(--bg-primary)' }}>
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>About Us</span>
        </div>
      </div>

      {/* Main About Component */}
      <AboutSection
        onExploreClick={() => setActivePage('collection')}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Trust Metrics */}
      <TrustHighlights />

      {/* Craftsmanship Details Section */}
      <section className="section-padding" style={{ background: '#FFF' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">
              <Sparkles size={15} color="#D4AF37" className="diya-glow" />
              <span>Artisan Principles</span>
            </div>
            <h2 className="section-title">
              Crafted With Care, Love &amp; Devotion
            </h2>
            <div className="ornament-divider">
              <span className="ornament-line"></span>
              <span className="ornament-icon">🪔</span>
              <span className="ornament-line"></span>
            </div>
            <p className="section-desc">
              Every diya is thoughtfully molded, painted with vibrant festive hues, and accented with handcrafted details to illuminate your Diwali celebrations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card-luxury" style={{ padding: '2rem', background: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--maroon-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Heart size={24} color="var(--maroon-800)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
                Handcrafted Passion
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                What began as a passionate creative journey 15 years ago has become a beloved festive tradition, bringing warmth and joy to countless households.
              </p>
            </div>

            <div className="card-luxury" style={{ padding: '2rem', background: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gold-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Award size={24} color="var(--gold-800)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
                50+ Varieties Every Year
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We introduce innovative shapes, vibrant new color combinations, and intricate motifs each Diwali season while preserving traditional craftsmanship.
              </p>
            </div>

            <div className="card-luxury" style={{ padding: '2rem', background: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--terracotta-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={24} color="var(--terracotta-700)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
                Affordable for Everyone
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Our core philosophy is simple: high quality, stunningly beautiful diyas at honest prices so every home can celebrate with brightness and grace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
