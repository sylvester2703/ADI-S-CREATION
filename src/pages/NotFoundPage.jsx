import React from 'react';
import { Sparkles, ArrowRight, Home, Flame } from 'lucide-react';

export default function NotFoundPage({ setActivePage }) {
  return (
    <div className="section-padding" style={{
      background: 'var(--bg-primary)',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '580px' }}>
        
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--maroon-100)',
          border: '2px solid var(--gold-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <Flame size={40} color="var(--maroon-800)" className="diya-glow" />
        </div>

        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '4rem',
          fontWeight: 900,
          color: 'var(--gold-600)',
          lineHeight: 1,
          marginBottom: '0.5rem'
        }}>
          404
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.75rem',
          color: 'var(--maroon-900)',
          marginBottom: '1rem'
        }}>
          Looks like this diya took a little detour.
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
          The page you are looking for might have been moved or does not exist. Let's guide you back to our Diya Collection 2026.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActivePage('home')}
            className="btn btn-primary"
          >
            <Home size={18} />
            <span>Back Home</span>
          </button>

          <button
            onClick={() => setActivePage('collection')}
            className="btn btn-gold"
          >
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
