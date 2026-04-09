import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URI from "@/config";


const Dashboard = () => {
  const navigate = useNavigate();

  const [internshipCount, setInternshipCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // ✅ new state


  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  // ✅ Fetch Internship Count
  useEffect(() => {
    fetchInternshipCount();
    fetchTotalQuestions();
  }, []);

  const fetchInternshipCount = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/api/internship`);
      setInternshipCount(res.data.count); // 👈 yaha se count le rahe hai
    } catch (error) {
      console.error("Error fetching internship count:", error);
    }
  };
  const fetchTotalQuestions = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/api/get-question-limit`);
      setTotalQuestions(res.data.total_questions || 0);
    } catch (error) {
      console.error("Error fetching question count:", error);
    }
  };

  // ✅ Stats with dynamic internship count
  const stats = [
    {
      title: "Internship Users",
      value: internshipCount, // 👈 dynamic value
      color: "bg-blue-900",
    },
    {
      title: "Total Questions", // ✅ new card
      value: totalQuestions,
      color: "bg-yellow-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Welcome to Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

    </div>
  );
};

export default Dashboard;