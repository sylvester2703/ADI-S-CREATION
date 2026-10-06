import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Star, Ruler, Palette, ChevronLeft, ChevronRight, BookOpen, ShieldCheck, Share2, Check } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function ProductDetailModal({ product, onClose, onEnquire }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!product) return null;

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Adi’s Creation, I am interested in "${product.name}" (${product.priceDisplay}) from your Diya Collection 2026. Please share more details regarding availability, quantity and delivery.`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | Adi's Creation`,
        text: `Check out ${product.name} (${product.priceDisplay}) from Adi's Creation Diya Collection 2026.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '920px', width: '100%', padding: 0 }}
      >
        {/* Modal Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge-maroon">
              Brochure Page {product.brochurePage}
            </span>
            {product.isBestSeller && (
              <span className="badge-gold">
                <Star size={12} fill="currentColor" /> BEST SELLER
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleShare}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              title="Share Diya Details"
            >
              {copiedLink ? <Check size={14} color="green" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--maroon-900)'
              }}
              aria-label="Close Product Details"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          overflowY: 'auto',
          maxHeight: 'calc(90vh - 70px)'
        }} className="modal-body-grid">
          
          {/* Left Column: Image Viewer */}
          <div style={{
            padding: '1.5rem',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Main Stage Image */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '420px',
                minHeight: '280px',
                background: '#FFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-gold)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={currentImage}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '420px',
                  objectFit: isZoomed ? 'scale-down' : 'contain',
                  transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
                  transition: 'transform var(--transition-normal)'
                }}
              />

              {/* Prev / Next arrows if multiple images */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
                    }}
                    style={{
                      position: 'absolute',
                      left: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.85)',
                      borderRadius: '50%',
                      padding: '0.4rem',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
                    }}
                    style={{
                      position: 'absolute',
                      right: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.85)',
                      borderRadius: '50%',
                      padding: '0.4rem',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', width: '100%', justifyContent: 'center' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: selectedImageIndex === idx ? '2px solid var(--maroon-800)' : '1px solid var(--border-subtle)',
                      opacity: selectedImageIndex === idx ? 1 : 0.6,
                      background: '#FFF',
                      padding: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  </button>
                ))}
              </div>
            )}
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click image to {isZoomed ? 'zoom out' : 'zoom in'} • Original Brochure Photograph
            </div>
          </div>

          {/* Right Column: Product Specs & CTAs */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--terracotta-600)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem'
              }}>
                {product.categoryTag}
              </div>

              <h2 id="modal-product-title" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: 'var(--maroon-900)',
                marginBottom: '1rem',
                lineHeight: 1.25
              }}>
                {product.name}
              </h2>

              {/* Price Banner */}
              <div style={{
                background: 'var(--bg-primary)',
                border: '1.5px solid var(--border-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Brochure Catalog Price
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    fontWeight: 800,
                    color: 'var(--maroon-900)',
                    lineHeight: 1.1
                  }}>
                    {product.priceDisplay}
                  </div>
                </div>

                {product.singlePrice && product.pairPrice && (
                  <div style={{
                    background: '#FFF',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--maroon-800)',
                    fontWeight: 600
                  }}>
                    Single: ₹{product.singlePrice} | Pair: ₹{product.pairPrice}
                  </div>
                )}
              </div>

              {/* Specs Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {product.dimensions && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <Ruler size={16} color="#C25934" />
                    <strong>Dimensions:</strong>
                    <span style={{ color: 'var(--text-primary)' }}>{product.dimensions}</span>
                  </div>
                )}

                {product.availableColours && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Palette size={16} color="#BA922B" />
                      <strong>Available Colours &amp; Finishes:</strong>
                    </div>
                    {product.coloursList && product.coloursList.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginLeft: '1.5rem' }}>
                        {product.coloursList.map((col, idx) => (
                          <span key={idx} className="badge-terracotta" style={{ fontSize: '0.75rem' }}>
                            {col}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <ShieldCheck size={16} color="#027A48" />
                  <strong>Craftsmanship:</strong>
                  <span style={{ color: 'var(--text-primary)' }}>100% Handcrafted Terracotta Diya</span>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.35rem' }}>
                  Product Details
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {product.description}
                </p>
              </div>

              {/* Delivery notice */}
              <div style={{
                background: 'var(--bg-secondary)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
                borderLeft: '3px solid var(--gold-500)'
              }}>
                <strong>Delivery Info:</strong> Home delivery available across India &amp; International supply. Shipping charges calculated separately based on location and order requirements.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  onClose();
                  onEnquire(product);
                }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <MessageSquare size={18} />
                <span>Enquire About This Diya</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Enquiry</span>
                </a>

                <a
                  href={`tel:${BRAND_INFO.phones[0].number}`}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <Phone size={16} />
                  <span>Call {BRAND_INFO.phones[0].number}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .modal-body-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </div>
  );
}
