import React from 'react';

const CaseStats = ({ caseData, performanceData }) => {
  if (!caseData) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Case Statistics</h3>
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  const totalCases = caseData.total || 0;
  const casesByStatus = caseData.byStatus || {};

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Case Statistics</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Case overview</p>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-800">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Cases</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalCases}</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-purple-200/50 dark:bg-purple-800/50 flex items-center justify-center">
            <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(casesByStatus).map(([status, count]) => (
            <div key={status} className={`p-3.5 rounded-xl border ${statusColors[status] || 'bg-gray-100 dark:bg-gray-700'} transition-transform hover:scale-105`}>
              <p className="text-xs font-semibold mb-1.5">{formatStatus(status)}</p>
              <p className="text-xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        {performanceData && (
          <div className="mt-5 pt-5 space-y-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {performanceData.completionRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${performanceData.completionRate || 0}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Resolution Time</span>
              <span className="text-base font-bold text-gray-900 dark:text-white">
                {performanceData.averageResolutionTime || 0} days
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStats;

