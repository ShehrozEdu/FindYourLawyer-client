import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDollarSign, faUserCheck, faChartBar } from "@fortawesome/free-solid-svg-icons";

function BenefitsSection() {
  const benefits = [
    {
      icon: faClock,
      metric: "50%",
      metricLabel: "Time Saved",
      description: "Automate routine tasks and focus on what matters - your clients and cases."
    },
    {
      icon: faDollarSign,
      metric: "30%",
      metricLabel: "Revenue Increase",
      description: "Better case management leads to more billable hours and faster payments."
    },
    {
      icon: faUserCheck,
      metric: "95%",
      metricLabel: "Client Satisfaction",
      description: "Transparent communication and easy access to case information keeps clients happy."
    },
    {
      icon: faChartBar,
      metric: "3x",
      metricLabel: "Faster Growth",
      description: "Scale your practice efficiently without proportional increases in administrative overhead."
    }
  ];

  return (
    <section className="py-20 bg-gmeshBlue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Measurable Results for Your Firm
          </h2>
          <p className="text-xl text-gray-300">
            Law firms using our platform see significant improvements in efficiency, revenue, and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gmeshMain/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FontAwesomeIcon icon={benefit.icon} className="text-3xl text-gmeshMain" />
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gmeshMain mb-2">
                  {benefit.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-3">
                  {benefit.metricLabel}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;

