import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faCog, faRocket, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: faUserPlus,
      title: "Sign Up Your Firm",
      description: "Create your firm account in minutes. No credit card required for the free trial."
    },
    {
      number: "02",
      icon: faCog,
      title: "Customize Your Portal",
      description: "Add your lawyers, set up case categories, configure pricing, and brand your client portal."
    },
    {
      number: "03",
      icon: faRocket,
      title: "Start Managing Cases",
      description: "Invite clients, create cases, schedule appointments, and manage everything from one dashboard."
    },
    {
      number: "04",
      icon: faCheckCircle,
      title: "Scale Your Practice",
      description: "Grow your firm with analytics, automated workflows, and seamless client management."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started in four simple steps. Your firm can be up and running in less than an hour.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gmeshMain/30 transform translate-x-4 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gmeshMain rounded-full"></div>
                  </div>
                )}

                <div className="relative bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gmeshMain rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-gmeshMain/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <FontAwesomeIcon icon={step.icon} className="text-4xl text-gmeshMain" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gmeshMain hover:bg-[#25b8ad] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

