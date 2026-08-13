import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, LogIn, KeyRound, Mail, AlertCircle, ShieldCheck, UserCheck, WrenchIcon, Sun, Moon } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.toLowerCase().trim().endsWith('@stayfix.com')) {
      setError('Email must end with @stayfix.com domain');
      return;
    }

    setLoading(true);
    try {
      const userData = await login({ email, password });
      if (userData.role === 'ROLE_ADMIN') navigate('/admin/dashboard');
      else if (userData.role === 'ROLE_STAFF') navigate('/staff/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword(demoRole === 'Admin' ? 'admin123' : 'password123');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', transition: 'background-color 0.3s ease' }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* Theme toggle top-right */}
      <button
        onClick={toggleTheme}
        className="theme-toggle absolute top-5 right-5 z-10"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <div className="theme-toggle-knob flex items-center justify-center">
          {isDark ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-white" />}
        </div>
      </button>

      <div
        className="w-full max-w-sm relative z-10 animate-fade-in"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-7">
          <div
            className="w-14 h-14 rounded-2xl btn-primary flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: '0 8px 24px var(--accent-glow)' }}
          >
            <Wrench className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Welcome to StayFix
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Hostel &amp; PG Maintenance Management
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <span className="text-[10px] font-semibold" style={{ color: 'var(--accent-primary)' }}>
                @stayfix.com only
              </span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                id="login-email"
                type="email"
                required
                placeholder="you@stayfix.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2.5 text-sm rounded-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
              <input
                id="login-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2.5 text-sm rounded-xl"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm rounded-xl flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Quick Demo
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Student', email: 'student@stayfix.com', role: 'Student', icon: UserCheck, color: 'var(--stat-indigo-icon)' },
            { label: 'Staff',   email: 'staff@stayfix.com',   role: 'Staff',   icon: WrenchIcon,  color: 'var(--stat-emerald-icon)' },
            { label: 'Admin',   email: 'admin@stayfix.com',   role: 'Admin',   icon: ShieldCheck, color: 'var(--stat-rose-icon)' },
          ].map(({ label, email: demoEmail, role, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => setDemoCredentials(demoEmail, role)}
              className="py-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
              style={{
                background: 'var(--bg-surface-2)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background = `${color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-surface-2)';
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              {label}
            </button>
          ))}
        </div>

        {/* Register Link */}
        <div className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          New here?{' '}
          <Link to="/register" className="font-bold" style={{ color: 'var(--accent-primary)' }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
