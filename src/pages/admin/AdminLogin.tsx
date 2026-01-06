import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BASE_URI from "@/config";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) navigate("/admin/dashboard", { replace: true });
    else setIsCheckingLogin(false);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URI}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // ✅ Store login response
      localStorage.setItem("adminToken", data.admin.token);
      localStorage.setItem("adminName", data.admin.name);
      localStorage.setItem("adminEmail", data.admin.email);
      localStorage.setItem("isAdminLoggedIn", "true");

      toast.success("Login successful!");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingLogin) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center"
      >
        {/* Logo */}
        <div className="bg-[#0B41E3] p-2 rounded mb-6 mx-auto w-[200px] h-[80px] flex items-center justify-center">
          <img
            src="/public/logo.webp"
            alt="Logo"
            className="w-[200px] h-[200px] object-contain"
          />
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-3 py-2 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
