import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../utility/apiService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSkeleton from '../utils/LoadingSkelton';
import { format } from 'date-fns';

const ClientDashboard = () => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      fetchCases();
    }
  }, [user]);

  // Refresh when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        fetchCases();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      console.log('ClientDashboard: Fetching cases for user:', user?._id);
      const response = await apiService.get('/cases');
      console.log('ClientDashboard: API Response:', response.data);
      if (response.data.status) {
        const casesData = response.data.cases || [];
        console.log('ClientDashboard: Cases received:', casesData.length);
        setCases(casesData);
      } else {
        console.warn('ClientDashboard: API returned status false');
        setCases([]);
      }
    } catch (error) {
      console.error('ClientDashboard: Error fetching cases:', error);
      console.error('ClientDashboard: Error details:', error.response?.data || error.message);
      setCases([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCases = cases.length;
    const activeCases = cases.filter(c => 
      ['pending', 'accepted', 'in_progress'].includes(c.status)
    ).length;
    const upcomingConsultations = cases.filter(c => {
      if (!c.consultationDate) return false;
      const consultationDate = new Date(c.consultationDate);
      return consultationDate >= new Date() && 
             ['pending', 'accepted', 'in_progress'].includes(c.status);
    }).length;
    const totalSpent = cases
      .filter(c => c.status === 'completed')
      .reduce((sum, c) => sum + (c.income || 0), 0);

    return {
      totalCases,
      activeCases,
      upcomingConsultations,
      totalSpent
    };
  }, [cases]);

  // Filter and search cases
  const filteredCases = useMemo(() => {
    let filtered = cases;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.clientName?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.lawyer?.FirstName?.toLowerCase().includes(query) ||
        c.lawyer?.LastName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [cases, statusFilter, searchQuery]);

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleCaseClick = (caseId) => {
    navigate(`/case-details/${caseId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Client Dashboard</h1>
        <button
          onClick={fetchCases}
          disabled={isLoading}
          className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Total Cases</h3>
          <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">
            {stats.totalCases}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Active Cases</h3>
          <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">
            {stats.activeCases}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Upcoming Consultations</h3>
          <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">
            {stats.upcomingConsultations}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">
            ₹{stats.totalSpent.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search cases by lawyer name, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
            />
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-600 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold dark:text-white">My Cases</h2>
        </div>
        {filteredCases.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || statusFilter !== 'all' 
                ? 'No cases match your filters.' 
                : 'You have no cases yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Lawyer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Consultation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {filteredCases.map((caseItem) => (
                  <tr
                    key={caseItem._id}
                    onClick={() => handleCaseClick(caseItem._id)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {caseItem._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {caseItem.lawyer 
                        ? `${caseItem.lawyer.FirstName || ''} ${caseItem.lawyer.LastName || ''}`.trim()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <div className="max-w-xs truncate">
                        {caseItem.description || 'No description'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(caseItem.status)}`}>
                        {formatStatus(caseItem.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {caseItem.consultationDate 
                        ? format(new Date(caseItem.consultationDate), 'MMM dd, yyyy HH:mm')
                        : 'Not scheduled'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ₹{caseItem.income?.toLocaleString('en-IN') || '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;

