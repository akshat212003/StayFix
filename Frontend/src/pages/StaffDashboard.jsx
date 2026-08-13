import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { StatCard } from '../components/dashboard/StatCard';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { StatusUpdateModal } from '../components/complaints/StatusUpdateModal';
import { Wrench, CheckCircle2, Clock, RefreshCw, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const StaffDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchAssignedComplaints = async () => {
    setLoading(true);
    try {
      const res = await complaintService.getAssignedComplaints({ status: statusFilter || undefined });
      if (res.data) setComplaints(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAssignedComplaints(); }, [statusFilter]);

  const assignedCount    = complaints.filter(c => c.status === 'ASSIGNED').length;
  const inProgressCount  = complaints.filter(c => c.status === 'IN_PROGRESS').length;
  const resolvedCount    = complaints.filter(c => ['RESOLVED','CLOSED'].includes(c.status)).length;

  const filters = [
    { value: '',            label: 'All Tasks' },
    { value: 'ASSIGNED',    label: 'Assigned' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESOLVED',    label: 'Resolved' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Staff Task Board
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Welcome, <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{user?.fullName}</span> · View and update your assigned work orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="New Assigned Tasks" value={assignedCount}   icon={Wrench}       color="indigo" />
        <StatCard title="In Progress Work"   value={inProgressCount} icon={Clock}        color="purple" />
        <StatCard title="Completed Tasks"    value={resolvedCount}   icon={CheckCircle2} color="emerald"/>
      </div>

      {/* Filter Toolbar */}
      <div
        className="p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
      >
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          Work Queue
        </span>
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

      {/* Task Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
        </div>
      ) : complaints.length === 0 ? (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
        >
          <Wrench className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>No Assigned Tasks</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            You currently have no tasks in this filter status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((c) => (
            <ComplaintCard
              key={c.id}
              complaint={c}
              onActionClick={(complaint) => setSelectedComplaint(complaint)}
              actionLabel="Update Status"
              actionIcon={RefreshCw}
            />
          ))}
        </div>
      )}

      <StatusUpdateModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onSuccess={fetchAssignedComplaints}
      />
    </div>
  );
};
