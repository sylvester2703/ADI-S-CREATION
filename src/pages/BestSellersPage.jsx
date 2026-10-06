import React from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_DATA } from '../data/brochureProducts';
import { Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function BestSellersPage({ setActivePage, onSelectProduct, onOpenEnquiry }) {
  const bestSellers = PRODUCTS_DATA.filter(p => p.isBestSeller);

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', flexGrow: 1 }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>Best Sellers</span>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Star size={15} color="#D4AF37" fill="#D4AF37" />
            <span>Brochure Page 3 Feature</span>
          </div>
          <h1 className="section-title">
            Best Seller Diyas 2026
          </h1>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            The signature handcrafted masterpieces highlighted in our official brochure — chosen year after year for their exquisite artistry and festive grace.
          </p>
        </div>

        {/* Grid of Best Sellers */}
        <div className="product-grid" style={{ marginBottom: '3rem' }}>
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onEnquire={onOpenEnquiry}
            />
          ))}
        </div>

        {/* Banner CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--maroon-900) 0%, var(--maroon-800) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          color: '#FFF',
          border: '1px solid var(--gold-500)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 style={{ color: '#F6E6AC', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Want to Explore All 50+ Varieties?
          </h3>
          <p style={{ color: '#EADBCE', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto' }}>
            Our complete 2026 catalogue contains hanging diyas, dome lanterns, pair sets, and nature motif pieces for every home.
          </p>
          <button
            onClick={() => setActivePage('collection')}
            className="btn btn-gold btn-lg"
          >
            <span>View Complete Collection</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
