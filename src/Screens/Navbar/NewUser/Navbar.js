import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { ThemeContext } from "../../../components/darkMode/ThemeContext";
import { useAuth } from "../../../contexts/AuthContext";
import NotificationBell from "../../../components/Notifications/NotificationBell";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export default function NewUSerNavBar() {
  const { showModal, setShowModal } = useContext(ThemeContext);
  const { user, isAuthenticated, loading, login, logout, isLawyer, isClient, isAdmin, isSuperAdmin } = useAuth();
  const [navbar, setNavbar] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(true);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState({
    Email: "",
    Password: "",
  });

  const location = useLocation();

  const navigateToSignup = () => {
    setShowModal(false);
    window.location.href = "/signup";
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  const onGoogleSuccess = (response) => {
    // Handle Google login - you may need to implement this endpoint
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => window.location.href = "/");
  };

  const onGoogleError = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Login Failed",
      text: "Google authentication failed. Please try again.",
      showConfirmButton: true,
    });
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
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
      setShowModal(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.href = "/");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        text: result.error,
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-md">
              {/* Modal Content */}
              <div className="border-0 rounded-2xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 rounded-t">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Welcome Back
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-400 hover:text-gray-600 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="relative p-8 flex-auto">
                  <p className="text-gray-600 text-center mb-6">
                    Sign in to continue to your account
                  </p>

                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`flex-1 py-2 text-center font-semibold transition-colors ${showEmailLogin
                        ? "text-[#e7aa40] border-b-2 border-[#e7aa40]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                      onClick={() => setShowEmailLogin(true)}
                    >
                      Email
                    </button>
                    <button
                      className={`flex-1 py-2 text-center font-semibold transition-colors ${!showEmailLogin
                        ? "text-[#e7aa40] border-b-2 border-[#e7aa40]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                      onClick={() => setShowEmailLogin(false)}
                    >
                      Google
                    </button>
                  </div>

                  {/* Email/Password Form */}
                  {showEmailLogin ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none"
                          placeholder="your@email.com"
                        />
                        {errors.Email && (
                          <p className="text-red-500 text-sm mt-1">{errors.Email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          name="Password"
                          value={formData.Password}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e7aa40] focus:border-transparent outline-none"
                          placeholder="••••••••"
                        />
                        {errors.Password && (
                          <p className="text-red-500 text-sm mt-1">{errors.Password}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#e7aa40] hover:bg-[#d69930] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                      >
                        Sign In
                      </button>
                    </form>
                  ) : (
                    /* Google Login */
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                      <div className="flex flex-col items-center space-y-4">
                        <GoogleLogin
                          width={320}
                          logo_alignment={"center"}
                          shape={"rectangular"}
                          size={"large"}
                          onSuccess={(credentialResponse) => {
                            onGoogleSuccess(credentialResponse);
                          }}
                          onError={() => {
                            onGoogleError();
                          }}
                        />
                        <p className="text-sm text-gray-500 text-center mt-4">
                          By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </div>
                    </GoogleOAuthProvider>
                  )}

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <span
                        className="text-[#e7aa40] hover:underline cursor-pointer font-semibold"
                        onClick={navigateToSignup}
                      >
                        Sign up
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <nav className="w-full bg-white dark:bg-gray-900 shadow">
        <div className="justify-between xl:mr-8 lg:mr-8 md:mr-8 md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5">
              <img
                src="/img/logo.png"
                className="logo cursor-pointer mr-0"
                alt=""
                onClick={navigateToHome}
              />
              <h2 className="ml-3 text-xl fw-bolder text-black dark:text-white">
                FindYourLawyer
              </h2>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/">Home</Link>
                </li>
                
                {/* Common Links for All Users */}
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/bookings" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/bookings">Book a Lawyer</Link>
                </li>
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/lawyersList" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/lawyersList">Lawyers</Link>
                </li>
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/blogs" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/blogs">Blogs</Link>
                </li>
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/books" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/books">Books</Link>
                </li>

                {!loading && (
                  <>
                    {isAuthenticated ? (
                      <>
                        {/* Admin-specific navigation */}
                        {isAdmin && (
                          <li
                            className={`text-gray-700 dark:text-white ${location.pathname === "/admin" ? "font-bold" : "font-medium"
                              } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                          >
                            <Link to="/admin">Admin Panel</Link>
                          </li>
                        )}

                        {/* Client-specific navigation */}
                        {isClient && !isAdmin && (
                          <>
                            <li
                              className={`text-gray-700 dark:text-white ${location.pathname === "/client-dashboard" ? "font-bold" : "font-medium"
                                } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                            >
                              <Link to="/client-dashboard">My Dashboard</Link>
                            </li>
                            <li
                              className={`text-gray-700 dark:text-white ${location.pathname === "/my-bookings" ? "font-bold" : "font-medium"
                                } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                            >
                              <Link to="/my-bookings">My Bookings</Link>
                            </li>
                          </>
                        )}

                        {/* Lawyer-specific navigation */}
                        {isLawyer && (
                          <>
                            <li
                              className={`text-gray-700 dark:text-white ${location.pathname === "/lawyer-dashboard" ? "font-bold" : "font-medium"
                                } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                            >
                              <Link to="/lawyer-dashboard">Dashboard</Link>
                            </li>
                            <li
                              className={`text-gray-700 dark:text-white ${location.pathname === "/calendar" ? "font-bold" : "font-medium"
                                } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                            >
                              <Link to="/calendar">Calendar</Link>
                            </li>
                          </>
                        )}

                        {/* Notifications */}
                        {isAuthenticated && (
                          <li>
                            <NotificationBell />
                          </li>
                        )}

                        {/* User Menu Dropdown */}
                        <li className="text-gray-700 dark:text-white hover:text-[#e7aa40] dark:hover:text-yellow-300">
                          <Popover placement="bottom">
                            <PopoverHandler>
                              <button className="flex items-center space-x-2 focus:outline-none">
                                <span className="text-gray-700 dark:text-white">
                                  {user?.FirstName} {user?.LastName}
                                </span>
                                <svg
                                  className="w-4 h-4 text-gray-700 dark:text-white"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M19 9l-7 7-7-7"></path>
                                </svg>
                              </button>
                            </PopoverHandler>
                            <PopoverContent className="w-56 p-2 dark:bg-gray-800">
                              <div className="flex flex-col space-y-1">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {user?.FirstName} {user?.LastName}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.Email}
                                  </p>
                                  <p className="text-xs text-gmeshMain mt-1">
                                    {user?.isSuperAdmin ? 'Super Admin' : user?.isAdmin ? 'Admin' : user?.isLawyer ? 'Lawyer' : 'Client'}
                                  </p>
                                </div>
                                
                                {isAdmin && (
                                  <Link
                                    to="/admin"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    🛡️ Admin Panel
                                  </Link>
                                )}

                                {isClient && !isAdmin && (
                                  <Link
                                    to="/client-dashboard"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    📊 My Dashboard
                                  </Link>
                                )}
                                
                                {isClient && !isAdmin && (
                                  <Link
                                    to="/my-bookings"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    📋 My Bookings
                                  </Link>
                                )}

                                {isLawyer && (
                                  <Link
                                    to="/lawyer-dashboard"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    📊 Lawyer Dashboard
                                  </Link>
                                )}

                                {isLawyer && (
                                  <Link
                                    to="/calendar"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    📅 Calendar
                                  </Link>
                                )}

                                {isLawyer && (
                                  <Link
                                    to="/blogs"
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    ✍️ Write Blog
                                  </Link>
                                )}

                                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                
                                <button
                                  onClick={handleLogout}
                                  className="px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                >
                                  🚪 Logout
                                </button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="text-gray-700 dark:text-white hover:text-[#e7aa40] dark:hover:text-yellow-300">
                          <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            Login
                          </button>
                        </li>
                        <li className="text-gray-700 dark:text-white">
                          <Link
                            to="/signup"
                            className="px-4 py-2 bg-[#e7aa40] text-white rounded-md hover:bg-[#d69930] transition-colors"
                          >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
          </div>

        </div>
      </div>
    </nav >
    </>
  );
}
