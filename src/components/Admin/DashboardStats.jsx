import React, { useState, useEffect } from 'react';
import apiService from '../../utility/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBriefcase, 
  faDollarSign, 
  faStar,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

const DashboardStats = ({ onStatsLoaded }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats && onStatsLoaded) {
      onStatsLoaded(stats);
    }
  }, [stats, onStatsLoaded]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin/dashboard/stats');
      if (response.data.status) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Admin Dashboard: Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gmeshMain"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Failed to load dashboard statistics</p>
      </div>
    );
  }

  const StatCard = ({ title, value, icon, trend, trendValue, color = 'gmeshMain' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gmeshBlue dark:text-white mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              <FontAwesomeIcon 
                icon={trend === 'up' ? faArrowUp : trend === 'down' ? faArrowDown : faMinus}
                className={`text-sm ${
                  trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}
              />
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-lg bg-${color}/10`}>
          <FontAwesomeIcon icon={icon} className={`text-2xl text-${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gmeshBlue dark:text-white mb-6">Dashboard Overview</h2>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.users.total}
            icon={faUsers}
            trend="up"
            trendValue={`+${stats.users.newThisWeek} this week`}
          />
          <StatCard
            title="Total Cases"
            value={stats.cases.total}
            icon={faBriefcase}
            trend="up"
            trendValue={`+${stats.cases.newThisWeek} this week`}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.revenue.total.toLocaleString()}`}
            icon={faDollarSign}
            trend={stats.revenue.trend}
            trendValue={`₹${stats.revenue.monthly.toLocaleString()} this month`}
          />
          <StatCard
            title="Avg Rating"
            value={stats.reviews.averageRating.toFixed(1)}
            icon={faStar}
            trendValue={`${stats.reviews.total} reviews`}
          />
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-4">User Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Lawyers</span>
                <span className="font-semibold text-gmeshBlue dark:text-white">{stats.users.lawyers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Clients</span>
                <span className="font-semibold text-gmeshBlue dark:text-white">{stats.users.clients}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">New This Month</span>
                <span className="font-semibold text-gmeshMain">{stats.users.newThisMonth}</span>
              </div>
            </div>
          </div>

          {/* Case Status Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-4">Case Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                <span className="font-semibold text-yellow-600">{stats.cases.byStatus.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                <span className="font-semibold text-blue-600">{stats.cases.byStatus.in_progress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
                <span className="font-semibold text-green-600">{stats.cases.byStatus.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Cancelled</span>
                <span className="font-semibold text-red-600">{stats.cases.byStatus.cancelled}</span>
              </div>
            </div>
          </div>

          {/* Review Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-4">Review Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Reviews</span>
                <span className="font-semibold text-gmeshBlue dark:text-white">{stats.reviews.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Visible</span>
                <span className="font-semibold text-green-600">{stats.reviews.visible}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Pending Verification</span>
                <span className="font-semibold text-yellow-600">{stats.reviews.pending}</span>
              </div>
            </div>
          </div>

          {/* Booking Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gmeshBlue dark:text-white mb-4">Booking Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Bookings</span>
                <span className="font-semibold text-gmeshBlue dark:text-white">{stats.bookings.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
                <span className="font-semibold text-gmeshMain">{stats.bookings.upcoming}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;

