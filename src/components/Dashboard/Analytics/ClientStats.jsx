import React from 'react';

const ClientStats = ({ clientData }) => {
  if (!clientData) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Client Statistics</h3>
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  const totalClients = clientData.total || 0;
  const newClients = clientData.newThisMonth || 0;
  const returningClients = clientData.returning || 0;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Client Statistics</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Client overview</p>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-gmeshMain/10 to-gmeshMain/5 dark:from-gmeshMain/20 dark:to-gmeshMain/10 rounded-xl border border-gmeshMain/20">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Clients</p>
            <p className="text-3xl font-bold text-gmeshBlue dark:text-gmeshMain">{totalClients}</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-gmeshMain/20 dark:bg-gmeshMain/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-gmeshMain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">New This Month</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{newClients}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Returning</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{returningClients}</p>
          </div>
        </div>

        {totalClients > 0 && (
          <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>New Clients Ratio</span>
              <span className="font-semibold">{Math.round((newClients / totalClients) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-gmeshMain to-gmeshMain/80 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(newClients / totalClients) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientStats;

