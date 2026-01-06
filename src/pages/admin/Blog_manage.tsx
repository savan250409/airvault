import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  description: string;
}

const BlogManage = () => {
  const { id } = useParams(); // edit id
  const navigate = useNavigate();

  const [blogs] = useState<Blog[]>([
    { id: 1, title: "React Tips", description: "Best practices for React development" },
    { id: 2, title: "Tailwind CSS Guide", description: "Build responsive UI with Tailwind" },
    { id: 3, title: "TypeScript Basics", description: "Understanding TypeScript" },
  ]);

  const [formData, setFormData] = useState<Blog>({ id: 0, title: "", description: "" });

  useEffect(() => {
    if (id) {
      const blog = blogs.find((b) => b.id === Number(id));
      if (blog) setFormData(blog);
    }
  }, [id, blogs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      console.log("Updated Blog:", formData);
      navigate("/admin/blog", { state: { message: "Blog updated successfully!" } });
    } else {
      console.log("New Blog:", formData);
      navigate("/admin/blog", { state: { message: "Blog added successfully!" } });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Blog" : "Add New Blog"}</h1>
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
          {id ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogManage;
