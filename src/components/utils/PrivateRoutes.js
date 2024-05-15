import React, { useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ThemeContext } from "../darkMode/ThemeContext";
import Swal from "sweetalert2";

const useAuth = () => {
  const user = localStorage.getItem("auth_token1");
  return !!user;
};

const ProtectedRoutes = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!auth) {
      Swal.fire({
        text: "Please Signup before accessing it",
      }).then(() => {
        setShouldNavigate(true);
      });
    }
  }, [auth]);

  if (shouldNavigate) {
    return <Navigate to="/signup" />;
  }

  return auth ? <Outlet /> : null;
};

export default ProtectedRoutes;
