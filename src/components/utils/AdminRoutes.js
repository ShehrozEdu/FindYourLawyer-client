import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const AdminRoutes = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Admin privileges required to access this page",
      }).then(() => {
        setShouldNavigate(true);
      });
    }
  }, [isAuthenticated, isAdmin, loading]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (shouldNavigate) {
    return <Navigate to="/" />;
  }

  return isAuthenticated && isAdmin ? <Outlet /> : null;
};

export default AdminRoutes;

