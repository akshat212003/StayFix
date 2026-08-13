import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { Users, UserPlus, Search, X, AlertCircle } from 'lucide-react';

const getRoleStyle = (role) => {
  if (role === 'ROLE_ADMIN')   return { bg: 'rgba(244,63,94,0.1)',   color: '#e11d48', border: 'rgba(244,63,94,0.25)' };
  if (role === 'ROLE_STAFF')   return { bg: 'rgba(6,182,212,0.1)',   color: '#0891b2', border: 'rgba(6,182,212,0.25)' };
  return                              { bg: 'rgba(99,102,241,0.1)',   color: '#6366f1', border: 'rgba(99,102,241,0.25)' };
};

export const ManageUsers = () => {
  const [users, setUsers]         = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading]     = useState(true);

  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [role, setRole]           = useState('ROLE_STAFF');
  const [error, setError]         = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getUsers();
      if (res.data) setUsers(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggleStatus = async (userId) => {
    try { await adminService.toggleUserStatus(userId); fetchUsers(); }
    catch (err) { console.error(err); }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault(); setError('');
    try {
      await adminService.createUser({ fullName, email, password, role });
      setIsAddOpen(false); setFullName(''); setEmail(''); setPassword('');
      fetchUsers();
    } catch (err) { setError(typeof err === 'string' ? err : 'Failed to create user'); }
  };

  const filteredUsers = users.filter(u => {
    if (roleFilter && u.role !== roleFilter) return false;
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      return u.fullName.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw);
    }
    return true;
  });

  const labelStyle = { color: 'var(--text-secondary)' };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>User Management</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>View hostel students, staff members, and system permissions</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="btn-primary px-4 py-2.5 text-xs flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Staff Account
        </button>
      </div>

      {/* Filter Toolbar */}
      <div
        className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search by name or email..."
            value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}
            className="glass-input w-full rounded-xl pl-10 pr-4 py-2 text-xs" />
        </div>
        <div className="flex items-center gap-2">
          {['', 'ROLE_STUDENT', 'ROLE_STAFF', 'ROLE_ADMIN'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={
                roleFilter === r
                  ? { background: 'var(--accent-primary)', color: '#fff', border: '1px solid var(--accent-primary)' }
                  : { background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
              }
            >
              {r === '' ? 'All Roles' : r.replace('ROLE_', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="py-3 px-5">User</th>
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Room / Block</th>
                <th className="py-3 px-5">Phone</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-5 py-2.5">
                      <div className="skeleton h-8 rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs italic" style={{ color: 'var(--text-muted)' }}>
                    No users found matching your search.
                  </td>
                </tr>
              ) : filteredUsers.map(u => {
                const rs = getRoleStyle(u.role);
                return (
                  <tr key={u.id}
                    className="text-sm transition-colors"
                    style={{ borderBottom: '1px solid var(--border-color)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{u.fullName}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="badge" style={{ background: rs.bg, color: rs.color, border: `1px solid ${rs.border}` }}>
                        {u.role.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {u.roomNumber ? `${u.roomNumber} ${u.hostelBlock ? `(${u.hostelBlock})` : ''}` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-5 text-xs" style={{ color: 'var(--text-muted)' }}>{u.phoneNumber || 'N/A'}</td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition-all"
                        style={
                          u.active
                            ? { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }
                            : { background: 'var(--bg-surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }
                        }
                      >
                        {u.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsAddOpen(false); }}>
          <div className="modal-content w-full max-w-md p-6 space-y-4 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Create Staff Account</h3>
              <button onClick={() => setIsAddOpen(false)} className="btn-ghost p-1.5 rounded-xl"><X className="w-5 h-5" /></button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
                style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3">
              {[
                { label: 'Full Name', value: fullName, setter: setFullName, type: 'text' },
                { label: 'Email',     value: email,    setter: setEmail,    type: 'email' },
                { label: 'Password',  value: password, setter: setPassword, type: 'password' },
              ].map(({ label, value, setter, type }) => (
                <div key={label}>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>{label}</label>
                  <input type={type} required value={value} onChange={e => setter(e.target.value)}
                    className="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>Role</label>
                <select value={role} onChange={e => setRole(e.target.value)}
                  className="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}>
                  <option value="ROLE_STAFF">Staff (Maintenance Worker)</option>
                  <option value="ROLE_ADMIN">Admin (Warden / Manager)</option>
                  <option value="ROLE_STUDENT">Student</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                <button type="button" onClick={() => setIsAddOpen(false)} className="btn-ghost px-4 py-2 text-xs">Cancel</button>
                <button type="submit" className="btn-primary px-5 py-2.5 text-xs rounded-xl">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
