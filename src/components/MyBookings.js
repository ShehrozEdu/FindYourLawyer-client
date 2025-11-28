import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utility/apiService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSkeleton from './utils/LoadingSkelton';
import { format } from 'date-fns';

export default function MyBookings() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id && !user?.isLawyer) {
      fetchCases();
    }
  }, [user]);

  // Refresh when component comes into focus (user navigates to this page)
  useEffect(() => {
    const handleFocus = () => {
      if (user?._id && !user?.isLawyer) {
        fetchCases();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      console.log('MyBookings: Fetching cases for user:', user?._id);
      const response = await apiService.get('/cases');
      console.log('MyBookings: API Response:', response.data);
      if (response.data.status) {
        const casesData = response.data.cases || [];
        console.log('MyBookings: Cases received:', casesData.length);
        setCases(casesData);
      } else {
        console.warn('MyBookings: API returned status false');
        setCases([]);
      }
    } catch (error) {
      console.error('MyBookings: Error fetching cases:', error);
      console.error('MyBookings: Error details:', error.response?.data || error.message);
      setCases([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCases = useMemo(() => {
    if (statusFilter === 'all') {
      return cases;
    }
    return cases.filter(c => c.status === statusFilter);
  }, [cases, statusFilter]);

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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold dark:text-white">My Bookings</h1>
          <button
            onClick={fetchCases}
            disabled={isLoading}
            className="px-4 py-2 bg-gmeshMain text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
        <div className="mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-700 dark:text-white"
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

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        {filteredCases.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {statusFilter !== 'all' 
                ? 'No cases match the selected filter.' 
                : 'You have no bookings yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {caseItem.lawyer 
                          ? `${caseItem.lawyer.FirstName || ''} ${caseItem.lawyer.LastName || ''}`.trim()
                          : 'N/A'}
                      </div>
                      {caseItem.lawyer?.Email && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {caseItem.lawyer.Email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleCaseClick(caseItem._id)}
                        className="text-gmeshMain hover:text-gmeshBlue dark:text-gmeshMain"
                      >
                        View Details
                      </button>
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
}
