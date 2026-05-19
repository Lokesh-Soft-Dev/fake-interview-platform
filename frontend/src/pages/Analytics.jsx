import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Analytics() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "https://fake-interview-platform.onrender.com"
      );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Answers",
      value: stats.total_answers,
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "High Confidence",
      value: stats.high_confidence,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Medium Confidence",
      value: stats.medium_confidence,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Low Confidence",
      value: stats.low_confidence,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-12">
          Analytics Dashboard 📊
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((item, index) => (

            <div
              key={index}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            >

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} mb-6`}>
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-5xl font-bold">
                {item.value || 0}
              </p>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Analytics;