import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = (role) => {
    const styles = {
      ROLE_ADMIN:   { bg: 'var(--stat-rose-bg)',    color: 'var(--stat-rose-icon)',    label: 'ADMIN' },
      ROLE_STAFF:   { bg: 'var(--stat-emerald-bg)', color: 'var(--stat-emerald-icon)', label: 'STAFF' },
      ROLE_STUDENT: { bg: 'var(--stat-indigo-bg)',  color: 'var(--stat-indigo-icon)',  label: 'STUDENT' },
    };
    const s = styles[role] || styles.ROLE_STUDENT;
    return (
      <span
        className="px-2.5 py-0.5 text-[10px] font-bold rounded-full tracking-wider uppercase"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}
      >
        {s.label}
      </span>
    );
  };

  return (
    <header
      className="navbar sticky top-0 z-40 px-5 py-3 flex items-center justify-between"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* StayFix Logo matching Home page */}
      <Link to="/" className="flex items-center gap-2 group">
        <span
          className="material-symbols-outlined transition-transform group-hover:scale-105"
          style={{
            fontVariationSettings: "'FILL' 1",
            fontSize: '28px',
            color: 'var(--accent-primary)'
          }}
        >
          foundation
        </span>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          StayFix
        </span>
      </Link>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-knob flex items-center justify-center">
            {isDark
              ? <Moon className="w-3 h-3 text-white" />
              : <Sun  className="w-3 h-3 text-white" />
            }
          </div>
        </button>

        {user && (
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div
              className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl"
              style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)', border: '1.5px solid var(--accent-primary)40' }}
              >
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-left leading-none">
                <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{user.fullName}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{user.email}</div>
              </div>
              {getRoleBadge(user.role)}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface-2)',
                border: '1px solid var(--border-color)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#f43f5e';
                e.currentTarget.style.background = 'rgba(244,63,94,0.08)';
                e.currentTarget.style.borderColor = 'rgba(244,63,94,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'var(--bg-surface-2)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
