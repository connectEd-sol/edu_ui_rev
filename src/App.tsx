import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginForm from "./pages/auth/LoginForm";
import Dashboard from "./pages/dashboard/Dashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AttendanceManager from "./pages/attendance/AttendanceManager";
import HomeworkTracker from "./pages/homework/HomeworkTracker";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import MentorRoute from "./pages/MentorRoute";
import AdminRoute from "./pages/AdminRoute";
import BaseUrlComponent from "./pages/BaseRoute";
import PostTestMarks from "./pages/teacher/PostTestMarks";
import ViewTestMarks from "./pages/teacher/ViewTestMarks";
import CreateNotice from "./pages/notices/CreateNotice";
import NoticeBoard from "./pages/notices/NoticeBoard";
import SubmitFeedback from "./pages/feedback/SubmitFeedback";
import ViewFeedback from "./pages/feedback/ViewFeedback";
import SchoolCalendar from "./pages/calendar/SchoolCalendar";
import BadgePage from "./pages/badges/BadgePage";

// App Routes component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/badges" element={<BadgePage />} />
      </Route>
      <Route path="/dashboard" element={<BaseUrlComponent />} />
      {/* Private routes */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/homework/:classId" element={<HomeworkTracker />} />
        <Route path="/test_marks" element={<ViewTestMarks />} />
        <Route path="/post_marks" element={<PostTestMarks />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/notices/new" element={<CreateNotice />} />
        <Route path="/feedback/submit" element={<SubmitFeedback />} />
        <Route path="/calendar" element={<SchoolCalendar />} />

        {/* Admin routes */}
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin_dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<ViewFeedback />} />
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
