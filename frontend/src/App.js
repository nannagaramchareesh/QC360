import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyTasks from './components/MyTasks'
import TaskDetails from './components/TaskDetails'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Reports from './components/Reports'
import Profile from './components/Profile'
import Sidebar from './components/Sidebar'

import AuthContext from './context/AuthContext'

export const backendUrl = process.env.REACT_APP_BACKEND_URL

export default function App() {
  const { isAuthenticated } = useContext(AuthContext)

  console.log(backendUrl)

  return (
    <Router>


      <div className="min-h-screen bg-gray-100">

        {isAuthenticated ? (
          <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<MyTasks />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />

                {/* <Route path="/reports" element={<Reports />} /> */}
                {/* <Route path="/profile" element={<Profile />} /> */}
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}

      </div>

      {/* {isAuthenticated && <Footer />} */}

    </Router>
  )
}
