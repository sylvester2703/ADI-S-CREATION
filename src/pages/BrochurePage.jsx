import React from 'react';
import BrochureViewer from '../components/BrochureViewer';
import { BookOpen, Download, ArrowLeft, ShieldCheck, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function BrochurePage({ setActivePage, onOpenEnquiry }) {
  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', flexGrow: 1 }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>Brochure 2026</span>
        </div>

        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <BookOpen size={15} color="#D4AF37" />
            <span>Digital 18-Page Edition</span>
          </div>
          <h1 className="section-title">
            Official Diya Collection 2026 Brochure
          </h1>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            Browse all 18 pages of authentic handcrafted diya photographs, exact prices, dimensions, and available colors as published in our official season catalogue.
          </p>
        </div>

        {/* Main Interactive Brochure Viewer */}
        <div style={{ marginBottom: '3.5rem' }}>
          <BrochureViewer onOpenEnquiry={onOpenEnquiry} />
        </div>

        {/* Brochure Key Guide */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div className="card-luxury" style={{ padding: '1.75rem', background: '#FFF' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--maroon-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <ShieldCheck size={22} color="var(--maroon-800)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', marginBottom: '0.4rem' }}>
              Authoritative Source of Truth
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Every price, single/pair classification, and dimension shown on this website is verified and synchronized with this 18-page brochure.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '1.75rem', background: '#FFF' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--gold-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Download size={22} color="var(--gold-800)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', marginBottom: '0.4rem' }}>
              Full Offline PDF Download
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Download the complete high-resolution PDF to share with family, society committees, or corporate festive gifting organizers.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '1.75rem', background: '#FFF' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--terracotta-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <MessageSquare size={22} color="var(--terracotta-700)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', marginBottom: '0.4rem' }}>
              Enquire by Page Number
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              When contacting Rani Toshniwal, you can simply mention the brochure page number and product name for instant order processing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
