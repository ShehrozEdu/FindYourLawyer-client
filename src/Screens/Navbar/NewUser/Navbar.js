import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

export default function NewUSerNavBar() {
  const [navbar, setNavbar] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const navigateToSignup = () => {
    setShowModal(false);
    navigate("/signup");
  };
  const navigateToHome= ()=>{
  navigate("/")
  }

  let [userLogin, setUserLogin] = useState(null);
  let onSuccess = (response) => {
    localStorage.setItem("auth_token2", response.credential); //can be like token= response.cred..
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => window.location.reload());
  };

  let onError = () => {
    alert("Login Failed");
  };

  let logout = () => {
    localStorage.removeItem("auth_token2");
    window.location.reload();
  };
  useEffect(() => {
    let token = localStorage.getItem("auth_token2");
    if (token) {
      let decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center practices-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-300 dark:bg-gray-600">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                {/* -------------------- */}
                {/*header*/}
                {/* ------------------------------------- */}
                <div className="flex practices-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1
                    className="text-center text-4xl text-amber-600 font-display font-semibold  xl:text-5xl
                    xl:text-bold underline Crimson "
                  >
                    Sign in
                  </h1>
                </div>
                {/*MODAL body*/}
                <>
                  <GoogleOAuthProvider clientId="263148022359-f2gtatcn7s3afukeqjf877ooee8rmgjg.apps.googleusercontent.com">
                    <div className="lg:flex dark:bg-gray-800">
                      <div className="lg:w-full xl:max-w-screen-sm">
                        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12 dark:bg-gray-800"></div>
                        <div className="mt-2 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-1 xl:px-24 xl:max-w-2xl my-16 ">
                          <div className="flex flex-col items-center mt-2 lg:mb-0 mb-18">
                            <p className="Crimson text-2xl text-amber-600 mb-3">
                              Login With Google
                            </p>
                            <GoogleLogin
                              shape={"circle"}                              
                              onSuccess={(credentialResponse) => {
                                onSuccess(credentialResponse);
                              }}
                              onError={() => {
                                onError();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </GoogleOAuthProvider>
                </>
                {/*footer*/}
                <div className="flex practices-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <nav className="w-full bg-white dark:bg-gray-900 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
           
            <div className="flex items-center justify-between py-3 md:py-5">     
                <img src="/img/logo.png" className="logo cursor-pointer mr-0" alt="" onClick={navigateToHome} />
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
            {userLogin === null ? (
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-gray-700 dark:text-white  font-bold hover:text-amber-600 dark:hover:text-yellow-300 ">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="text-gray-700 dark:text-white font-medium hover:text-amber-600 dark:hover:text-yellow-300 ">
                    <Link to="/bookings">Lawyer Booking</Link>
                  </li>
                  <li
                    className="text-gray-700 dark:text-white font-medium hover:text-amber-600 dark:hover:text-yellow-300 cursor-pointer "
                    onClick={() => setShowModal(true)}
                  >
                    Sign In
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-gray-700 dark:text-white  font-bold hover:text-amber-600 dark:hover:text-yellow-300 ">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="text-gray-700 dark:text-white font-medium hover:text-amber-600 dark:hover:text-yellow-300 ">
                    <Link to="/bookings">Lawyer Booking</Link>
                  </li>
                  <li
                    className="text-gray-700 dark:text-white font-medium hover:text-amber-600 dark:hover:text-yellow-300 cursor-pointer "
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
