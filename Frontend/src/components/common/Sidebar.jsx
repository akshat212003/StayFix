import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, ClipboardList, Users, UserCheck } from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;
  const navItems = [];

  if (role === 'ROLE_STUDENT') {
    navItems.push(
      { path: '/student/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
      { path: '/profile',           label: 'My Profile',    icon: UserCheck }
    );
  } else if (role === 'ROLE_STAFF') {
    navItems.push(
      { path: '/staff/dashboard', label: 'Task Board', icon: ClipboardList },
      { path: '/profile',         label: 'My Profile', icon: UserCheck }
    );
  } else if (role === 'ROLE_ADMIN') {
    navItems.push(
      { path: '/admin/dashboard', label: 'Admin Dashboard',  icon: LayoutDashboard },
      { path: '/admin/users',     label: 'User Management',  icon: Users },
      { path: '/profile',         label: 'My Profile',       icon: UserCheck }
    );
  }

  return (
    <aside
      className="sidebar w-60 flex flex-col gap-1 p-3 min-h-[calc(100vh-57px)]"
    >
      <div
        className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest mb-1"
        style={{ color: 'var(--text-muted)' }}
      >
        Navigation
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all group"
            style={({ isActive }) => ({
              background: isActive ? 'var(--accent-soft)' : 'transparent',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              boxShadow: isActive ? '0 2px 8px var(--accent-glow)' : 'none',
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = 'var(--bg-surface-2)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                // reset handled by NavLink className
              }
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
              style={{}}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};
