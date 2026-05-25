import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.password.trim()
    ) {

      toast.error(
        "Please fill all fields 🚀",
        {
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #06b6d4",
          },
        }
      );

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://fake-interview-platform.onrender.com/api/users/login/",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access
      );

      localStorage.setItem(
        "username",
        formData.username
      );

      toast.success(
        "Login Successful 🚀",
        {
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #06b6d4",
          },
        }
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.error ||
        "Login Failed 🚀",
        {
          duration: 4000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #06b6d4",
          },
        }
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 flex items-center justify-center px-6">

      <div className="absolute inset-0 opacity-20">

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>

      </div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-3">

          Fake Interview AI

        </h1>

        <p className="text-gray-300 text-center mb-8">

          Practice interviews like a professional 🚀

        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button
            type="submit"
            disabled={
              loading ||
              !formData.username.trim() ||
              !formData.password.trim()
            }
            className={`w-full p-4 rounded-xl text-white font-semibold transition-all ${
              loading ||
              !formData.username.trim() ||
              !formData.password.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading ? "Logging in..." : "Login"}

          </button>

          <p className="text-center text-gray-300">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300"
            >

              Register

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
