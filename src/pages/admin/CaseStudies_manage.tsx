import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
}

const CaseStudiesManage = () => {
  const { id } = useParams(); // edit id
  const navigate = useNavigate();

  const [cases] = useState<CaseStudy[]>([
    { id: 1, title: "E-commerce Optimization", description: "Increase sales and conversions" },
    { id: 2, title: "Mobile App Launch", description: "Successful launch strategy" },
    { id: 3, title: "Website Redesign", description: "Improved UX & UI design" },
  ]);

  const [formData, setFormData] = useState<CaseStudy>({ id: 0, title: "", description: "" });

  useEffect(() => {
    if (id) {
      const c = cases.find((cs) => cs.id === Number(id));
      if (c) setFormData(c);
    }
  }, [id, cases]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      console.log("Updated Case Study:", formData);
      navigate("/admin/case-studies", { state: { message: "Case study updated successfully!" } });
    } else {
      console.log("New Case Study:", formData);
      navigate("/admin/case-studies", { state: { message: "Case study added successfully!" } });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Case Study" : "Add New Case Study"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-2 rounded-lg text-white ${
            id ? "bg-blue-600 hover:bg-blue-700" : "bg-[#E5A121] hover:bg-yellow-600"
          }`}
        >
          {id ? "Update Case Study" : "Add Case Study"}
        </button>
      </form>
    </div>
  );
};

export default CaseStudiesManage;
