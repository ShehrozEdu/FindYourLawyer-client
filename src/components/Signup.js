import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ThemeContext } from "./darkMode/ThemeContext";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Signup = () => {
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

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Expertise: "",
    FeePerCase: "",
    ContactNumber: "",
    State: "",
  });

  const { setUserLogin, userLogin, setUserLawyerToggle, setShowModal } =
    useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate fields
    const newErrors = { ...errors };
    switch (name) {
      case "FirstName":
        newErrors.FirstName = value ? "" : "First Name is required";
        break;
      case "LastName":
        newErrors.LastName = value ? "" : "Last Name is required";
        break;
      case "Email":
        newErrors.Email = value ? "" : "Email is required";
        break;
      case "Password":
        newErrors.Password = value ? "" : "Password is required";
        break;
      case "Expertise":
        newErrors.Expertise =
          formData.isLawyer && !value ? "Expertise is required" : "";
        break;
      case "FeePerCase":
        newErrors.FeePerCase =
          formData.isLawyer && !value ? "Fee per case is required" : "";
        break;
      case "ContactNumber":
        newErrors.ContactNumber =
          formData.isLawyer && !value ? "Contact Number is required" : "";
        break;
      case "State":
        newErrors.State = value ? "" : "State is required";
        break;

      default:
        break;
    }
    setErrors(newErrors);
  };

  let newErrors;
  let userDataLocal;
  const navigate = useNavigate();

  const fetchData = async () => {
    const objUser = localStorage.getItem("auth_token1");
    console.log("OBJ", objUser);
    if (objUser) {
      userDataLocal = JSON.parse(objUser);
      // setLocalNameDetails(userDataLocal.FirstName);
      setUserLawyerToggle(userDataLocal.isLawyer ? true : false);

      let actualToken = userDataLocal.token;
      //   console.log(actualToken);
      try {
        const decoded = jwt_decode(actualToken);
        setUserLogin(decoded);
        //   console.log(userLogin)
      } catch (error) {
        console.error("Error decoding objUser:", error.message);
        setUserLogin(null);
      }
    } else {
      setUserLogin(null);
      console.log("else", userLogin);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate First Name
    if (!formData.FirstName) {
      newErrors.FirstName = "First Name is required";
      valid = false;
    }

    // Validate Last Name
    if (!formData.LastName) {
      newErrors.LastName = "Last Name is required";
      valid = false;
    }

    // Validate Email
    if (!formData.Email) {
      newErrors.Email = "Email is required";
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

    // Additional validation for lawyers
    if (formData.isLawyer) {
      if (!formData.Expertise) {
        newErrors.Expertise = "Expertise is required";
        valid = false;
      }
      if (!formData.FeePerCase) {
        newErrors.FeePerCase = "Fee per case is required";
        valid = false;
      }
      if (!formData.ContactNumber) {
        newErrors.ContactNumber = "Contact Number is required";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData,
        { withCredentials: true }
      );

      localStorage.setItem("auth_token1", JSON.stringify(response.data.result));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signup Successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        fetchData();
        navigate("/");
        window.location.reload();
      });

      if (response.data.result === undefined) {
        newErrors.Email = `${errors.Email} Email already in use`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Signup Failed",
        text:
          error.response && error.response.data
            ? error.response.data.message
            : "An error occurred during signup. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
      <div className="flex justify-center items-center">
        <div>
          <Card className="w-96">
            <form onSubmit={handleSubmit}>
              <CardHeader
                variant="gradient"
                color="amber"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Sign Up
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="First Name"
                  size="lg"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                />
                {errors.FirstName && (
                  <Typography color="red" variant="small">
                    {errors.FirstName}
                  </Typography>
                )}
                <Input
                  label="Last Name"
                  size="lg"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                />
                {errors.LastName && (
                  <Typography color="red" variant="small">
                    {errors.LastName}
                  </Typography>
                )}
                <Input
                  label="Email"
                  size="lg"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
                {errors.Email && (
                  <Typography color="red" variant="small">
                    {errors.Email}
                  </Typography>
                )}
                <Input
                  label="Password"
                  size="lg"
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                {errors.Password && (
                  <Typography color="red" variant="small">
                    {errors.Password}
                  </Typography>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isLawyer"
                    name="isLawyer"
                    checked={formData.isLawyer}
                    onChange={handleChange}
                  />
                  <label htmlFor="isLawyer">Are you a Lawyer?</label>
                </div>
                {formData.isLawyer && (
                  <>
                    <Input
                      label="Expertise"
                      size="lg"
                      name="Expertise"
                      value={formData.Expertise}
                      onChange={handleChange}
                    />
                    {errors.Expertise && (
                      <Typography color="red" variant="small">
                        {errors.Expertise}
                      </Typography>
                    )}
                    <Input
                      label="Fee per case"
                      size="lg"
                      name="FeePerCase"
                      value={formData.FeePerCase}
                      onChange={handleChange}
                    />
                    {errors.FeePerCase && (
                      <Typography color="red" variant="small">
                        {errors.FeePerCase}
                      </Typography>
                    )}
                    <Input
                      label="Contact Number"
                      size="lg"
                      name="ContactNumber"
                      value={formData.ContactNumber}
                      onChange={handleChange}
                    />
                    {errors.ContactNumber && (
                      <Typography color="red" variant="small">
                        {errors.ContactNumber}
                      </Typography>
                    )}
                    <Input
                      label="State"
                      size="lg"
                      name="State"
                      value={formData.State}
                      onChange={handleChange}
                    />
                    {errors.State && (
                      <Typography color="red" variant="small">
                        {errors.State}
                      </Typography>
                    )}
                  </>
                )}
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  variant="gradient"
                  className="text-white"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Already have an account?
                  <Typography
                    as="a"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
