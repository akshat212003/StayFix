import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ComplaintDetails } from './pages/ComplaintDetails';
import { ManageUsers } from './pages/ManageUsers';
import { Profile } from './pages/Profile';

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {user && <Sidebar />}
        <main className="flex-1 p-6 overflow-y-auto" style={{ backgroundColor: 'var(--bg-base)' }}>
          <Routes>
            <Route path="/complaints/:id" element={<ComplaintDetails />} />
            <Route path="/profile" element={<Profile />} />

            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_STUDENT']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Staff Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_STAFF']} />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* Default Redirect */}
            <Route
              path="*"
              element={
                user ? (
                  user.role === 'ROLE_ADMIN' ? <Navigate to="/admin/dashboard" replace /> :
                  user.role === 'ROLE_STAFF' ? <Navigate to="/staff/dashboard" replace /> :
                  <Navigate to="/student/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
