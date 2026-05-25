import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Analytics() {

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "https://fake-interview-platform.onrender.com/api/analytics/"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Answers",
      value: stats.total_answers || 0,
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "High Confidence",
      value: stats.high_confidence || 0,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Medium Confidence",
      value: stats.medium_confidence || 0,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Low Confidence",
      value: stats.low_confidence || 0,
      color: "from-red-500 to-pink-500",
    },
  ];

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-2xl font-bold">

            Loading Analytics...

          </h1>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-10">

        <h1 className="text-4xl md:text-5xl font-bold mb-12">

          Analytics Dashboard 📊

        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((item, index) => (

            <div
              key={index}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300"
            >

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} mb-6`}>
              </div>

              <h2 className="text-2xl font-bold mb-3">

                {item.title}

              </h2>

              <p className="text-5xl font-black">

                {item.value}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Analytics;
