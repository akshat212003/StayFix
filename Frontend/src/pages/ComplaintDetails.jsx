import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintService } from '../services/complaintService';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/common/Badge';
import { Timeline } from '../components/dashboard/Timeline';
import { formatDate } from '../utils/formatters';
import { ArrowLeft, User, Star, ImageIcon, Wrench, Clock } from 'lucide-react';

const Section = ({ title, children }) => (
  <div
    className="p-5 rounded-2xl space-y-3"
    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
  >
    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{title}</h3>
    {children}
  </div>
);

export const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    complaintService.getComplaintById(id)
      .then(res => { if (res.data) setComplaint(res.data); })
      .catch(err => { setError(typeof err === 'string' ? err : 'Could not fetch complaint details'); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="skeleton h-10 w-32 rounded-xl" />
      <div className="skeleton h-48 rounded-2xl" />
      <div className="grid grid-cols-2 gap-4">
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
      </div>
    </div>
  );

  if (error || !complaint) {
    return (
      <div className="p-8 rounded-2xl text-center"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
        <span className="block mb-3 text-sm" style={{ color: '#e11d48' }}>{error || 'Complaint not found'}</span>
        <Link to="/" className="text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>Return to Dashboard</Link>
      </div>
    );
  }

  const issueImages = complaint.images?.filter(i => i.imageType === 'ISSUE') || [];
  const proofImages = complaint.images?.filter(i => i.imageType === 'RESOLUTION_PROOF') || [];

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>#{complaint.id}</span>
      </div>

      {/* Header Card */}
      <div
        className="p-6 rounded-2xl space-y-4"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4 pb-4"
          style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={complaint.category} />
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
            </div>
            <h1 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{complaint.title}</h1>
          </div>

          <div className="text-right text-xs space-y-1" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-1.5 justify-end">
              <Clock className="w-3.5 h-3.5" />
              Raised: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(complaint.createdAt)}</strong>
            </div>
            {complaint.resolvedAt && (
              <div className="flex items-center gap-1.5 justify-end">
                <Clock className="w-3.5 h-3.5" />
                Resolved: <strong style={{ color: 'var(--stat-emerald-icon)' }}>{formatDate(complaint.resolvedAt)}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Description</p>
              <p
                className="text-sm leading-relaxed p-4 rounded-xl"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
              >
                {complaint.description}
              </p>
            </div>

            {/* Issue Photos */}
            {issueImages.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  <ImageIcon className="w-3.5 h-3.5" />
                  Attached Photos ({issueImages.length})
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {issueImages.map(img => (
                    <a key={img.id} href={`http://localhost:8080${img.imageUrl}`} target="_blank" rel="noreferrer">
                      <img src={`http://localhost:8080${img.imageUrl}`} alt="Issue"
                        className="w-full h-36 object-cover rounded-xl hover:scale-105 transition-transform"
                        style={{ border: '1px solid var(--border-color)' }} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Proof Photos */}
            {proofImages.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                  style={{ color: 'var(--stat-emerald-icon)' }}>
                  <ImageIcon className="w-3.5 h-3.5" />
                  Resolution Proof ({proofImages.length})
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {proofImages.map(img => (
                    <a key={img.id} href={`http://localhost:8080${img.imageUrl}`} target="_blank" rel="noreferrer">
                      <img src={`http://localhost:8080${img.imageUrl}`} alt="Proof"
                        className="w-full h-36 object-cover rounded-xl hover:scale-105 transition-transform"
                        style={{ border: `1px solid var(--stat-emerald-icon)33` }} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Student Info */}
            <Section title="Student Information">
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {complaint.student?.fullName}
              </div>
              <div className="text-xs flex items-center gap-4" style={{ color: 'var(--text-muted)' }}>
                {complaint.student?.roomNumber && <span>Room: <strong style={{ color: 'var(--text-secondary)' }}>{complaint.student.roomNumber}</strong></span>}
                {complaint.student?.hostelBlock && <span>Block: <strong style={{ color: 'var(--text-secondary)' }}>{complaint.student.hostelBlock}</strong></span>}
              </div>
            </Section>

            {/* Staff Info */}
            <Section title="Assigned Staff">
              {complaint.assignedStaff ? (
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {complaint.assignedStaff.fullName}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{complaint.assignedStaff.email}</div>
                </div>
              ) : (
                <p className="text-xs italic" style={{ color: '#d97706' }}>Unassigned — Awaiting Admin Assignment</p>
              )}
            </Section>

            {/* Staff Remarks */}
            {complaint.staffRemarks && (
              <Section title="Staff Work Remarks">
                <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>
                  "{complaint.staffRemarks}"
                </p>
              </Section>
            )}

            {/* Feedback */}
            {complaint.feedback && (
              <div
                className="p-5 rounded-2xl space-y-2"
                style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#d97706' }}>Student Rating</span>
                  <span className="flex items-center gap-1 font-bold text-sm" style={{ color: '#d97706' }}>
                    <Star className="w-4 h-4 fill-amber-400" />
                    {complaint.feedback.rating} / 5
                  </span>
                </div>
                {complaint.feedback.comment && (
                  <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>"{complaint.feedback.comment}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="p-6 rounded-2xl space-y-4"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
      >
        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Status Timeline</h3>
        <Timeline historyList={complaint.historyList} />
      </div>
    </div>
  );
};
