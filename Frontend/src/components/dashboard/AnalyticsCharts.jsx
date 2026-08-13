import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Star } from 'lucide-react';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#64748b'];

// Tooltip style via CSS variables — we read from document root for chart tooltip
const getTooltipStyle = () => ({
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#fff',
  borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-hover').trim() || '#ccc',
  borderRadius: '12px',
  color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#000',
  fontSize: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
});

const ChartPanel = ({ title, children }) => (
  <div
    className="p-5 rounded-2xl space-y-4"
    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
  >
    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{title}</h3>
    {children}
  </div>
);

export const AnalyticsCharts = ({ analytics }) => {
  if (!analytics) return null;

  const categoryData = analytics.categoryDistribution?.map(item => ({
    name: item.category.replace('_', ' '),
    value: item.count
  })) || [];

  const trendData = analytics.monthlyTrends || [];
  const tooltipStyle = getTooltipStyle();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <ChartPanel title="Complaints by Category">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  formatter={(value) => (
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        {/* Bar Chart */}
        <ChartPanel title="Monthly Complaints & Resolutions">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend formatter={(value) => (
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{value}</span>
                )} />
                <Bar dataKey="total"    name="Total Raised" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved"     fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>
      </div>

      {/* Staff Performance Table */}
      <ChartPanel title="Staff Workload & Performance">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4 text-center">Assigned</th>
                <th className="py-3 px-4 text-center">Resolved</th>
                <th className="py-3 px-4 text-center">Pending</th>
                <th className="py-3 px-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody>
              {analytics.staffPerformance && analytics.staffPerformance.length > 0 ? (
                analytics.staffPerformance.map(s => (
                  <tr
                    key={s.staffId}
                    className="text-sm transition-colors"
                    style={{ borderBottom: '1px solid var(--border-color)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="py-3.5 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <div>{s.staffName}</div>
                      <div className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>{s.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold" style={{ color: 'var(--stat-indigo-icon)' }}>{s.assignedCount}</td>
                    <td className="py-3.5 px-4 text-center font-bold" style={{ color: 'var(--stat-emerald-icon)' }}>{s.resolvedCount}</td>
                    <td className="py-3.5 px-4 text-center font-bold" style={{ color: 'var(--stat-amber-icon)' }}>{s.pendingCount}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.25)' }}
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {s.avgRating > 0 ? s.avgRating : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-xs italic" style={{ color: 'var(--text-muted)' }}>
                    No staff performance data recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartPanel>
    </div>
  );
};
