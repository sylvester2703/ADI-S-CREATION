import React from 'react';
import { Award, Layers, Sparkles, HeartHandshake } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function TrustHighlights() {
  const icons = [
    <Award key="1" size={28} color="#D4AF37" />,
    <Layers key="2" size={28} color="#C25934" />,
    <Sparkles key="3" size={28} color="#8E1D3B" />,
    <HeartHandshake key="4" size={28} color="#D4AF37" />
  ];

  return (
    <section style={{
      background: '#FFF',
      padding: '2.75rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}>
          {BRAND_INFO.highlights.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all var(--transition-normal)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              className="card-luxury"
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem'
              }}>
                {icons[index]}
              </div>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'var(--maroon-900)',
                lineHeight: 1.1,
                marginBottom: '0.35rem'
              }}>
                {item.stat}
              </div>

              <div style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--terracotta-700)',
                marginBottom: '0.4rem',
                letterSpacing: '0.01em'
              }}>
                {item.label}
              </div>

              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
