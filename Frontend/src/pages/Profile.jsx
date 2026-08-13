import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { authService } from '../services/authService';

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>
      {label}
    </label>
    <input {...props} className="glass-input w-full rounded-xl px-4 py-2.5 text-sm" />
  </div>
);

export const Profile = () => {
  const { user, setUser } = useAuth();
  const [fullName, setFullName]       = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [roomNumber, setRoomNumber]   = useState(user?.roomNumber || '');
  const [hostelBlock, setHostelBlock] = useState(user?.hostelBlock || '');
  const [loading, setLoading]         = useState(false);
  const [successMsg, setSuccessMsg]   = useState('');
  const [errorMsg, setErrorMsg]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(''); setErrorMsg(''); setLoading(true);
    try {
      const updated = await userService.updateProfile(user.id, { fullName, phoneNumber, roomNumber, hostelBlock });
      const merged = { ...user, ...updated.data };
      setUser(merged);
      localStorage.setItem('stayfix_user', JSON.stringify(merged));
      setSuccessMsg('Profile updated successfully!');
    } catch (err) { setErrorMsg(typeof err === 'string' ? err : 'Failed to update profile'); }
    finally { setLoading(false); }
  };

  if (!user) return null;

  const roleLabel = user.role?.replace('ROLE_', '') || 'USER';

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          My Profile
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Manage your personal and hostel contact information
        </p>
      </div>

      <div
        className="p-6 rounded-2xl space-y-6"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
      >
        {/* Avatar + User info */}
        <div className="flex items-center gap-4 pb-5" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div
            className="w-16 h-16 rounded-2xl font-extrabold text-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--accent-primary)',
              border: '2px solid var(--border-hover)',
              boxShadow: '0 4px 16px var(--accent-glow)',
            }}
          >
            {user.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{user.fullName}</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
            <span
              className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)', border: '1px solid var(--border-hover)' }}
            >
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" /><span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <InputField label="Phone Number" type="text" placeholder="9876543210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Room Number" type="text" placeholder="B-304" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
            <InputField label="Hostel Block" type="text" placeholder="Block B" value={hostelBlock} onChange={(e) => setHostelBlock(e.target.value)} />
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="btn-primary px-6 py-2.5 text-xs rounded-xl flex items-center gap-2">
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
