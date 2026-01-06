import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
}

const CaseStudies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases] = useState<CaseStudy[]>([
    { id: 1, title: "E-commerce Optimization", description: "Increase sales and conversions" },
    { id: 2, title: "Mobile App Launch", description: "Successful launch strategy" },
    { id: 3, title: "Website Redesign", description: "Improved UX & UI design" },
  ]);

  const toastStyle = {
    duration: 1000,
    position: "top-right" as const,
    style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
  };

  // Add/Update success message
  useEffect(() => {
    if (location.state && (location.state as any).message) {
      toast.success((location.state as any).message, toastStyle);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleDelete = (id: number) => {
    setCases(cases.filter((c) => c.id !== id));
    toast.success("Case study deleted successfully!", toastStyle);
  };

  return (
    <div className="p-6 relative">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Case Studies</h1>
        <button
          onClick={() => navigate("/admin/case-studies/add")}
          className="flex items-center gap-2 bg-[#E5A121] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Case Study
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
            {cases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{c.id}</td>
                <td className="px-6 py-3 font-semibold">{c.title}</td>
                <td className="px-6 py-3 text-gray-600">{c.description}</td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/case-studies/edit/${c.id}`)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseStudies;
