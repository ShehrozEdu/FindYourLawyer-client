import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced, faUsers, faChartLine, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

function ValueProposition() {
  const valuePoints = [
    {
      icon: faScaleBalanced,
      title: "Complete Case Management",
      description: "Manage all your cases, documents, and client communications in one centralized platform. Never lose track of important details again."
    },
    {
      icon: faUsers,
      title: "Client Portal Access",
      description: "Give your clients 24/7 access to their case status, documents, and communication history. Reduce support calls and improve satisfaction."
    },
    {
      icon: faChartLine,
      title: "Real-Time Analytics",
      description: "Track your firm's performance with comprehensive dashboards. Monitor revenue, case status, lawyer productivity, and client satisfaction metrics."
    },
    {
      icon: faShieldHalved,
      title: "Secure & Compliant",
      description: "Bank-level security with SOC 2 compliance. Your data and your clients' information are protected with industry-leading encryption."
    }
  ];

  return (
    <section id="value-proposition" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything Your Law Firm Needs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A comprehensive platform designed specifically for modern law firms. Manage cases, clients, lawyers, and operations all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {valuePoints.map((point, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gmeshMain/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={point.icon} className="text-3xl text-gmeshMain" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProposition;

