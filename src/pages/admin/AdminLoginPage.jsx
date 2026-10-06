import React, { useState } from 'react';
import { Lock, User, Shield, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess, onBackToSite }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Check your Login ID and password.');
      }

      localStorage.setItem('adis_admin_token', data.token);
      localStorage.setItem('adis_admin_user', JSON.stringify(data.user));
      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #24060E 0%, #3D0816 50%, #1A040A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Top Back Link */}
      <button
        onClick={onBackToSite}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          color: '#F6E6AC',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          background: 'rgba(255,255,255,0.08)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Storefront</span>
      </button>

      <div style={{
        background: '#FFF',
        borderRadius: 'var(--radius-xl)',
        border: '2px solid var(--gold-500)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '440px',
        padding: '2.5rem 2rem',
        position: 'relative',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/assets/brand/adis_creation_logo.jpg"
            alt="Adi's Creation"
            style={{
              height: '56px',
              margin: '0 auto 1rem auto',
              borderRadius: '8px',
              border: '1px solid var(--gold-500)'
            }}
          />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--terracotta-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.35rem'
          }}>
            <Shield size={13} color="#BA922B" />
            <span>SECURE CRM ACCESS</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            color: 'var(--maroon-900)',
            lineHeight: 1.2
          }}>
            Adi’s Creation <br /> Admin Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Sign in to manage Diya Collection 2026 customer leads &amp; enquiries
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: '#FEF3F2',
            border: '1px solid #FDA29B',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            color: '#B42318',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-login-id">Admin Login ID</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#877476" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="admin-login-id"
                type="text"
                required
                autoComplete="off"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.6rem' }}
                placeholder="Enter Admin Login ID"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#877476" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.6rem' }}
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', padding: '0.9rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          Protected by server-side rate limiting &amp; bcrypt password encryption.
        </div>
      </div>
    </div>
  );
}
