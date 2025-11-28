import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUsers, faBriefcase, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function DashboardPreview() {
  const stats = [
    { icon: faBriefcase, label: "Active Cases", value: "247" },
    { icon: faUsers, label: "Total Clients", value: "1,234" },
    { icon: faChartLine, label: "This Month", value: "+18%" },
    { icon: faDollarSign, label: "Revenue", value: "$125K" }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Admin Dashboard
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get complete visibility and control over your firm's operations from one central dashboard.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-600">
            {/* Dashboard Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Firm Overview</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gmeshMain/10 to-gmeshMain/5 rounded-lg p-4 border border-gmeshMain/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gmeshMain/20 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={stat.icon} className="text-gmeshMain" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Case Management</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gmeshMain w-3/4"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Client Portal</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gmeshMain w-5/6"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Analytics</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gmeshMain w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Callout */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-semibold text-gmeshMain">All features included</span> - No hidden costs, no per-user fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;

