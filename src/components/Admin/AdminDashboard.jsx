import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardStats from './DashboardStats';
import UserManagement from './UserManagement';
import CaseManagement from './CaseManagement';
import ReviewManagement from './ReviewManagement';
import ActivityLogs from './ActivityLogs';
import ContentManagement from './ContentManagement';
import AdminAIAssistant from './AdminAIAssistant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faUsers, 
  faBriefcase, 
  faStar, 
  faHistory,
  faFileAlt,
  faSignOutAlt,
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: faChartLine },
    { id: 'users', label: 'Users', icon: faUsers },
    { id: 'cases', label: 'Cases', icon: faBriefcase },
    { id: 'reviews', label: 'Reviews', icon: faStar },
    { id: 'activity', label: 'Activity Logs', icon: faHistory },
    { id: 'content', label: 'Content', icon: faFileAlt },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats onStatsLoaded={setDashboardStats} />;
      case 'users':
        return <UserManagement />;
      case 'cases':
        return <CaseManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'activity':
        return <ActivityLogs />;
      case 'content':
        return <ContentManagement />;
      default:
        return <DashboardStats onStatsLoaded={setDashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gmeshBlue dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {user?.FirstName} {user?.LastName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-[calc(100vh-80px)] border-r border-gray-200 dark:border-gray-700">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-gmeshMain text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* AI Assistant Button in Sidebar */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  showAIAssistant
                    ? 'bg-gmeshMain text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faRobot} className="w-5 h-5" />
                <span className="font-medium">AI Assistant</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* AI Assistant - Available on all admin pages */}
      <AdminAIAssistant 
        dashboardStats={dashboardStats} 
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
};

export default AdminDashboard;

