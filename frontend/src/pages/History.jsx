import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function History() {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {

    fetchAnswers();

  }, []);

  const fetchAnswers = async () => {

    try {

      const response = await axios.get(
        "https://fake-interview-platform.onrender.com"
      );

      setAnswers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">
          Interview History 📜
        </h1>

        <div className="space-y-8">

          {answers.map((item, index) => (

            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >

              <h2 className="text-cyan-400 text-xl mb-4">
                Question
              </h2>

              <p className="text-2xl mb-8">
                {item.question}
              </p>

              <h2 className="text-green-400 text-xl mb-4">
                Your Answer
              </h2>

              <p className="text-gray-300">
                {item.answer}
              </p>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default History;