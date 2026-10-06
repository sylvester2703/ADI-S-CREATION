import React from 'react';
import { Sparkles, ArrowRight, Eye, MessageSquare, Star } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/brochureProducts';

export default function BestSellers({ onSelectProduct, onOpenEnquiry, onViewAllClick }) {
  const bestSellerProducts = PRODUCTS_DATA.filter(p => p.isBestSeller);

  return (
    <section id="bestsellers" className="section-padding" style={{
      background: '#FFF',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Star size={15} color="#D4AF37" fill="#D4AF37" />
            <span>Customer Favorites &amp; Signature Creations</span>
          </div>
          <h2 className="section-title">
            BEST SELLER COLLECTION
          </h2>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            As featured on Page 3 of the original Diya Collection 2026 brochure — our most celebrated handcrafted centerpieces, pillar samais, and festive sup platters.
          </p>
        </div>

        {/* Best Sellers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {bestSellerProducts.map((product) => (
            <div
              key={product.id}
              className="card-luxury"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-xl)',
                border: '1.5px solid var(--border-gold)',
                background: '#FFF'
              }}
            >
              {/* Product Image Box */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                height: '280px'
              }}>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                
                {/* Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}>
                  <div className="badge-gold">
                    <Star size={12} fill="currentColor" />
                    <span>BEST SELLER</span>
                  </div>
                  <div className="badge-maroon" style={{ fontSize: '0.7rem' }}>
                    Page {product.brochurePage}
                  </div>
                </div>

                {product.priceUnit && (
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(61, 8, 22, 0.9)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFF',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid rgba(212, 175, 55, 0.4)'
                  }}>
                    {product.priceUnit}
                  </div>
                )}
              </div>

              {/* Product Details Box */}
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--terracotta-600)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.35rem'
                  }}>
                    {product.categoryTag}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--maroon-900)',
                    marginBottom: '0.6rem',
                    lineHeight: 1.3
                  }}>
                    {product.name}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {product.description}
                  </p>

                  {/* Pricing Display */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.6rem',
                    marginBottom: '1.25rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--maroon-900)'
                    }}>
                      {product.priceDisplay}
                    </span>
                    {product.availableColours && (
                      <span className="badge-terracotta" style={{ fontSize: '0.75rem' }}>
                        Colours Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%' }}
                  >
                    <Eye size={15} />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(product)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={15} />
                    <span>Enquire</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onViewAllClick}
            className="btn btn-gold btn-lg"
          >
            <span>Explore Complete 2026 Collection</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
