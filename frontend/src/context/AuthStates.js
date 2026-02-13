import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";

const AuthStates = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* =========================================
     🔄 Check token on page refresh
  ========================================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, []);

  /* =========================================
     🔐 Login Function
  ========================================= */

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  /* =========================================
     🚪 Logout Function
  ========================================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStates;
