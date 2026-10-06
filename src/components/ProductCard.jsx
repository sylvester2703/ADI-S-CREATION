import React from 'react';
import { Eye, MessageSquare, Star, Palette, Ruler } from 'lucide-react';

export default function ProductCard({ product, onSelect, onEnquire }) {
  return (
    <div
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        background: '#FFF',
        height: '100%'
      }}
    >
      {/* Product Image Frame */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        paddingTop: '80%', // 5:4 aspect ratio
        cursor: 'pointer'
      }} onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '0.65rem',
          left: '0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          zIndex: 2
        }}>
          {product.isBestSeller && (
            <div className="badge-gold" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>
              <Star size={11} fill="currentColor" />
              <span>BEST SELLER</span>
            </div>
          )}
          <div className="badge-maroon" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
            Page {product.brochurePage}
          </div>
        </div>

        {/* Price Unit Tag */}
        {product.priceUnit && (
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.5rem',
            background: 'rgba(61, 8, 22, 0.88)',
            color: '#FFF',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 600,
            border: '1px solid rgba(212, 175, 55, 0.4)',
            zIndex: 2
          }}>
            {product.priceUnit}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        <div>
          {/* Category Tag */}
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--terracotta-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.3rem'
          }}>
            {product.categoryTag || product.category}
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelect(product)}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--maroon-900)',
              lineHeight: 1.3,
              marginBottom: '0.45rem',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6rem'
            }}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Dimension or Color Features */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.65rem' }}>
            {product.dimensions && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}>
                <Ruler size={11} color="#C25934" />
                <span>{product.dimensions}</span>
              </span>
            )}
            {product.availableColours && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'var(--gold-100)',
                border: '1px solid var(--gold-500)',
                color: 'var(--maroon-900)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}>
                <Palette size={11} color="#BA922B" />
                <span>Colours Available</span>
              </span>
            )}
          </div>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.4rem',
            paddingTop: '0.4rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--maroon-900)'
            }}>
              {product.priceDisplay}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          paddingTop: '0.4rem'
        }}>
          <button
            onClick={() => onSelect(product)}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}
          >
            <Eye size={13} />
            <span>Details</span>
          </button>
          <button
            onClick={() => onEnquire(product)}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}
          >
            <MessageSquare size={13} />
            <span>Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
}
