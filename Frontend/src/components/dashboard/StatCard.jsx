import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'indigo' }) => {
  return (
    <div
      className={`stat-card stat-card-${color} flex items-center justify-between`}
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div>
        <span
          className="block text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {title}
        </span>
        <span
          className="block text-3xl font-extrabold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </span>
        {subtitle && (
          <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </span>
        )}
      </div>

      {Icon && (
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 stat-icon-${color}`}
          style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-sm)' }}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
