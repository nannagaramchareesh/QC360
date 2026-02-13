import React, { useEffect, useState } from "react";
import AdminContext from "./AdminContext";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";

const AdminStates = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
       setIsAuthenticated(true);
       navigate('/')
    }
  },[])
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }
  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminStates;
