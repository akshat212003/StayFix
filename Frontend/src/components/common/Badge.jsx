import React from 'react';
import { STATUSES, PRIORITIES, CATEGORIES } from '../../utils/constants';

export const StatusBadge = ({ status }) => {
  const item = STATUSES.find(s => s.value === status);
  const label = item?.label || status;
  const cssClass = `status-${(status || '').toLowerCase().replace('_', '-')}`;

  return (
    <span className={`badge ${cssClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const styles = {
    LOW:      { bg: 'rgba(100,116,139,0.1)', color: '#64748b', border: 'rgba(100,116,139,0.25)' },
    MEDIUM:   { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
    HIGH:     { bg: 'rgba(245,158,11,0.1)',  color: '#d97706', border: 'rgba(245,158,11,0.25)' },
    CRITICAL: { bg: 'rgba(244,63,94,0.1)',   color: '#e11d48', border: 'rgba(244,63,94,0.25)' },
  };
  const s = styles[priority] || styles.MEDIUM;
  const item = PRIORITIES.find(p => p.value === priority);

  return (
    <span
      className="badge"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {priority === 'CRITICAL' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {item?.label || priority}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  const styles = {
    PLUMBING:     { bg: 'rgba(6,182,212,0.1)',   color: '#0891b2' },
    ELECTRICITY:  { bg: 'rgba(245,158,11,0.1)',  color: '#d97706' },
    CLEANING:     { bg: 'rgba(16,185,129,0.1)',  color: '#059669' },
    FURNITURE:    { bg: 'rgba(249,115,22,0.1)',  color: '#ea580c' },
    INTERNET_WIFI:{ bg: 'rgba(99,102,241,0.1)',  color: '#6366f1' },
    SECURITY:     { bg: 'rgba(244,63,94,0.1)',   color: '#e11d48' },
    WATER_SUPPLY: { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
    OTHER:        { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
  };
  const s = styles[category] || styles.OTHER;
  const item = CATEGORIES.find(c => c.value === category);

  return (
    <span
      className="badge"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}
    >
      {item?.label || category}
    </span>
  );
};
