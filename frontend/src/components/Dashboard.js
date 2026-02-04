import { FaTasks, FaHourglassHalf, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "In QC",
      value: 6,
      icon: <FaHourglassHalf />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
    },
    {
      title: "My Tasks",
      value: 12,
      icon: <FaTasks />,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    {
      title: "Overdue",
      value: 2,
      icon: <FaExclamationCircle />,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
    },
    {
      title: "Delivered",
      value: 20,
      icon: <FaCheckCircle />,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your workload</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-5 rounded-xl border ${stat.border} ${stat.bg} shadow-md hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-white shadow ${stat.text} text-lg`}>
                {stat.icon}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Summary */}
      <div className="p-6 bg-white border shadow-md rounded-xl">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">
          Task Summary
        </h2>
        <p className="leading-relaxed text-gray-600">
          You currently have{" "}
          <span className="font-semibold text-blue-700">{stats[0].value}</span> tasks assigned,{" "}
          <span className="font-semibold text-yellow-700">{stats[1].value}</span> in QC, and{" "}
          <span className="font-semibold text-red-700">{stats[2].value}</span> overdue.
          Keep tracking your work to ensure timely and smooth delivery.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
