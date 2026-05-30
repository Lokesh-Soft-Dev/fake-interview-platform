import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/dashboard"
          className="flex items-center gap-4 group"
        >

          <div className="relative">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-blue-500 shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition-all duration-500">
            </div>

            <div className="absolute inset-0 rounded-2xl bg-cyan-400 blur-xl opacity-40 group-hover:opacity-70 transition-all">
            </div>

          </div>

          <div>

            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">

              Fake Interview AI

            </h1>

            <p className="text-xs text-gray-400 tracking-wider">

              NEXT GEN INTERVIEW PLATFORM

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8">

          {!token ? (

            <>
              <Link
                to="/"
                className="relative text-gray-300 hover:text-white transition group"
              >

                Login

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full">
                </span>

              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold shadow-2xl shadow-cyan-500/20"
              >

                Register

              </Link>
            </>

          ) : (

            <>
              <Link
                to="/dashboard"
                className="relative text-gray-300 hover:text-white transition group"
              >

                Dashboard

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full">
                </span>

              </Link>

              <Link
                to="/history"
                className="relative text-gray-300 hover:text-white transition group"
              >

                History

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full">
                </span>

              </Link>

              <Link
                to="/analytics"
                className="relative text-gray-300 hover:text-white transition group"
              >

                Analytics

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full">
                </span>

              </Link>

              <Link
                to="/profile"
                className="relative text-gray-300 hover:text-white transition group"
              >

                Profile

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full">
                </span>

              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg"
              >

                Logout

              </button>
            </>

          )}

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >

          <span className="w-6 h-[2px] bg-white rounded-full">
          </span>

          <span className="w-6 h-[2px] bg-white rounded-full">
          </span>

          <span className="w-6 h-[2px] bg-white rounded-full">
          </span>

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl px-6 py-6">

          <div className="flex flex-col gap-5">

            {!token ? (

              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 rounded-2xl text-white text-center font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>

            ) : (

              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to="/history"
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  History
                </Link>

                <Link
                  to="/analytics"
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Analytics
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl text-white font-semibold"
                >
                  Logout
                </button>
              </>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;