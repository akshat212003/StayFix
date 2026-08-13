import React, { useState } from 'react';
import { complaintService } from '../../services/complaintService';
import { X, Star, AlertCircle } from 'lucide-react';

export const FeedbackModal = ({ complaint, isOpen, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !complaint) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await complaintService.submitFeedback(complaint.id, { rating, comment });
      onSuccess(); onClose();
    } catch (err) { setError(typeof err === 'string' ? err : 'Failed to submit feedback'); }
    finally { setLoading(false); }
  };

  const ratingLabel = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent'][rating];

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content w-full max-w-md p-6 space-y-5 animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            Rate the Service
          </h3>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-xl"><X className="w-5 h-5" /></button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
              Service Quality
            </p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button type="button" key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-9 h-9 transition-all ${
                      star <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'fill-transparent'
                    }`}
                    style={{ color: star <= (hoverRating || rating) ? '#fbbf24' : 'var(--text-muted)' }}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-bold mt-2 block" style={{ color: '#fbbf24' }}>{ratingLabel}</span>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Additional Comments (Optional)
            </label>
            <textarea rows={3} placeholder="How satisfied are you with the quality and speed of work?"
              value={comment} onChange={(e) => setComment(e.target.value)}
              className="glass-input w-full rounded-xl p-3 text-sm resize-none" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={onClose} className="btn-ghost px-4 py-2 text-xs">Cancel</button>
            <button type="submit" disabled={loading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: '#f59e0b', color: '#030712', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
