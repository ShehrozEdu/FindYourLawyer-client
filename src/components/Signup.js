import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    isLawyer: false,
    Expertise: "",
    FeePerCase: "",
    ContactNumber: "",
    State: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!formData.LastName.trim()) newErrors.LastName = "Last name is required";
    if (!formData.Email.trim()) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Email is invalid";
    }
    if (!formData.Password) {
      newErrors.Password = "Password is required";
    } else if (formData.Password.length < 8) {
      newErrors.Password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!formData.isLawyer) return true;

    const newErrors = {};
    if (!formData.Expertise.trim()) newErrors.Expertise = "Expertise is required";
    if (!formData.FeePerCase) newErrors.FeePerCase = "Fee per case is required";
    if (!formData.ContactNumber.trim()) newErrors.ContactNumber = "Contact number is required";
    if (!formData.State.trim()) newErrors.State = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      handleNext();
      return;
    }

    if (!validateStep2()) return;

    const result = await signup(formData);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to FindYourLawyer",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.href = "/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: result.error,
        showConfirmButton: true,
      });
    }
  };

  const getPasswordStrength = () => {
    const password = formData.Password;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/signup_bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <h1 className="text-5xl font-bold mb-6 Crimson">
            Join <span className="text-[#e7aa40]">FindYourLawyer</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-md leading-relaxed mb-8">
            Create your account and connect with top legal professionals today.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#e7aa40] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <p className="text-gray-200">Access to verified lawyers</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#e7aa40] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <p className="text-gray-200">Secure & confidential consultations</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#e7aa40] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <p className="text-gray-200">24/7 legal support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 Crimson">
              Find Your <span className="text-[#e7aa40]">Lawyer</span>
            </h1>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Step {currentStep} of 2</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${currentStep >= 1 ? 'text-[#e7aa40] font-semibold' : 'text-gray-400'}`}>
                  Basic Info
                </span>
                <span className={`text-sm ${currentStep >= 2 ? 'text-[#e7aa40] font-semibold' : 'text-gray-400'}`}>
                  {formData.isLawyer ? 'Lawyer Details' : 'Finish'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#e7aa40] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                        placeholder="John"
                      />
                      {errors.FirstName && <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                        placeholder="Doe"
                      />
                      {errors.LastName && <p className="text-red-500 text-sm mt-1">{errors.LastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                    {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password}</p>}

                    {/* Password Strength Indicator */}
                    {formData.Password && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Password strength:</span>
                          <span className={`font-semibold ${passwordStrength.label === 'Weak' ? 'text-red-500' :
                            passwordStrength.label === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                            }`}>{passwordStrength.label}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="isLawyer"
                      name="isLawyer"
                      checked={formData.isLawyer}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#e7aa40] border-gray-300 rounded focus:ring-[#e7aa40]"
                    />
                    <label htmlFor="isLawyer" className="text-sm text-gray-700 font-medium">
                      I am a lawyer
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e7aa40] hover:bg-[#d69930] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg"
                  >
                    Continue
                  </button>
                </>
              )}

              {/* Step 2: Lawyer Details or Finish */}
              {currentStep === 2 && (
                <>
                  {formData.isLawyer ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area of Expertise</label>
                        <input
                          type="text"
                          name="Expertise"
                          value={formData.Expertise}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                          placeholder="e.g., Criminal Law, Family Law"
                        />
                        {errors.Expertise && <p className="text-red-500 text-sm mt-1">{errors.Expertise}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fee Per Case ($)</label>
                        <input
                          type="number"
                          name="FeePerCase"
                          value={formData.FeePerCase}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                          placeholder="500"
                        />
                        {errors.FeePerCase && <p className="text-red-500 text-sm mt-1">{errors.FeePerCase}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input
                          type="tel"
                          name="ContactNumber"
                          value={formData.ContactNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.ContactNumber && <p className="text-red-500 text-sm mt-1">{errors.ContactNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          name="State"
                          value={formData.State}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                          placeholder="California"
                        />
                        {errors.State && <p className="text-red-500 text-sm mt-1">{errors.State}</p>}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">✓</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Almost Done!</h3>
                      <p className="text-gray-600">Click below to create your account</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#e7aa40] hover:bg-[#d69930] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg"
                    >
                      Create Account
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Already have an account? <a href="/login" className="text-[#e7aa40] hover:underline font-semibold">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
