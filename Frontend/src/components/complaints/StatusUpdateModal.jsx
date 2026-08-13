import React, { useState, useEffect } from 'react';
import { complaintService } from '../../services/complaintService';
import { X, RefreshCw, Upload, AlertCircle } from 'lucide-react';

export const StatusUpdateModal = ({ complaint, isOpen, onClose, onSuccess }) => {
  const [status, setStatus] = useState('IN_PROGRESS');
  const [remarks, setRemarks] = useState('');
  const [proofImages, setProofImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (complaint) {
      if (complaint.status === 'ASSIGNED') setStatus('IN_PROGRESS');
      else if (complaint.status === 'IN_PROGRESS') setStatus('RESOLVED');
      else setStatus(complaint.status);
      setRemarks(complaint.staffRemarks || '');
    }
  }, [complaint]);

  if (!isOpen || !complaint) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProofImages(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await complaintService.updateStatus(complaint.id, { status, remarks }, proofImages);
      onSuccess(); onClose();
    } catch (err) { setError(typeof err === 'string' ? err : 'Failed to update status'); }
    finally { setLoading(false); }
  };

  const labelStyle = { color: 'var(--text-secondary)' };
  const selectStyle = { background: 'var(--bg-surface-2)', color: 'var(--text-primary)' };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content w-full max-w-md p-6 space-y-5 animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <RefreshCw className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            Update Work Progress
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
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>Target Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-2.5 text-sm" style={selectStyle}>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>Work Remarks / Notes</label>
            <textarea rows={3} placeholder="Detail actions taken, parts replaced, resolution notes..."
              value={remarks} onChange={(e) => setRemarks(e.target.value)}
              className="glass-input w-full rounded-xl p-3 text-sm resize-none" />
          </div>

          {status === 'RESOLVED' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                Upload Proof Photo (Optional)
              </label>
              <div
                className="rounded-xl p-4 text-center cursor-pointer relative transition-all"
                style={{ border: '2px dashed var(--border-hover)', background: 'rgba(16,185,129,0.06)' }}
              >
                <input type="file" multiple accept="image/*" onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--stat-emerald-icon)' }} />
                <span className="text-xs font-medium block" style={{ color: 'var(--text-secondary)' }}>
                  Attach resolution proof image
                </span>
              </div>
              {imagePreviews.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  {imagePreviews.map((src, idx) => (
                    <img key={idx} src={src} alt="Proof" className="w-12 h-12 object-cover rounded-xl"
                      style={{ border: '1px solid var(--border-color)' }} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={onClose} className="btn-ghost px-4 py-2 text-xs">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-5 py-2.5 text-xs rounded-xl font-bold transition-all"
              style={{ background: 'var(--stat-emerald-icon)', color: '#fff', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
