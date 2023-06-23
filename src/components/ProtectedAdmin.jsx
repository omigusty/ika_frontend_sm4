import React, { useEffect } from "react";
import AddBook from "./AddBook";
import { useNavigate } from "react-router-dom";

export default function ProtectedAdmin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="container">
        <AddBook />
      </div>
    </>
  );
}
