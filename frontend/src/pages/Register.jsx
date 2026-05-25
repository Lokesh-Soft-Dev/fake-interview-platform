import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
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

      await axios.post(
        "https://fake-interview-platform.onrender.com/api/users/register/",
        formData
      );

      toast.success(
        "Registration Successful 🚀",
        {
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #06b6d4",
          },
        }
      );

      setTimeout(() => {

        toast(
          "Now login with your username & password to start interview 🚀",
          {
            duration: 5000,
            icon: "🎯",
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #22d3ee",
            },
          }
        );

        navigate("/");

      }, 1500);

    } catch (error) {

      toast.error(
        "Registration Failed 🚀",
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

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-cyan-950 flex items-center justify-center px-6">

      <div className="absolute inset-0 opacity-20">

        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>

      </div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-3">

          Create Account

        </h1>

        <p className="text-gray-300 text-center mb-8">

          Start your interview journey 🚀

        </p>

        <form
          onSubmit={handleRegister}
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
              !formData.email.trim() ||
              !formData.password.trim()
            }
            className={`w-full p-4 rounded-xl text-white font-semibold transition-all ${
              loading ||
              !formData.username.trim() ||
              !formData.email.trim() ||
              !formData.password.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700"
            }`}
          >

            {loading ? "Creating Account..." : "Register"}

          </button>

          <p className="text-center text-gray-300">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-cyan-400 hover:text-cyan-300"
            >

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;
