import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { StatCard } from '../components/dashboard/StatCard';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { AssignModal } from '../components/complaints/AssignModal';
import { CATEGORIES, STATUSES } from '../utils/constants';
import { ShieldCheck, Clock, Star, CheckCircle2, UserCheck, Search } from 'lucide-react';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, complaintsRes] = await Promise.all([
        complaintService.getAnalytics(),
        complaintService.getAllComplaints({
          status: statusFilter || undefined,
          category: categoryFilter || undefined,
          keyword: searchKeyword || undefined
        })
      ]);
      if (analyticsRes.data) setAnalytics(analyticsRes.data);
      if (complaintsRes.data) setComplaints(complaintsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [statusFilter, categoryFilter]);
  const handleSearchSubmit = (e) => { e.preventDefault(); fetchData(); };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Admin Overview &amp; Analytics
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Hostel maintenance metrics, staff assignments, and complaint resolution analytics
        </p>
      </div>

      {/* KPI Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Complaints"    value={analytics.totalComplaints} icon={ShieldCheck} color="indigo" />
          <StatCard title="Open / Pending"      value={analytics.pendingComplaints + analytics.assignedComplaints + analytics.inProgressComplaints} icon={Clock} color="amber" />
          <StatCard title="Avg Resolution"      value={`${analytics.avgResolutionTimeHours} hrs`} subtitle="From report to resolution" icon={CheckCircle2} color="emerald" />
          <StatCard title="Satisfaction Score"  value={`${analytics.avgSatisfactionRating} ★`} subtitle="Average student rating" icon={Star} color="purple" />
        </div>
      )}

      {/* Charts */}
      {analytics && <AnalyticsCharts analytics={analytics} />}

      {/* Complaints Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4 pt-4"
          style={{ borderTop: '1px solid var(--border-color)' }}>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>All System Complaints</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Manage, assign, and track all hostel maintenance requests</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div
          className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
        >
          <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by keyword or title..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-2 text-xs rounded-xl"
            />
          </form>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input select rounded-xl px-3 py-2 text-xs"
              style={{ background: 'var(--bg-surface-2)', minWidth: '130px' }}
            >
              <option value="">All Statuses</option>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="glass-input select rounded-xl px-3 py-2 text-xs"
              style={{ background: 'var(--bg-surface-2)', minWidth: '140px' }}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
          </div>
        ) : complaints.length === 0 ? (
          <div
            className="p-8 rounded-2xl text-center text-xs"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
          >
            No complaints found matching the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complaints.map((c) => (
              <ComplaintCard
                key={c.id}
                complaint={c}
                onActionClick={(comp) => setSelectedComplaint(comp)}
                actionLabel={c.assignedStaff ? 'Reassign' : 'Assign Staff'}
                actionIcon={UserCheck}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AssignModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onSuccess={fetchData}
      />
    </div>
  );
};
