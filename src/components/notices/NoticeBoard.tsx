import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, User, FileText, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../common/Layout';

interface Notice {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  createdAt: string;
  targetAudience: string[];
  attachment?: {
    name: string;
    url: string;
  };
}

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for notices
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      content: 'We are pleased to announce the upcoming Parent-Teacher Meeting scheduled for next week. Please make sure to attend.',
      author: {
        name: 'John Smith',
        role: 'Teacher'
      },
      createdAt: '2024-03-15T10:00:00Z',
      targetAudience: ['All Parents'],
      attachment: {
        name: 'PTM_Schedule.pdf',
        url: '#'
      }
    },
    {
      id: '2',
      title: 'School Holiday Notice',
      content: 'The school will remain closed on March 20th due to maintenance work.',
      author: {
        name: 'Admin',
        role: 'Administrator'
      },
      createdAt: '2024-03-14T15:30:00Z',
      targetAudience: ['All Parents', 'All Teachers']
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Bell className="h-6 w-6 text-blue-600" />
                <h1 className="text-lg font-semibold text-gray-900">Notice Board</h1>
              </div>
              {(user?.role === 'admin' || user?.role === 'teacher') && (
                <button
                  onClick={() => navigate('/notices/new')}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  New Notice
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">{notice.title}</h2>
                    <span className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.content}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {notice.targetAudience.map((audience, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="flex items-center text-xs text-gray-600">
                      <User className="h-3 w-3 mr-1" />
                      {notice.author.name}
                      <span className="mx-1">•</span>
                      <span className="text-gray-500">{notice.author.role}</span>
                    </span>
                    {notice.attachment && (
                      <a
                        href={notice.attachment.url}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {notice.attachment.name}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticeBoard; 