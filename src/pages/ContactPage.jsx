import React from 'react';
import ContactSection from '../components/ContactSection';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage({ setActivePage, onOpenEnquiry }) {
  return (
    <div style={{ flexGrow: 1, background: 'var(--bg-primary)' }}>
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </div>

      <ContactSection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
}
