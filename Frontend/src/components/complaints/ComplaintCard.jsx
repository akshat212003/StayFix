import React from 'react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { formatRelativeTime } from '../../utils/formatters';
import { Calendar, User, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComplaintCard = ({ complaint, onActionClick, actionLabel, actionIcon: ActionIcon }) => {
  const firstImage = complaint.images && complaint.images.length > 0 ? complaint.images[0].imageUrl : null;

  return (
    <div
      className="complaint-card flex flex-col justify-between gap-4 p-5 animate-fade-in"
    >
      {/* Top badges row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <CategoryBadge category={complaint.category} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Title & Description */}
        <div>
          <h3
            className="text-sm font-bold line-clamp-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {complaint.title}
          </h3>
          <p className="text-xs line-clamp-2 mt-1" style={{ color: 'var(--text-secondary)' }}>
            {complaint.description}
          </p>
        </div>

        {/* Image preview */}
        {firstImage && (
          <div
            className="w-full h-28 rounded-xl overflow-hidden"
            style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
          >
            <img
              src={`http://localhost:8080${firstImage}`}
              alt="Complaint evidence"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="pt-3 flex items-center justify-between text-xs gap-2"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
            <User className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <span className="truncate">
              {complaint.student?.fullName}
              {complaint.student?.roomNumber ? ` · ${complaint.student.roomNumber}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatRelativeTime(complaint.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={`/complaints/${complaint.id}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)'
            }}
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View</span>
          </Link>

          {onActionClick && (
            <button
              onClick={() => onActionClick(complaint)}
              className="btn-primary flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs"
            >
              {ActionIcon && <ActionIcon className="w-3.5 h-3.5" />}
              <span>{actionLabel || 'Action'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
