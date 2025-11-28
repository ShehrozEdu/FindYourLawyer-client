import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faPhone, faCalendar, faRocket, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function CTASection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firmName: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Create backend endpoint for demo requests
      // await apiService.post('/marketing/demo-request', formData);
      
      // For now, just show success message
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Demo request error:", error);
      setIsSubmitting(false);
    }
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gmeshBlue via-[#021550] to-gmeshBlue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Law Firm?
            </h2>
            <p className="text-xl text-gray-300">
              Start your 14-day free trial today. No credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Start CTA */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gmeshMain rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold">Get Started Now</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Create your account and start managing your firm in minutes. Full access to all features during your free trial.
              </p>
              <button
                onClick={handleGetStarted}
                className="w-full bg-gmeshMain hover:bg-[#25b8ad] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            {/* Demo Request Form */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gmeshMain rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendar} className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold">Schedule a Demo</h3>
              </div>
              <p className="text-gray-300 mb-6">
                See the platform in action with a personalized demo tailored to your firm's needs.
              </p>

              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 text-3xl mb-2" />
                  <p className="text-white font-semibold">Thank you! We'll contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gmeshMain"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gmeshMain"
                  />
                  <input
                    type="text"
                    name="firmName"
                    placeholder="Law Firm Name"
                    value={formData.firmName}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gmeshMain"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gmeshMain"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gmeshMain hover:bg-[#25b8ad] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Request Demo"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Options */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">Or contact us directly:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:sales@findyourlawyer.com" className="flex items-center gap-2 text-gray-300 hover:text-gmeshMain transition-colors">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>sales@findyourlawyer.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-300 hover:text-gmeshMain transition-colors">
                <FontAwesomeIcon icon={faPhone} />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

