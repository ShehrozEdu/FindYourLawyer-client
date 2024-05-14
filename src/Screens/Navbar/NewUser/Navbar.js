import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { ThemeContext } from "../../../components/darkMode/ThemeContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import axiosInstance from "../../../components/Auth/AxiosInstance";

export default function NewUSerNavBar() {
  const { setUserLogin, showModal, setShowModal, userLogin, setUserLawyerToggle, userLawyerToggle } =
    useContext(ThemeContext);
  const [navbar, setNavbar] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState({
    Email: "",
    Password: "",
  });

  let navigate = useNavigate();
  const location = useLocation();
  let userDataLocal;
  const [localNameDetails, setLocalNameDetails] = useState("");
  const navigateToSignup = () => {
    setShowModal(false);
    navigate("/signup");
  };
  const navigateToHome = () => {
    navigate("/");
  };

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
    localStorage.removeItem("auth_token2") ||
      localStorage.removeItem("auth_token1");
    window.location.href = "/";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Validate fields
    if (name === "Email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Email: !value ? "Email is required" : "",
      }));
    } else if (name === "Password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Password: !value ? "Password is required" : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/users/login",
        formData,
        { withCredentials: true }
      );

      localStorage.setItem("auth_token1", JSON.stringify(response.data.result));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.reload());
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        text: error.response && error.response.data ? error.response.data.message : "Invalid credentials, please try again",
        showConfirmButton: true,
      });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const objUser = localStorage.getItem("auth_token1");
      if (objUser) {
        userDataLocal = JSON.parse(objUser);
        setLocalNameDetails(userDataLocal.FirstName);
        setUserLawyerToggle(userDataLocal.isLawyer ? true : false);
        let actualToken = userDataLocal.token;
        try {
          const decoded = jwt_decode(actualToken);
          setUserLogin(decoded);
        } catch (error) {
          console.error("Error decoding objUser:", error.message);
          setUserLogin(null);
        }
      } else {
        setUserLogin(null);
      }
    };

    fetchData();
  }, []);
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate Email
    if (!formData.Email) {
      newErrors.Email = "Email is required";
      valid = false;
    } else if (
      !formData.Email.includes("@") ||
      !formData.Email.includes(".com")
    ) {
      newErrors.Email = "Email should include @ and .com";
      valid = false;
    }

    // Validate Password
    if (!formData.Password) {
      newErrors.Password = "Password is required";
      valid = false;
    } else if (formData.Password.length < 8) {
      newErrors.Password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center practices-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-300 dark:bg-gray-600 py-16">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                {/*MODAL body*/}

                <div>
                  <div>
                    <Card className="w-96 shadow-none">
                      <form onSubmit={handleSubmit}>
                        <CardHeader
                          variant="gradient"
                          color="amber"
                          className="mb-4 grid h-28 place-items-center"
                        >
                          <Typography variant="h3" color="white">
                            Sign In
                          </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
                          <Input
                            label="Email"
                            size="lg"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                          />
                          <Typography color="red" variant="small">
                            {errors.Email}
                          </Typography>
                          <Input
                            label="Password"
                            size="lg"
                            type="password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                          />
                          <Typography color="red" variant="small">
                            {errors.Password}
                          </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Button
                            type="submit"
                            variant="gradient"
                            className="text-white"
                            fullWidth
                          >
                            Sign In
                          </Button>
                          <Typography
                            variant="small"
                            className="mt-6 flex justify-center"
                          >
                            Don&apos;t have an account?
                            <Typography
                              as="a"
                              variant="small"
                              color="blue-gray"
                              className="ml-1 font-bold cursor-pointer"
                              onClick={navigateToSignup}
                            >
                              Sign up
                            </Typography>
                          </Typography>
                        </CardFooter>
                      </form>
                    </Card>
                  </div>
                  <div>
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    >
                      <div className="lg:flex dark:bg-gray-800">
                        <div className="lg:w-full xl:max-w-screen-sm">
                          <div className="py-1 bg-amber-400 flex justify-center lg:justify-start lg:px-12 dark:bg-gray-800"></div>
                          <div className="px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-1 xl:px-24 xl:max-w-2xl my-16 ">
                            <div className="flex flex-col items-center  lg:mb-0 mb-18">
                              <p className="text-xl text-[#e7aa40] mb-3">or</p>

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
                  </div>
                </div>

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
                <li
                  className={`text-gray-700 dark:text-white ${location.pathname === "/bookings" ? "font-bold" : "font-medium"
                    } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                >
                  <Link to="/bookings">Lawyer Booking</Link>
                </li>
                {userLogin === null ? (
                  <li
                    className="text-gray-700 dark:text-white font-medium hover:text-[#e7aa40] dark:hover:text-yellow-300 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In
                  </li>
                ) : (
                  <>
                    <li
                      className={`text-gray-700 dark:text-white ${location.pathname === "/gemini" ? "font-bold" : "font-medium"
                        } hover:text-[#e7aa40] dark:hover:text-yellow-300`}
                    >
                      <Link to="/gemini">Try AI Chat</Link>
                    </li>
                    <li>
                      <Popover placement="bottom" className="dark:bg-black">
                        <PopoverHandler>
                          <span className="text-gray-700  dark:text-white font-medium hover:text-[#e7aa40] dark:hover:text-yellow-300 cursor-pointer ">
                            {localNameDetails}
                          </span>
                        </PopoverHandler>
                        <PopoverContent>
                          {userLawyerToggle && (
                            <Link to={"/lawyer-dashboard"}>
                              <div className="text-gray-700 dark:text-black font-medium hover:text-[#e7aa40] dark:hover:text-yellow-300 cursor-pointer">
                                Dashboard
                              </div>
                            </Link>
                          )}
                          <p
                            className="text-gray-700 dark:text-black font-medium hover:text-[#e7aa40] dark:hover:text-yellow-300 cursor-pointer "
                            onClick={logout}
                          >
                            Logout
                          </p>
                        </PopoverContent>
                      </Popover>
                    </li>
                  </>
                )}
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
