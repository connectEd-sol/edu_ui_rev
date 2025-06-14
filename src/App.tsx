import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FeedbackProvider } from "./context/FeedbackContext";

import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import AttendanceManager from "./components/attendance/AttendanceManager";
import HomeworkTracker from "./components/homework/HomeworkTracker";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MentorRoute from "./components/MentorRoute";
import AdminRoute from "./components/AdminRoute";
import BaseUrlComponent from "./components/BaseRoute";
import PostTestMarks from "./components/teacher/PostTestMarks";
import ViewTestMarks from "./components/teacher/ViewTestMarks";
import CreateNotice from "./components/notices/CreateNotice";
import NoticeBoard from "./components/notices/NoticeBoard";
import SubmitFeedback from "./components/feedback/SubmitFeedback";
import ViewFeedback from "./components/feedback/ViewFeedback";

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
        <Route path="/homework/:classId" element={<HomeworkTracker />} />
        <Route path="/test_marks" element={<ViewTestMarks />} />
        <Route path="/post_marks" element={<PostTestMarks />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/notices/new" element={<CreateNotice />} />
        <Route path="/feedback/submit" element={<SubmitFeedback />} />
        
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
        <FeedbackProvider>
          <AppRoutes />
        </FeedbackProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
