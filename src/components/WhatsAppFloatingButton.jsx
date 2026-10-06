import React from 'react';
import { MessageSquare, Phone, Send } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function WhatsAppFloatingButton({ onOpenEnquiry }) {
  const whatsappMsg = encodeURIComponent(
    "Hello Adi’s Creation, I would like to enquire about your Diya Collection 2026."
  );

  return (
    <>
      {/* Desktop Floating WhatsApp Pill */}
      <div style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 800,
        display: 'none'
      }} className="desktop-floating-actions">
        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#25D366',
            color: '#FFF',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.9rem',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
            transition: 'all var(--transition-normal)'
          }}
          className="hover-lift"
        >
          <MessageSquare size={20} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '0.6rem 1rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1.2fr',
        gap: '0.5rem',
        zIndex: 800,
        boxShadow: '0 -4px 16px rgba(61, 8, 22, 0.08)'
      }} className="mobile-bottom-bar">
        <a
          href={`tel:${BRAND_INFO.phones[0].number}`}
          className="btn btn-outline btn-sm"
          style={{ padding: '0.5rem 0.35rem', fontSize: '0.78rem', width: '100%' }}
        >
          <Phone size={14} />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-sm"
          style={{ padding: '0.5rem 0.35rem', fontSize: '0.78rem', width: '100%' }}
        >
          <MessageSquare size={14} />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="btn btn-primary btn-sm"
          style={{ padding: '0.5rem 0.5rem', fontSize: '0.78rem', width: '100%' }}
        >
          <Send size={14} />
          <span>Enquire</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-floating-actions { display: block !important; }
          .mobile-bottom-bar { display: none !important; }
        }
      `}</style>
    </>
  );
}
