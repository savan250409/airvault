import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URI from "@/config";

interface ExpertTalk {
  id: number;
  episode: string;
  title: string;
  speaker: string;
}

const ExpertTalksAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [talks, setTalks] = useState<ExpertTalk[]>([]);

  const toastStyle = {
    duration: 1000,
    position: "top-right" as const,
    style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
  };

  const fetchTalks = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/api/expert-talks`);
      if (!res.data.status) {
        toast.error(res.data.message || "Failed to load talks", toastStyle);
        return;
      }
      setTalks(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load talks", toastStyle);
    }
  };

  useEffect(() => {
    fetchTalks();
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).message) {
      toast.success((location.state as any).message, toastStyle);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this expert talk?")) return;
    try {
      const res = await axios.delete(`${BASE_URI}/api/expert-talks/${id}`);
      if (!res.data.status) {
        toast.error(res.data.message || "Delete failed", toastStyle);
        return;
      }
      setTalks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Expert Talk deleted successfully!", toastStyle);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed", toastStyle);
    }
  };

  return (
    <div className="p-6 relative">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Expert Talks</h1>
        <button
          onClick={() => navigate("/admin/expert-talks/add")}
          className="flex items-center gap-2 bg-[#E5A121] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Talk
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Episode</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Speaker</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {talks.length > 0 ? (
              talks.map((talk) => (
                <tr key={talk.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-emerald-700">{talk.episode}</td>
                  <td className="px-6 py-3 font-semibold max-w-xs truncate">{talk.title}</td>
                  <td className="px-6 py-3">{talk.speaker}</td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/expert-talks/edit/${talk.id}`)}
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(talk.id)}
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

export default ExpertTalksAdmin;
