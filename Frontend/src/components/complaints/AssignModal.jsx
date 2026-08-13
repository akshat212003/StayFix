import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { complaintService } from '../../services/complaintService';
import { PRIORITIES } from '../../utils/constants';
import { X, UserCheck, AlertCircle } from 'lucide-react';

export const AssignModal = ({ complaint, isOpen, onClose, onSuccess }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      adminService.getStaffList().then(res => { if (res.data) setStaffList(res.data); }).catch(console.error);
      if (complaint) {
        setPriority(complaint.priority || 'MEDIUM');
        setSelectedStaffId(complaint.assignedStaff?.id || '');
      }
    }
  }, [isOpen, complaint]);

  if (!isOpen || !complaint) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStaffId) { setError('Please select a staff member.'); return; }
    setError(''); setLoading(true);
    try {
      await complaintService.assignComplaint(complaint.id, { staffId: parseInt(selectedStaffId), priority });
      onSuccess(); onClose();
    } catch (err) { setError(typeof err === 'string' ? err : 'Failed to assign complaint'); }
    finally { setLoading(false); }
  };

  const labelStyle = { color: 'var(--text-secondary)' };
  const selectStyle = { background: 'var(--bg-surface-2)', color: 'var(--text-primary)' };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content w-full max-w-md p-6 space-y-5 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <UserCheck className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            Assign Staff Member
          </h3>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-xl"><X className="w-5 h-5" /></button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>Select Staff</label>
            <select required value={selectedStaffId} onChange={(e) => setSelectedStaffId(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-2.5 text-sm" style={selectStyle}>
              <option value="">-- Choose Staff --</option>
              {staffList.map(s => <option key={s.id} value={s.id}>{s.fullName} ({s.email})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>Priority Level</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-2.5 text-sm" style={selectStyle}>
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={onClose} className="btn-ghost px-4 py-2 text-xs">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary px-5 py-2.5 text-xs rounded-xl">
              {loading ? 'Assigning...' : 'Assign & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
