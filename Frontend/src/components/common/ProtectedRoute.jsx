import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their role dashboard
    if (user.role === 'ROLE_STUDENT') return <Navigate to="/student/dashboard" replace />;
    if (user.role === 'ROLE_STAFF') return <Navigate to="/staff/dashboard" replace />;
    if (user.role === 'ROLE_ADMIN') return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
