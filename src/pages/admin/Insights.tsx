import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URI from "@/config";

interface Insight {
  id: number;
  title: string;
  excerpt: string;
}

const InsightsAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [insights, setInsights] = useState<Insight[]>([]);

  const toastStyle = {
    duration: 1000,
    position: "top-right" as const,
    style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
  };

  const fetchInsights = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/api/insights`);
      if (!res.data.status) {
        toast.error(res.data.message || "Failed to load insights", toastStyle);
        return;
      }
      setInsights(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load insights", toastStyle);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).message) {
      toast.success((location.state as any).message, toastStyle);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this insight?")) return;
    try {
      const res = await axios.delete(`${BASE_URI}/api/insights/${id}`);
      if (!res.data.status) {
        toast.error(res.data.message || "Delete failed", toastStyle);
        return;
      }
      setInsights((prev) => prev.filter((i) => i.id !== id));
      toast.success("Insight deleted successfully!", toastStyle);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed", toastStyle);
    }
  };

  return (
    <div className="p-6 relative">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Insights</h1>
        <button
          onClick={() => navigate("/admin/insights/add")}
          className="flex items-center gap-2 bg-[#E5A121] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Insight
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {insights.length > 0 ? (
              insights.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3 font-semibold">{item.title}</td>
                  <td className="px-6 py-3 text-gray-600 max-w-xs truncate">{item.excerpt}</td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/insights/edit/${item.id}`)}
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightsAdmin;
