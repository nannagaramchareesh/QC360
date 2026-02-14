import React, { useEffect, useState } from "react";
import AdminContext from "./AdminContext";
import { useNavigate } from "react-router-dom";

const AdminStates = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);


  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };


  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminStates;
