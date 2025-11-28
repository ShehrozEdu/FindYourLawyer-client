import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [errors, setErrors] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.Email) newErrors.Email = "Email is required";
    if (!formData.Password) newErrors.Password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData.Email, formData.Password);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.href = "/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: result.error,
        showConfirmButton: true,
      });
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/bookings"));
    } else {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: result.error,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/login_bg.png')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <h1 className="text-5xl font-bold mb-6 Crimson">
            Find Your <span className="text-[#e7aa40]">Lawyer</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-md leading-relaxed">
            Connect with top legal professionals. Expert consultation at your fingertips.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 Crimson">
              Find Your <span className="text-[#e7aa40]">Lawyer</span>
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue to your account</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === "email" ? "text-[#e7aa40] border-b-2 border-[#e7aa40]" : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("email")}
              >
                Email
              </button>
              <button
                className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === "google" ? "text-[#e7aa40] border-b-2 border-[#e7aa40]" : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("google")}
              >
                Google
              </button>
            </div>

            {/* Email/Password Tab */}
            {activeTab === "email" && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e7aa40] hover:bg-[#d69930] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Google Tab */}
            {activeTab === "google" && (
              <GoogleOAuthProvider clientId="263148022359-f2gtatcn7s3afukeqjf877ooee8rmgjg.apps.googleusercontent.com">
                <div className="flex flex-col items-center space-y-4 py-4">
                  <GoogleLogin
                    width={320}
                    logo_alignment={"center"}
                    shape={"rectangular"}
                    size={"large"}
                    onSuccess={onGoogleSuccess}
                    onError={() => Swal.fire({ icon: "error", title: "Google Login Failed" })}
                  />
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </GoogleOAuthProvider>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account? <a href="/signup" className="text-[#e7aa40] hover:underline font-semibold">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
