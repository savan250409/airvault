import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI from "@/config"; // <-- Yahan aapke config file ka URI

interface Service {
  id: number;
  title: string;
  description: string;
}


const ServicesList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [services, setServices] = useState<Service[]>([]); // empty initially
  const [loading, setLoading] = useState<boolean>(true);

  const toastStyle = {
    duration: 2000,
    position: "top-right" as const,
    style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
  };

  useEffect(() => {
    // show toast if redirected with message
    if (location.state && (location.state as any).message) {
      toast.success((location.state as any).message, toastStyle);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BASE_URI}/api/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err: any) {
        console.error(err);
        toast.error("Error fetching services", toastStyle);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`${BASE_URI}/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");

      setServices(services.filter((s) => s.id !== id));
      toast.success("Service deleted successfully!", toastStyle);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!", toastStyle);
    }
  };
  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6 relative">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Services</h1>
        <button
          onClick={() => navigate("/admin/services/add")}
          className="flex items-center gap-2 bg-[#E5A121] hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Service
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
            {services.map((service) => (
              <tr key={service.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{service.id}</td>
                <td className="px-6 py-3 font-semibold">{service.title}</td>
                <td className="px-6 py-3 text-gray-600">{service.description}</td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                 <button
                    onClick={() => handleDelete(service.id)}
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

export default ServicesList;
