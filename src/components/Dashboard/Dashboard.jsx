import React, { useState, useEffect, useMemo } from 'react';
import ClientDescription from './ClientDescription';
import apiService from '../../utility/apiService';
import { useAuth } from '../../contexts/AuthContext';
import RevenueChart from './Analytics/RevenueChart';
import ClientStats from './Analytics/ClientStats';
import CaseStats from './Analytics/CaseStats';
import CaseCard from './Cases/CaseCard';
import ClientList from './Clients/ClientList';

const LawyerDashboard = () => {
  const [clients, setClients] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('cases'); // 'cases' or 'clients'
  const { user } = useAuth();

  useEffect(() => {
    // Fetch data from API
    if (!user?._id) return;
    
    const lawyerId = user._id;
    fetchCases(lawyerId);
    fetchAnalytics(lawyerId);
  }, [user]);

  const fetchCases = async (lawyerId) => {
    try {
      const response = await apiService.get(`/my-cases/${lawyerId}`);
      if (response.data.status) {
        setClients(response.data.casesLawyers || []);
        const totalIncome = (response.data.casesLawyers || []).reduce((total, inc) => total + (inc.income || 0), 0);
        setTotalIncome(totalIncome.toLocaleString('en-IN'));
      }
    } catch (error) {
      console.error('LawyerDashboard: Error fetching cases:', error);
    }
  };

  const fetchAnalytics = async (lawyerId) => {
    try {
      setIsLoadingAnalytics(true);
      const response = await apiService.get(`/dashboard/analytics/${lawyerId}`);
      if (response.data.status) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.error('LawyerDashboard: Error fetching analytics:', error);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId === selectedClientId ? null : clientId);
  };

  const handleCaseUpdate = () => {
    if (user?._id) {
      fetchCases(user._id);
      fetchAnalytics(user._id);
    }
  };

  // Filter and sort cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = clients;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.clientName?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'client':
          return (a.clientName || '').localeCompare(b.clientName || '');
        case 'amount':
          return (b.income || 0) - (a.income || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [clients, statusFilter, searchQuery, sortBy]);

  // Calculate quick stats
  const quickStats = useMemo(() => {
    const pendingCases = clients.filter(c => c.status === 'pending').length;
    const activeCases = clients.filter(c => ['accepted', 'in_progress'].includes(c.status)).length;
    const completedCases = clients.filter(c => c.status === 'completed').length;
    return { pendingCases, activeCases, completedCases };
  }, [clients]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gmeshBlue to-gmeshMain bg-clip-text text-transparent dark:from-gmeshMain dark:to-gmeshMain mb-2">
            Lawyer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.name || 'Lawyer'}! Here's your overview.
          </p>
        </div>

        {/* Bento Grid - Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {/* Total Income - Large Card */}
          <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gmeshBlue via-gmeshBlue to-[#001a5c] dark:from-gmeshBlue dark:via-gmeshBlue dark:to-[#001a5c] p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gmeshMain opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/80 text-sm font-medium mb-2">Total Income</p>
              <p className="text-3xl md:text-4xl font-bold text-white">₹{totalIncome}</p>
              <div className="mt-4 flex items-center text-white/70 text-xs">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>All time earnings</span>
              </div>
            </div>
          </div>

          {/* Total Clients */}
          <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gmeshMain opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gmeshMain/10 dark:bg-gmeshMain/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gmeshMain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Clients</p>
              <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">{clients.length}</p>
            </div>
          </div>

          {/* Active Cases */}
          <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Active Cases</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{quickStats.activeCases}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{quickStats.pendingCases}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{quickStats.completedCases}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Cases</p>
                <p className="text-2xl font-bold text-gmeshMain">{clients.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gmeshMain/10 dark:bg-gmeshMain/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-gmeshMain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section - Bento Layout */}
        {!isLoadingAnalytics && analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <RevenueChart revenueData={analytics.revenue} />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <ClientStats clientData={analytics.clients} />
              </div>
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <CaseStats caseData={analytics.cases} performanceData={analytics.performance} />
              </div>
            </div>
          </div>
        )}

        {/* Cases & Clients Section */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex">
              <button
                onClick={() => setActiveTab('cases')}
                className={`px-6 py-4 font-medium text-sm transition-all relative ${
                  activeTab === 'cases'
                    ? 'text-gmeshMain dark:text-gmeshMain'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                My Cases
                {activeTab === 'cases' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gmeshMain"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-6 py-4 font-medium text-sm transition-all relative ${
                  activeTab === 'clients'
                    ? 'text-gmeshMain dark:text-gmeshMain'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Clients
                {activeTab === 'clients' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gmeshMain"></span>
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'cases' ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Cases</h2>
                  
                  {/* Filters and Search */}
                  <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search cases by client name or description..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>
                    <div className="md:w-48">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-700 dark:text-white transition-all"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="md:w-48">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-700 dark:text-white transition-all"
                      >
                        <option value="date">Sort by Date</option>
                        <option value="status">Sort by Status</option>
                        <option value="client">Sort by Client</option>
                        <option value="amount">Sort by Amount</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cases List */}
                {filteredAndSortedCases.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAndSortedCases.map((client) => (
                      <div key={client._id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                        <CaseCard
                          caseItem={client}
                          onUpdate={handleCaseUpdate}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-400 dark:text-gray-300">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'No cases match your filters.' 
                        : 'No cases found yet.'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <ClientList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;

