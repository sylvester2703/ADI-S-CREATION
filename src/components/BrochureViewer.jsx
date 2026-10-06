import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, Maximize2, Sparkles, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { BROCHURE_PAGES, BRAND_INFO } from '../data/brandInfo';

export default function BrochureViewer({ onOpenEnquiry }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = BROCHURE_PAGES.length;
  const currentItem = BROCHURE_PAGES[currentPage - 1];

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <div style={{
      background: '#FFF',
      borderRadius: 'var(--radius-xl)',
      border: '2px solid var(--border-gold)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Viewer Header / Toolbar */}
      <div style={{
        padding: '1.25rem 1.75rem',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'linear-gradient(135deg, #FCF8F3 0%, #FAF1E4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--terracotta-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <Sparkles size={13} color="#D4AF37" className="diya-glow" />
            <span>ORIGINAL 18-PAGE DIGITAL CATALOGUE</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            color: 'var(--maroon-900)',
            margin: '0.2rem 0'
          }}>
            ADI’S CREATION • Diya Collection 2026
          </h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Current Page: <strong>{currentPage} of {totalPages}</strong> — {currentItem.title}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/assets/brochure/Adis_Creation_Diya_Collection_2026.pdf"
            download="Adis_Creation_Diya_Collection_2026.pdf"
            className="btn btn-primary btn-sm"
          >
            <Download size={16} />
            <span>Download Brochure (PDF)</span>
          </a>

          <a
            href="/assets/brochure/Adis_Creation_Diya_Collection_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            <ExternalLink size={16} />
            <span>Open PDF In Tab</span>
          </a>
        </div>
      </div>

      {/* Main Page Display Stage */}
      <div style={{
        position: 'relative',
        background: '#2C1810',
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '480px'
      }}>
        {/* Navigation Floating Buttons */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(253, 251, 247, 0.92)',
            color: 'var(--maroon-900)',
            border: '1px solid var(--gold-500)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10,
            cursor: 'pointer'
          }}
          aria-label="Previous Page"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(253, 251, 247, 0.92)',
            color: 'var(--maroon-900)',
            border: '1px solid var(--gold-500)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10,
            cursor: 'pointer'
          }}
          aria-label="Next Page"
        >
          <ChevronRight size={24} />
        </button>

        {/* Page Image */}
        <div style={{
          maxWidth: '680px',
          width: '100%',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: '#FFF'
        }}>
          <img
            src={currentItem.image}
            alt={`Adi's Creation 2026 Brochure - Page ${currentPage}: ${currentItem.title}`}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Thumbnails Navigation Carousel */}
      <div style={{
        padding: '1.25rem',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'thin'
        }}>
          {BROCHURE_PAGES.map((page) => {
            const isCur = currentPage === page.pageNumber;
            return (
              <button
                key={page.pageNumber}
                onClick={() => setCurrentPage(page.pageNumber)}
                style={{
                  flexShrink: 0,
                  width: '68px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: isCur ? '2.5px solid var(--maroon-800)' : '1px solid var(--border-subtle)',
                  opacity: isCur ? 1 : 0.6,
                  transform: isCur ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all var(--transition-fast)',
                  background: '#FFF',
                  padding: '2px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                title={`Page ${page.pageNumber}: ${page.title}`}
              >
                <img
                  src={page.image}
                  alt={`Thumb ${page.pageNumber}`}
                  style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: isCur ? 'var(--maroon-900)' : 'var(--text-secondary)',
                  marginTop: '0.2rem'
                }}>
                  Pg {page.pageNumber}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Brochure Notice */}
      <div style={{
        padding: '1rem 1.5rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Need custom quantities or have questions about a design on <strong>Page {currentPage}</strong>?
        </div>
        <button
          onClick={() => onOpenEnquiry()}
          className="btn btn-primary btn-sm"
        >
          <span>Enquire for Page {currentPage} Designs</span>
        </button>
      </div>

    </div>
  );
}
