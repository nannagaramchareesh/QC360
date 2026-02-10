import React, { useState } from "react";
import AdminContext from "./AdminContext";

const AdminStates = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminStates;
