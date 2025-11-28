import React from 'react';

const RevenueChart = ({ revenueData }) => {
  if (!revenueData || !revenueData.byMonth) {
    return (
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Revenue Analytics</h3>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...revenueData.byMonth.map(m => m.revenue), 1);

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Revenue Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue overview</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">This Month</p>
          <p className="text-2xl md:text-3xl font-bold text-gmeshMain">
            ₹{revenueData.monthly?.toLocaleString('en-IN') || '0'}
          </p>
          {revenueData.trend && (
            <p className={`text-xs mt-1 flex items-center justify-end gap-1 ${revenueData.trend === 'up' ? 'text-green-600 dark:text-green-400' : revenueData.trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {revenueData.trend === 'up' ? '↑' : revenueData.trend === 'down' ? '↓' : '→'} 
              {revenueData.trend === 'up' ? ' Increased' : revenueData.trend === 'down' ? ' Decreased' : ' Stable'} from last month
            </p>
          )}
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="mt-8">
        <div className="flex items-end justify-between h-56 md:h-64 space-x-2">
          {revenueData.byMonth.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="w-full flex items-end justify-center relative" style={{ height: '100%' }}>
                <div
                  className="w-full bg-gradient-to-t from-gmeshMain to-gmeshMain/70 rounded-t-lg hover:from-gmeshMain hover:to-gmeshMain transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                  style={{ height: `${Math.max((month.revenue / maxRevenue) * 100, 5)}%` }}
                  title={`${month.month}: ₹${month.revenue.toLocaleString('en-IN')}`}
                />
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ₹{month.revenue.toLocaleString('en-IN')}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                {month.month.split(' ')[0].substring(0, 3)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{revenueData.lastMonth?.toLocaleString('en-IN') || '0'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">This Year</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{revenueData.yearly?.toLocaleString('en-IN') || '0'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg/Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{Math.round((revenueData.yearly || 0) / 12).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;

