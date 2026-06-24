import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URI from "@/config";
import { toImageUrl } from "@/lib/contentMedia";

interface ExpertTalk {
  episode: string;
  title: string;
  speaker: string;
  designation: string;
  description: string;
  content: string;
}

const ExpertTalksManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ExpertTalk>({
    episode: "", title: "", speaker: "", designation: "", description: "", content: "",
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/expert-talks/${id}`);
        if (res.data.status && res.data.data) {
          const d = res.data.data;
          setFormData({
            episode: d.episode || "",
            title: d.title || "",
            speaker: d.speaker || "",
            designation: d.designation || "",
            description: d.description || "",
            content: d.content || "",
          });
          let imgs: string[] = [];
          try { imgs = JSON.parse(d.images || "[]"); } catch { imgs = []; }
          setExistingImages(Array.isArray(imgs) ? imgs : []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load talk");
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("episode", formData.episode);
      fd.append("title", formData.title);
      fd.append("speaker", formData.speaker);
      fd.append("designation", formData.designation);
      fd.append("description", formData.description);
      fd.append("content", formData.content);
      fd.append("existing_images", JSON.stringify(existingImages));
      newImages.forEach((f) => fd.append("images[]", f));

      const url = id ? `${BASE_URI}/api/expert-talks/${id}` : `${BASE_URI}/api/expert-talks`;
      const res = await axios.post(url, fd);

      if (!res.data.status) {
        toast.error(res.data.message || "Save failed");
        setSaving(false);
        return;
      }
      const msg = id ? "Expert Talk updated successfully!" : "Expert Talk added successfully!";
      navigate("/admin/expert-talks", { state: { message: msg } });
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Expert Talk" : "Add New Expert Talk"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Episode No.</label>
          <input type="text" placeholder="EP 01" className="w-full border rounded px-3 py-2" value={formData.episode} onChange={(e) => setFormData({ ...formData, episode: e.target.value })} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Speaker Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={formData.speaker} onChange={(e) => setFormData({ ...formData, speaker: e.target.value })} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Designation</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description (short summary)</label>
          <textarea className="w-full border rounded px-3 py-2" rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Full Content / Transcript</label>
          <textarea className="w-full border rounded px-3 py-2" rows={8} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
        </div>

        {/* Images (multiple) */}
        <div>
          <label className="block font-semibold mb-1">Images (you can select more than one — they auto-scroll on the website)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewImages((prev) => [...prev, ...Array.from(e.target.files || [])])}
          />

          {(existingImages.length > 0 || newImages.length > 0) && (
            <div className="flex flex-wrap gap-3 mt-3">
              {existingImages.map((src, i) => (
                <div key={`ex-${i}`} className="relative w-24 h-24 rounded overflow-hidden border">
                  <img src={toImageUrl(src)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setExistingImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {newImages.map((file, i) => (
                <div key={`new-${i}`} className="relative w-24 h-24 rounded overflow-hidden border">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[10px] text-center">new</span>
                  <button
                    type="button"
                    onClick={() => setNewImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`px-6 py-2 rounded-lg text-white disabled:opacity-60 ${id ? "bg-blue-600 hover:bg-blue-700" : "bg-[#E5A121] hover:bg-yellow-600"}`}
        >
          {saving ? "Saving..." : id ? "Update Talk" : "Add Talk"}
        </button>
      </form>
    </div>
  );
};

export default ExpertTalksManage;
