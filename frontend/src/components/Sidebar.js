import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", to: "/" },
    { name: "My Tasks", to: "/tasks" },
    { name: "All Tasks", to: "/all-tasks" },
    { name: "Reports", to: "/reports" },
    { name: "Profile", to: "/profile" },
  ];

  return (
    <aside className="flex flex-col w-64 h-screen p-6 border-r border-gray-200 bg-gray-50">
      
      {/* Logo / Brand */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">TaskFlow</h1>
        <p className="mt-1 text-xs font-medium text-gray-400">Your Workflow Hub</p>
        <div className="h-1 mt-4 rounded-full shadow-sm w-14 bg-gradient-to-r from-blue-400 to-blue-200"></div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-2xl text-gray-700 font-medium text-sm
               transition-all duration-300 cursor-pointer
               ${isActive ? "bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg scale-105" : "bg-white shadow hover:shadow-lg hover:scale-105"}`
            }
          >
            {/* Floating circle icon with subtle inner shadow */}
            <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-700 rounded-full shadow-inner bg-gradient-to-tr from-blue-50 to-blue-100">
              {link.name.charAt(0)}
            </div>

            {/* Link name */}
            <span>{link.name}</span>

            {/* Right-side active pill */}
            <div
              className={({ isActive }) =>
                `ml-auto w-2 h-8 rounded-full bg-blue-400 shadow-lg transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`
              }
            ></div>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-2 mt-auto text-xs text-gray-400">
        <p>Logged in as <span className="font-medium text-gray-700">Admin</span></p>
        <button className="px-3 py-1 font-semibold text-red-600 transition-all duration-300 rounded-lg bg-red-50 hover:bg-red-100 hover:scale-105">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
