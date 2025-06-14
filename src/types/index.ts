export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  avatar?: string;
  phone?: string;
  class?: string;
  section?: string;
  parentId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  class: string;
  section: string;
  parentId: string;
  avatar?: string;
  dateOfBirth: string;
  address: string;
  phone?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  markedAt: string;
  remarks?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  class: string;
  section: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  examType: 'quiz' | 'assignment' | 'midterm' | 'final' | 'project';
  marks: number;
  maxMarks: number;
  date: string;
  teacherComments?: string;
}

export interface BusRoute {
  id: string;
  routeName: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  busNumber: string;
  stops: BusStop[];
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  status: 'active' | 'inactive' | 'maintenance';
}

export interface BusStop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  estimatedTime: string;
  students: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}