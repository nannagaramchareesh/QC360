import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-6 bg-white border-b border-gray-200 h-14">
      <span className="text-sm font-semibold text-gray-800">
        RMSI TaskFlow
      </span>

      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>

          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
