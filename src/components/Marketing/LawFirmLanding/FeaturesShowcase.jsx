import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faFileContract,
  faComments,
  faCreditCard,
  faBell,
  faSearch,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";

function FeaturesShowcase() {
  const features = [
    {
      icon: faBriefcase,
      title: "Case Management",
      description: "Organize and track all your cases with custom statuses, deadlines, and priorities."
    },
    {
      icon: faCalendarAlt,
      title: "Appointment Scheduling",
      description: "Integrated calendar system for booking consultations and managing lawyer availability."
    },
    {
      icon: faFileContract,
      title: "Document Management",
      description: "Secure document storage, version control, and easy sharing with clients and team members."
    },
    {
      icon: faComments,
      title: "Client Communication",
      description: "Built-in messaging system for seamless communication between lawyers and clients."
    },
    {
      icon: faCreditCard,
      title: "Payment Processing",
      description: "Accept payments securely with integrated payment gateway. Track invoices and revenue."
    },
    {
      icon: faBell,
      title: "Notifications & Reminders",
      description: "Automated reminders for appointments, deadlines, and important case updates."
    },
    {
      icon: faSearch,
      title: "Advanced Search",
      description: "Quickly find cases, clients, documents, and conversations with powerful search capabilities."
    },
    {
      icon: faUserShield,
      title: "Role-Based Access",
      description: "Control who sees what with granular permissions for admins, lawyers, and clients."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Modern Law Firms
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to run your practice efficiently, all in one integrated platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gmeshMain transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gmeshMain/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gmeshMain group-hover:scale-110 transition-all duration-300">
                <FontAwesomeIcon icon={feature.icon} className="text-xl text-gmeshMain group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesShowcase;

