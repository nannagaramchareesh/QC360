import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: frontend-only login
    login({
      name: "RMSI User",
      role: "Production",
      email,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-2xl bg-opacity-90 backdrop-blur-md rounded-2xl">
        
        {/* Logo / Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            RMSI TaskFlow
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Internal Workflow Management System
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 transition duration-300 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 transition duration-300 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition-all duration-300 bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-xs text-center text-gray-400">
          © RMSI Internal Use Only
        </p>

      </div>
    </div>
  );
};

export default Login;
