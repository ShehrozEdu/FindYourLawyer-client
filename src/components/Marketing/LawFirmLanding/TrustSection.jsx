import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faLock, faCertificate, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function TrustSection() {
  const trustPoints = [
    {
      icon: faShieldHalved,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security standards to protect your data"
    },
    {
      icon: faLock,
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest"
    },
    {
      icon: faCertificate,
      title: "Regular Backups",
      description: "Automated daily backups ensure your data is always safe"
    },
    {
      icon: faCheckCircle,
      title: "99.9% Uptime",
      description: "Reliable infrastructure you can count on"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Law Firms
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Security and reliability you can trust for your most sensitive legal data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl text-center border border-gray-200 dark:border-gray-600 hover:border-gmeshMain transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gmeshMain/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={point.icon} className="text-3xl text-gmeshMain" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "This platform transformed how we manage our practice. The time savings alone paid for itself in the first month."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gmeshMain/20 rounded-full flex items-center justify-center">
                  <span className="text-gmeshMain font-bold text-lg">JD</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">John Davis</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Managing Partner, Davis & Associates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;

