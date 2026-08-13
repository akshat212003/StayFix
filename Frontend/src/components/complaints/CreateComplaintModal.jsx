import React, { useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import { complaintService } from '../../services/complaintService';
import { X, Upload, AlertCircle } from 'lucide-react';

const Label = ({ children }) => (
  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>
    {children}
  </label>
);

export const CreateComplaintModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('PLUMBING');
  const [priority, setPriority] = useState('MEDIUM');
  const [images, setImages]     = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await complaintService.createComplaint({ title, description, category, priority }, images);
      onSuccess();
      onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "glass-input w-full rounded-xl px-4 py-2.5 text-sm";
  const selectStyle = { background: 'var(--bg-surface-2)', color: 'var(--text-primary)' };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content w-full max-w-xl p-6 space-y-5" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Raise New Complaint</h2>
          <button
            onClick={onClose}
            className="btn-ghost p-2 rounded-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label>Complaint Title</Label>
            <input type="text" required placeholder="e.g., Leaking bathroom tap in B-304"
              value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputStyle} style={selectStyle}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <Label>Priority</Label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputStyle} style={selectStyle}>
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea required rows={3} placeholder="Describe the maintenance issue clearly..."
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="glass-input w-full rounded-xl p-3 text-sm resize-none" />
          </div>

          {/* Image Upload */}
          <div>
            <Label>Upload Photos (Optional)</Label>
            <div
              className="rounded-xl p-5 text-center cursor-pointer transition-all relative"
              style={{
                border: '2px dashed var(--border-hover)',
                background: 'var(--accent-soft)',
              }}
            >
              <input type="file" multiple accept="image/*" onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--accent-primary)' }} />
              <span className="text-xs font-semibold block" style={{ color: 'var(--text-secondary)' }}>
                Click or drag &amp; drop photos here
              </span>
              <span className="text-[10px] block mt-0.5" style={{ color: 'var(--text-muted)' }}>PNG, JPG up to 10MB</span>
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {imagePreviews.map((src, idx) => (
                  <img key={idx} src={src} alt="Preview"
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                    style={{ border: '1px solid var(--border-color)' }} />
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={onClose} className="btn-ghost px-4 py-2 text-xs">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary px-5 py-2.5 text-xs rounded-xl">
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
