import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../store/auth.jsx";

export default function Logout() {
  const { logout, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return (
    <>
      <Navigate to="/" />
    </>
  );
}
