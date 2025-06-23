import React, { useState, useMemo } from 'react';
import { Search, UserPlus, ChevronDown, MoreVertical, Eye, Edit, Trash2, Mail, Users, Calendar } from 'lucide-react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import StudentProfile from '../student/StudentProfile';
StudentProfile

// --- Type Definitions ---
interface Student {
  id: string;
  name: string;
  avatar: string;
  class: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave'; // 'Graduated' removed from here
  joinDate: string;
}

interface StatusBadgeProps {
  status: Student['status'];
}

interface ActionMenuProps {
  studentId: string;
  onAction: (action: string, id: string) => void;
}

// --- MOCK DATA: A realistic list of students with Indian names ---
const mockStudents: Student[] = [
  {
    id: 'STD-001',
    name: 'Aisha Khan',
    avatar: 'https://placehold.co/100x100/ADD8E6/4F5D75?text=AK',
    class: '10 A',
    email: 'a.khan@school.edu',
    phone: '+91 91234 56780',
    status: 'Active',
    joinDate: '2022-06-01',
  },
  {
    id: 'STD-002',
    name: 'Rahul Dravid',
    avatar: 'https://placehold.co/100x100/DDA0DD/4F5D75?text=RD',
    class: '12 B',
    email: 'r.dravid@school.edu',
    phone: '+91 91234 56781',
    status: 'Active',
    joinDate: '2020-07-15',
  },
  {
    id: 'STD-003',
    name: 'Pooja Singh',
    avatar: 'https://placehold.co/100x100/F0E68C/4F5D75?text=PS',
    class: '9 C',
    email: 'p.singh@school.edu',
    phone: '+91 91234 56782',
    status: 'On Leave',
    joinDate: '2023-01-20',
  },
  {
    id: 'STD-004',
    name: 'Siddharth Rao',
    avatar: 'https://placehold.co/100x100/FFB6C1/4F5D75?text=SR',
    class: '11 A',
    email: 's.rao@school.edu',
    phone: '+91 91234 56783',
    status: 'Active',
    joinDate: '2021-08-01',
  },
  // Note: Student STD-005 (Neha Sharma - Graduated) has been removed
];

// --- Helper component for status badges ---
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-2 py-0.5 text-xs font-semibold rounded-full";
  const statusClasses = {
    Active: "bg-green-100 text-green-800",
    'On Leave': "bg-yellow-100 text-yellow-800",
    // 'Graduated' removed from here
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

// --- Helper component for the action dropdown ---
const ActionMenu: React.FC<ActionMenuProps> = ({ studentId, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
        <MoreVertical size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
          <a onClick={() => { onAction('View Profile', studentId); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Eye size={16} /> View Profile
          </a>
          <a onClick={() => { onAction('Edit', studentId); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Edit size={16} /> Edit Details
          </a>
          <a onClick={() => { onAction('Deactivate', studentId); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
            <Trash2 size={16} /> Deactivate
          </a>
        </div>
      )}
    </div>
  );
};

// --- Main Component: AllStudentsList ---
const AllStudentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<Student['status'] | 'All'>('All'); // Type adjusted

  const navigate = useNavigate();

  const handleAction = (action: string, studentId: string) => {
    alert(`Action: ${action} for Student ID: ${studentId}`);
    // In a real application, you'd trigger a modal, API call, or navigation here
  };

  const goToStudentProfile = ()=>{
    navigate('/students-profile')
  }


  const filteredStudents = useMemo(() => {
    return mockStudents
      .filter((student: Student) => statusFilter === 'All' || student.status === statusFilter)
      .filter((student: Student) => {
        const term = searchTerm.toLowerCase();
        return (
          student.name.toLowerCase().includes(term) ||
          student.class.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term)
        );
      });
  }, [searchTerm, statusFilter]);

  
  



  return (
    <Layout>
      <div className="bg-gray-50/50 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                View, search, and manage all students.
              </p>
            </div>
            <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
              <UserPlus size={18} />
              <span>Add New Student</span>
            </button>
          </div>

          {/* Control Bar: Search and Filters */}
          <div  className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, class, or email..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as Student['status'] | 'All')}
                className="appearance-none w-full sm:w-48 bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                {/* <option value="Graduated">Graduated</option> -- Removed */}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Students Card List */}
          <div onClick={goToStudentProfile} className="space-y-4">
            {filteredStudents.map((student: Student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/student-profile/${student.id}`)}
              >
                {/* Card Header */}
                <div onClick={goToStudentProfile} className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img className="h-12 w-12 rounded-full object-cover" src={student.avatar} alt={student.name} />
                    <div>
                      <div className="text-base font-bold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1.5">
                        <Mail size={14} />
                        {student.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ActionMenu studentId={student.id} onAction={handleAction} />
                  </div>
                </div>

                {/* Card Body */}
                <div onClick={goToStudentProfile} className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users size={16} className="text-gray-400" />
                    <span className="font-semibold">Class:</span>
                    <span>{student.class}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={student.status} />
                    <div className="text-sm text-gray-500 flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>Joined: {new Date(student.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-700">No Students Found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllStudentsList;