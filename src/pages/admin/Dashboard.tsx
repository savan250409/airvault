import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  // Example counters (dynamic data aap API se laa sakte ho)
  const stats = [
    { title: "Total Services", value: 12, color: "bg-blue-500" },
    { title: "Total Blogs", value: 34, color: "bg-[#E5A121]" },
    { title: "Case Studies", value: 7, color: "bg-green-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Welcome to Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl text-white shadow-lg ${item.color}`}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Extra content */}
      
    </div>
  );
};

export default Dashboard;
