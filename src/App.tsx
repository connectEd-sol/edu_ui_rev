import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginForm from "./pages/auth/LoginForm";
import Dashboard from "./pages/dashboard/Dashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
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
import ParentRoute from "./pages/ParentRoute";
import ViewAttendance from "./pages/attendance/ViewAttendance";
import StudentTimetable from "./pages/student/StudentTimetable";
import HallOfFame from "./pages/hall-of-fame/HallOfFame";
import Resources from "./pages/student/Resources";
import EmergencyContacts from "./pages/EmergencyContacts";



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
          <Route path="/feedback" element={<ViewFeedback />} />
        </Route>

        {/* Teacher routes */}
        <Route path="/" element={<MentorRoute />}>
          <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
        </Route>

        {/* Parent routes */}
        <Route path="/" element={<ParentRoute />}>
          <Route path="/parent_dashboard" element={<ParentDashboard />} />
        </Route>

        {/* Common routes */}
        <Route path="attendance" element={<AttendanceManager />} />
        <Route path="/view_attendance/:childId" element={<ViewAttendance />} />
        <Route path="/badges" element={<BadgePage />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/homework/:classId" element={<HomeworkTracker />} />
        <Route path="/test_marks" element={<ViewTestMarks />} />
        <Route path="/post_marks" element={<PostTestMarks />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/notices/new" element={<CreateNotice />} />
        <Route path="/feedback/submit" element={<SubmitFeedback />} />
        <Route path="/calendar" element={<SchoolCalendar />} />
        <Route path="/view_timetable/:childId" element={<StudentTimetable />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/emergency_contact" element={<EmergencyContacts />} />
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
