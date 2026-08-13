import React from 'react';
import { formatDate } from '../../utils/formatters';
import { StatusBadge } from '../common/Badge';
import { Clock, User, MessageSquare } from 'lucide-react';

export const Timeline = ({ historyList }) => {
  if (!historyList || historyList.length === 0) {
    return (
      <div className="text-sm italic py-4" style={{ color: 'var(--text-muted)' }}>
        No activity history recorded yet.
      </div>
    );
  }

  return (
    <div
      className="space-y-5 relative"
      style={{ '--timeline-line': 'var(--border-hover)' }}
    >
      {/* Vertical line */}
      <div
        className="absolute left-3.5 top-0 bottom-0 w-px"
        style={{ background: 'var(--border-color)' }}
      />

      {historyList.map((item, index) => (
        <div key={item.id || index} className="relative flex gap-4 items-start">
          {/* Dot */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 shadow-md"
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
            }}
          >
            <Clock className="w-3.5 h-3.5" />
          </div>

          {/* Content */}
          <div
            className="flex-1 p-4 rounded-xl space-y-2"
            style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={item.newStatus} />
                {item.previousStatus && (
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    from <StatusBadge status={item.previousStatus} />
                  </span>
                )}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {formatDate(item.timestamp)}
              </span>
            </div>

            {item.remark && (
              <div
                className="flex items-start gap-2 text-xs p-2.5 rounded-lg"
                style={{
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                <span>{item.remark}</span>
              </div>
            )}

            {item.updatedBy && (
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                <User className="w-3 h-3" />
                <span>
                  Updated by: <strong style={{ color: 'var(--text-secondary)' }}>{item.updatedBy.fullName}</strong>
                  {' '}({item.updatedBy.role?.replace('ROLE_', '')})
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
