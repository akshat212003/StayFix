import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, UserPlus, Mail, KeyRound, User, Phone, Home, Building2, AlertCircle, CheckCircle2, Sun, Moon } from 'lucide-react';

const InputField = ({ label, hint, icon: Icon, ...props }) => (
  <div>
    {(label || hint) && (
      <div className="flex items-center justify-between mb-1.5">
        {label && <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{label}</label>}
        {hint  && <span  className="text-[10px] font-semibold" style={{ color: 'var(--accent-primary)' }}>{hint}</span>}
      </div>
    )}
    <div className="relative">
      {Icon && <Icon className="w-4 h-4 absolute left-3.5 top-3 pointer-events-none" style={{ color: 'var(--text-muted)' }} />}
      <input
        {...props}
        className={`glass-input w-full ${Icon ? 'pl-10' : 'pl-3.5'} pr-4 py-2.5 text-sm rounded-xl`}
      />
    </div>
  </div>
);

export const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phoneNumber: '', roomNumber: '', hostelBlock: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const { register } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email.toLowerCase().trim().endsWith('@stayfix.com')) {
      setError('Email must end with @stayfix.com');
      return;
    }
    setLoading(true);
    try {
      await register({ ...form, role: 'ROLE_STUDENT' });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', transition: 'background-color 0.3s ease' }}
    >
      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Theme toggle */}
      <button onClick={toggleTheme} className="theme-toggle absolute top-5 right-5 z-10" title="Toggle theme">
        <div className="theme-toggle-knob flex items-center justify-center">
          {isDark ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-white" />}
        </div>
      </button>

      <div
        className="w-full max-w-lg relative z-10 animate-fade-in"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: '0 8px 24px var(--accent-glow)' }}
          >
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Student Registration
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Create your StayFix student account
          </p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Account created! Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <InputField label="Full Name" icon={User} type="text" required placeholder="Your Full Name"
            value={form.fullName} onChange={set('fullName')} />

          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Email" hint="@stayfix.com only" icon={Mail} type="email" required
              placeholder="name@stayfix.com" value={form.email} onChange={set('email')} />
            <InputField label="Password" icon={KeyRound} type="password" required
              placeholder="Min. 6 characters" value={form.password} onChange={set('password')} />
          </div>

          {/* Phone, Room, Block */}
          <div className="grid grid-cols-3 gap-3">
            <InputField label="Phone" icon={Phone} type="text"
              placeholder="9876543210" value={form.phoneNumber} onChange={set('phoneNumber')} />
            <InputField label="Room No." icon={Home} type="text"
              placeholder="B-304" value={form.roomNumber} onChange={set('roomNumber')} />
            <InputField label="Hostel Block" icon={Building2} type="text"
              placeholder="Block B" value={form.hostelBlock} onChange={set('hostelBlock')} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading || success}
            className="btn-primary w-full py-3 text-sm rounded-xl flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-bold" style={{ color: 'var(--accent-primary)' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
