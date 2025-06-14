import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import AttendanceManager from "./components/attendance/AttendanceManager";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MentorRoute from "./components/MentorRoute";
import AdminRoute from "./components/AdminRoute";
import BaseUrlComponent from "./components/BaseRoute";

// App Routes component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>
      <Route path="/dashboard" element={<BaseUrlComponent />} />
      {/* Private routes */}
      <Route path="/" element={<PrivateRoute />}>
        {/* Admin routes */}
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin_dashboard" element={<Dashboard />} />
        </Route>

        {/* Teacher routes */}
        <Route path="/" element={<MentorRoute />}>
          <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
        </Route>

        {/* Common routes */}
        <Route path="attendance" element={<AttendanceManager />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
