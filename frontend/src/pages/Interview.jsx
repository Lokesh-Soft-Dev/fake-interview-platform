import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import axios from "axios";

function Interview() {

  const navigate = useNavigate();

  const { category } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [timeLeft, setTimeLeft] = useState(120);

  const [answer, setAnswer] = useState("");

  const [questions, setQuestions] = useState([]);

  // FETCH QUESTIONS
  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        `https://fake-interview-platform.onrender.com`
      );

      setQuestions(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // LOAD QUESTIONS
  useEffect(() => {

    fetchQuestions();

  }, []);

  // TIMER
  useEffect(() => {

    if (timeLeft === 0) {

      alert("Time Up ⏳");

      handleNext();

      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft(timeLeft - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft]);

  // NEXT QUESTION
  const handleNext = async () => {

    if (!answer.trim()) {

      toast.error("Please type your answer");

      return;
    }

    try {

      await axios.post(
        "https://fake-interview-platform.onrender.com",
        {
          username: localStorage.getItem("username"),

          question:
            questions[currentQuestion]?.question,

          answer: answer,

        }
      );

    } catch (error) {

      console.log(error);
    }

    if (
      currentQuestion < questions.length - 1
    ) {

      setCurrentQuestion(currentQuestion + 1);

      setTimeLeft(120);

      setAnswer("");

    } else {

      toast.success("Interview Completed 🚀");

      navigate("/dashboard");
    }
  };

  // PREVIOUS QUESTION
  const handlePrevious = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion(currentQuestion - 1);

      setTimeLeft(120);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

      <Navbar />

      {/* BACKGROUND GLOW */}

      <div className="absolute top-32 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl">
      </div>

      {/* MAIN */}

      <div className="relative max-w-5xl mx-auto px-6 py-12">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-cyan-400 uppercase tracking-widest mb-3 font-semibold">

              {category} Round

            </p>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">

              AI Interview Session

            </h1>

          </div>

          {/* TIMER */}

          <div className="relative">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 p-[3px] shadow-2xl shadow-cyan-500/30">

              <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-3xl font-black">

                {timeLeft}

              </div>

            </div>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mb-12">

          <div className="flex justify-between mb-3 text-sm text-gray-400">

            <p>
              Question {currentQuestion + 1}
            </p>

            <p>
              {questions.length} Total
            </p>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${questions.length > 0
                  ? ((currentQuestion + 1) /
                    questions.length) *
                  100
                  : 0
                }%`
              }}
            >
            </div>

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-2xl">

          {/* QUESTION */}

          <div className="mb-10">

            <p className="text-cyan-400 font-semibold mb-5 uppercase tracking-wider">

              Interview Question

            </p>

            <h2 className="text-2xl md:text-4xl leading-relaxed font-bold">

              {
                questions[currentQuestion]?.question
              }

            </h2>

          </div>

          {/* ANSWER BOX */}

          <textarea
            rows="8"
            placeholder="Write your professional answer here..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-3xl p-6 text-lg text-white outline-none resize-none focus:border-cyan-400 transition-all"
          />

          {/* BUTTONS */}

          <div className="flex flex-col md:flex-row gap-5 mt-12">

            <button
              onClick={handlePrevious}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-lg"
            >

              Previous

            </button>

            <button
              onClick={handleNext}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition-all font-bold text-lg shadow-2xl shadow-cyan-500/20"
            >

              Next Question

            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition-all font-bold text-lg"
            >

              Exit Interview

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interview;