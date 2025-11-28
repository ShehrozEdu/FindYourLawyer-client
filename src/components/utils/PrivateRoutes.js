import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const ProtectedRoutes = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      Swal.fire({
        text: "Please Signup before accessing it",
      }).then(() => {
        setShouldNavigate(true);
      });
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (shouldNavigate) {
    return <Navigate to="/signup" />;
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
