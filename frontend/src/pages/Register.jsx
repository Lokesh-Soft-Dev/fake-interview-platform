import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://fake-interview-platform.onrender.com",
        formData
      );

      toast.success("Registration Successful 🚀");

      navigate("/");
    } catch (error) {
      toast.error("Registration Failed");
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

        <div className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button
            onClick={handleRegister}
            className="w-full p-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition-all text-white font-semibold"
          >
            Register
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

        </div>
      </div>
    </div>
  );
}

export default Register;