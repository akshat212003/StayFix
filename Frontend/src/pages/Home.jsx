import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Home = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ROLE_ADMIN') return '/admin/dashboard';
    if (user.role === 'ROLE_STAFF') return '/staff/dashboard';
    return '/student/dashboard';
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden relative font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Background Ambient Glow */}
      <div className="glow-bg top-[-200px] left-[-200px]" />
      <div
        className="glow-bg bottom-[20%] right-[-100px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(96, 1, 209, 0.15) 0%, rgba(3, 20, 39, 0) 70%)'
        }}
      />

      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-300 shadow-sm"
        style={{
          background: 'var(--navbar-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1440px] mx-auto">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-knob flex items-center justify-center">
                <span className="material-symbols-outlined text-xs text-white" style={{ fontSize: '13px' }}>
                  {isDark ? 'dark_mode' : 'light_mode'}
                </span>
              </div>
            </button>

            {user ? (
              <Link
                to={getDashboardPath()}
                className="btn-primary text-xs font-semibold px-5 py-2 rounded-xl transition-all shadow-md"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-secondary hidden sm:block text-xs font-semibold px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-xs font-semibold px-5 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-[120px] pb-16 flex flex-col gap-14">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          <div className="flex flex-col gap-6 z-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full w-fit"
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid var(--border-hover)',
                color: 'var(--accent-primary)'
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
              <span className="text-xs font-bold">
                Intelligent Property Management
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Fast, Transparent &amp; <br />
              <span className="gradient-text">
                Effortless
              </span>{' '}
              Maintenance.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              A unified workflow platform connecting property managers and residents. Report issues in seconds, track repairs in real-time, and ensure a high standard of living through automated service coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {user ? (
                <Link
                  to={getDashboardPath()}
                  className="btn-primary text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2"
                >
                  <span>Go to Dashboard</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-primary text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2"
                  >
                    <span>Report an Issue / Sign In</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <Link
                    to="/register"
                    className="btn-secondary text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl flex justify-center items-center"
                  >
                    Create Student Account
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Graphic (Glassmorphism Bento concept) */}
          <div
            className="relative w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden flex items-center justify-center group z-10 shadow-xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50" />
            <img
              className="w-full h-full object-cover mix-blend-overlay opacity-85 group-hover:scale-105 transition-transform duration-700"
              alt="Dashboard Preview Graphic"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhQ6DkXsinHmysv8v2sbQVIgVL6bru8lKD_CYeK4y38HzdwTULVSJwY60F8WNLL4Pnq3QNAyBalzks0pga9UJfGr6p7OLEqQrjvnG-2nNDdsrNXE4jrXAwy98k1vxNI0x7LrusLe7sXJ_Vc5_Sk4OvBzfyxPfZPjqQHL2peLjv6N0eR0XUT0ZQk8Id19-kGyy4HzsdK-Zr6Ia8JXYznhPySjp7BE8EKYppiDgMMsDCaBrv9Ao-8-"
            />

            {/* Floating elements simulating UI */}
            <div
              className="absolute top-8 left-8 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3.5 animate-[bounce_6s_infinite]"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div
                className="p-2 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--stat-rose-bg)', color: 'var(--stat-rose-icon)' }}
              >
                <span className="material-symbols-outlined text-lg">water_drop</span>
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Plumbing Leak</div>
                <div className="text-[11px] font-semibold" style={{ color: 'var(--stat-rose-icon)' }}>Critical • Assigned</div>
              </div>
            </div>

            <div
              className="absolute bottom-8 right-8 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3.5 animate-[bounce_5s_infinite_reverse]"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div
                className="p-2 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--stat-emerald-bg)', color: 'var(--stat-emerald-icon)' }}
              >
                <span className="material-symbols-outlined text-lg">done_all</span>
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>WiFi Repaired</div>
                <div className="text-[11px] font-semibold" style={{ color: 'var(--stat-emerald-icon)' }}>Resolved • 5 Stars</div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Badges Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 z-10">
          <div
            className="p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform cursor-default shadow-sm"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--stat-indigo-bg)', color: 'var(--stat-indigo-icon)' }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                schedule
              </span>
            </div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Real-time Tracking</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Monitor your maintenance request from submission to resolution with instant live updates.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform cursor-default shadow-sm"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--stat-purple-bg)', color: 'var(--stat-purple-icon)' }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_a_photo
              </span>
            </div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Photo Evidence</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Attach images directly to your ticket to give technicians a clear understanding before they arrive.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform cursor-default shadow-sm"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--stat-amber-bg)', color: 'var(--stat-amber-icon)' }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Service Ratings</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Ensure accountability by rating the repair quality and technician professionalism after completion.
            </p>
          </div>
        </section>

        {/* 3-Step Workflow Section */}
        <section
          className="p-8 sm:p-10 rounded-3xl space-y-8 shadow-md"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              A simplified process designed for rapid resolution.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connecting Line (Desktop only) */}
            <div
              className="hidden md:block absolute top-[50px] left-[16%] right-[16%] h-[2px] z-0"
              style={{
                background: 'linear-gradient(to right, var(--border-color), var(--accent-primary), var(--border-color))'
              }}
            />

            {/* Step 1 */}
            <div
              className="relative z-10 flex flex-col items-center text-center gap-3.5 p-5 rounded-2xl"
              style={{ background: 'var(--bg-surface-2)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--accent-primary)',
                  color: 'var(--accent-primary)'
                }}
              >
                <span className="material-symbols-outlined text-[30px]">report</span>
              </div>
              <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>1. Report Fault</h4>
                <p className="text-xs mt-1 px-2" style={{ color: 'var(--text-secondary)' }}>
                  Submit an issue with details and photos in under 60 seconds.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="relative z-10 flex flex-col items-center text-center gap-3.5 p-5 rounded-2xl"
              style={{ background: 'var(--bg-surface-2)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--accent-primary)',
                  color: 'var(--accent-primary)'
                }}
              >
                <span className="material-symbols-outlined text-[30px]">handyman</span>
              </div>
              <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>2. Assign &amp; Repair</h4>
                <p className="text-xs mt-1 px-2" style={{ color: 'var(--text-secondary)' }}>
                  Our automated system routes the ticket to the right maintenance staff.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="relative z-10 flex flex-col items-center text-center gap-3.5 p-5 rounded-2xl"
              style={{ background: 'var(--bg-surface-2)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--accent-primary)',
                  color: 'var(--accent-primary)'
                }}
              >
                <span className="material-symbols-outlined text-[30px]">star_rate</span>
              </div>
              <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>3. Verify &amp; Rate</h4>
                <p className="text-xs mt-1 px-2" style={{ color: 'var(--text-secondary)' }}>
                  Review the completed work and provide feedback to close the loop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid Section */}
        <section className="flex flex-col gap-5 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Common Issues
            </h3>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Instant campus coverage
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { name: 'Plumbing', color: '#06b6d4' },
              { name: 'Electrical', color: '#f59e0b' },
              { name: 'Internet/WiFi', color: '#6366f1' },
              { name: 'Furniture', color: '#8b5cf6' },
              { name: 'HVAC', color: '#f43f5e' },
              { name: 'Appliances', color: '#a855f7' },
              { name: 'Locks & Keys', color: '#64748b' },
              { name: 'Other Issue', color: '#10b981' },
            ].map((cat) => (
              <div
                key={cat.name}
                className="p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
