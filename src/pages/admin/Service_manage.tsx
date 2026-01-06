import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI from "@/config";

interface ServiceFormData {
  title: string;
  description: string;
  features: string; // comma-separated string
  details: string;
  icon: File | null;
  image: File | null;
}

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    features: "",
    details: "",
    icon: null,
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const toastStyle = {
    duration: 2000,
    position: "top-right" as const,
    style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
  };

  // Fetch existing service in edit mode
  useEffect(() => {
  const fetchService = async () => {
    if (id) {
      try {
        const res = await fetch(`${BASE_URI}/api/services/${id}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();

        // Features ko proper string me convert karna
        let featuresStr = "";
        if (data.features) {
          try {
            const parsed = JSON.parse(data.features);
            if (Array.isArray(parsed)) {
              featuresStr = parsed.join(", ");
            } else {
              featuresStr = String(parsed);
            }
          } catch {
            featuresStr = data.features;
          }
        }

        setFormData({
          title: data.title || "",
          description: data.description || "",
          features: featuresStr,
          details: data.details || "",
          icon: null,
          image: null,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service data", toastStyle);
      }
    }
  };
  fetchService();
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);

      const featuresArray = formData.features.split(",").map((f) => f.trim());
      form.append("features", formData.features);

      // form.append("features", JSON.stringify(featuresArray));

      form.append("details", formData.details);
      if (formData.icon) form.append("icon", formData.icon);
      if (formData.image) form.append("image", formData.image);

      const url = id ? `${BASE_URI}/api/services/${id}` : `${BASE_URI}/api/services`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, { method, body: form });
      if (!res.ok) throw new Error("Failed to save service");

      toast.success(id ? "Service updated successfully!" : "Service added successfully!", toastStyle);
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/services");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Service" : "Add New Service"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border rounded px-3 py-2"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Features (comma separated)</label>
          <input
            type="text"
            name="features"
            className="w-full border rounded px-3 py-2"
            value={formData.features}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Details</label>
          <textarea
            name="details"
            className="w-full border rounded px-3 py-2"
            value={formData.details}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Icon</label>
          <input type="file" name="icon" onChange={handleFileChange} accept="image/*" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${
              id ? "bg-blue-600 hover:bg-blue-700" : "bg-[#E5A121] hover:bg-yellow-600"
            }`}
          >
            {loading ? "Please wait..." : id ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
