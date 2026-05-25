import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function History() {

  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnswers();

  }, []);

  const fetchAnswers = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "https://fake-interview-platform.onrender.com/api/answers/"
      );

      const username =
        localStorage.getItem("username");

      // FILTER ONLY CURRENT USER

      const filteredAnswers =
        response.data.filter(
          (item) =>
            item.user_details?.username === username
        );

      setAnswers(filteredAnswers);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-2xl font-bold">

            Loading History...

          </h1>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 md:p-10">

        <h1 className="text-4xl md:text-5xl font-bold mb-10">

          Interview History 📜

        </h1>

        {/* EMPTY STATE */}

        {answers.length === 0 ? (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">

              No Interview History

            </h2>

            <p className="text-gray-400">

              Start an interview to save your answers 🚀

            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {answers.map((item, index) => (

              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
              >

                <h2 className="text-cyan-400 text-xl mb-4 font-semibold">

                  Question

                </h2>

                <p className="text-2xl mb-8 leading-relaxed">

                  {item.question}

                </p>

                <h2 className="text-green-400 text-xl mb-4 font-semibold">

                  Your Answer

                </h2>

                <p className="text-gray-300 leading-relaxed">

                  {item.answer}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default History;