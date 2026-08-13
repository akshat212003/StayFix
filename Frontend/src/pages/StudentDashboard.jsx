import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { StatCard } from '../components/dashboard/StatCard';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { CreateComplaintModal } from '../components/complaints/CreateComplaintModal';
import { FeedbackModal } from '../components/complaints/FeedbackModal';
import { PlusCircle, Search, Filter, ClipboardList, Clock, CheckCircle2, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [feedbackComplaint, setFeedbackComplaint] = useState(null);

  const { user } = useAuth();

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await complaintService.getMyComplaints({
        status: statusFilter || undefined,
        keyword: searchKeyword || undefined
      });
      if (res.data) setComplaints(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, [statusFilter]);

  const handleSearchSubmit = (e) => { e.preventDefault(); fetchComplaints(); };

  const totalCount    = complaints.length;
  const pendingCount  = complaints.filter(c => ['PENDING','ASSIGNED','IN_PROGRESS'].includes(c.status)).length;
  const resolvedCount = complaints.filter(c => ['RESOLVED','CLOSED'].includes(c.status)).length;

  const filters = [
    { value: '',            label: 'All' },
    { value: 'PENDING',     label: 'Pending' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESOLVED',    label: 'Resolved' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            My Dashboard
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Welcome back, <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{user?.fullName}</span>
            {user?.roomNumber ? ` · Room ${user.roomNumber}` : ''}
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise Complaint</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Raised"       value={totalCount}    icon={ClipboardList}  color="indigo" />
        <StatCard title="Pending / Progress" value={pendingCount}  icon={Clock}          color="amber"  />
        <StatCard title="Resolved"           value={resolvedCount} icon={CheckCircle2}   color="emerald"/>
      </div>

      {/* Toolbar */}
      <div
        className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
      >
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="glass-input w-full pl-10 pr-4 py-2 text-xs rounded-xl"
          />
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={
                statusFilter === value
                  ? { background: 'var(--accent-primary)', color: '#fff', border: '1px solid var(--accent-primary)' }
                  : { background: 'var(--bg-surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-2xl" />
          ))}
        </div>
      ) : complaints.length === 0 ? (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
        >
          <ClipboardList className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>No Complaints Found</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Click "Raise Complaint" above to report a maintenance issue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((c) => (
            <ComplaintCard
              key={c.id}
              complaint={c}
              onActionClick={
                (c.status === 'RESOLVED' || c.status === 'CLOSED') && !c.feedback
                  ? (complaint) => setFeedbackComplaint(complaint)
                  : null
              }
              actionLabel={c.feedback ? `Rated ★${c.feedback.rating}` : 'Rate Service'}
              actionIcon={Star}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateComplaintModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchComplaints} />
      <FeedbackModal complaint={feedbackComplaint} isOpen={!!feedbackComplaint} onClose={() => setFeedbackComplaint(null)} onSuccess={fetchComplaints} />
    </div>
  );
};
