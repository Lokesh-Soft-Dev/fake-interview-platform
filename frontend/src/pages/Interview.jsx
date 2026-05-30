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

  const [timeLeft, setTimeLeft] = useState(180);

  const [answer, setAnswer] = useState("");

  const [totalAnswerLength, setTotalAnswerLength] = useState(0);

  const [questions, setQuestions] = useState([]);

  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [displayedQuestion, setDisplayedQuestion] = useState("");

  const [questionReady, setQuestionReady] = useState(false);

  // FETCH QUESTIONS

  const fetchQuestions = async () => {

    setLoadingQuestions(true);

    try {

      const response = await axios.get(
        `https://fake-interview-platform.onrender.com/api/questions/?category=${category}`
      );

      console.log("QUESTIONS:", response.data);

      if (response.data.length > 0) {

        setQuestions(response.data);

        setLoadingQuestions(false);

        setQuestionReady(true);

      } else {

        toast.error("No Questions Found");
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to load questions");

      setLoadingQuestions(false);
    }
  };

  // LOAD QUESTIONS

  useEffect(() => {

    window.scrollTo(0, 0);

    fetchQuestions();

  }, [category]);


  // TYPING ANIMATION

  useEffect(() => {

    if (!questions[currentQuestion]?.question) return;

    const fullQuestion =
      questions[currentQuestion].question;

    setDisplayedQuestion("");

    let index = 0;

    const typingInterval = setInterval(() => {

      setDisplayedQuestion(
        fullQuestion.slice(0, index + 1)
      );

      index++;

      if (index >= fullQuestion.length) {

        clearInterval(typingInterval);

      }

    }, 40);

    return () => clearInterval(typingInterval);

  }, [currentQuestion, questions]);

  // TIMER

  useEffect(() => {

    if (!questionReady) return;

    if (timeLeft === 0) {

      toast.error("Time Up ⏳");

      handleNext();

      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, questionReady]);

  // NEXT QUESTION

  const handleNext = async () => {

    if (!answer.trim()) {

      toast.error("Please type your answer");

      return;
    }

    setTotalAnswerLength(
      (prev) => prev + answer.length
    );

    try {

      await axios.post(
        "https://fake-interview-platform.onrender.com/api/save-answer/",
        {
          username: localStorage.getItem("username"),

          question:
            questions[currentQuestion]?.question,

          answer: answer,
        }
      );

    } catch (error) {

      console.log(error);

      toast.error("Failed to save answer");
    }

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion((prev) => prev + 1);

      setTimeLeft(120);

      setAnswer("");

      window.scrollTo({
        top: 120,
        behavior: "smooth",
      });

    } else {

      const averageLength =
        (totalAnswerLength + answer.length) /
        questions.length;

      let confidence = "Low";

      let performance = "Needs Improvement";

      if (averageLength > 150) {

        confidence = "High";

        performance = "Excellent";

      } else if (averageLength > 80) {

        confidence = "Medium";

        performance = "Good";
      }

      navigate("/feedback", {
        state: {
          category,
          confidence,
          performance,
          totalQuestions: questions.length,
        },
      });
    }
  };

  // PREVIOUS QUESTION

  const handlePrevious = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion((prev) => prev - 1);

      setTimeLeft(120);

      window.scrollTo({
        top: 120,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {

    window.scrollTo({
      top: 120,
      behavior: "smooth",
    });

  }, [currentQuestion]);

  if (loadingQuestions) {

    return (

      <div className="min-h-screen bg-[#030712] text-white">

        <Navbar />

        <div className="flex items-center justify-center min-h-[80vh] px-6">

          <div className="text-center">

            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-8">
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4">

              🤖 AI Interviewer

            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">

              Preparing Interview...

            </h2>

            <p className="text-gray-400 text-lg">

              AI Interviewer is generating questions...

            </p>

            <p className="text-gray-500 mt-3">

              Please wait a few seconds 🚀

            </p>

          </div>

        </div>

      </div>

    );
  }
  return (

    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

      <Navbar />

      {/* BACKGROUND GLOW */}

      <div className="absolute top-32 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

      {/* MAIN */}

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <p className="text-cyan-400 uppercase tracking-widest mb-3 font-semibold">

              {category} Round

            </p>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">

              AI Interview Session

            </h1>

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
                width:
                  questions.length > 0
                    ? `${((currentQuestion + 1) / questions.length) * 100}%`
                    : "0%",
              }}
            ></div>

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[24px] md:rounded-[32px] p-5 md:p-10 shadow-2xl">

          {/* QUESTION */}

          <div className="mb-8">

          <div className="flex justify-between items-center mb-6">

            <p className="text-cyan-400 font-semibold uppercase tracking-wider">

              Interview Question

            </p>

            <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center font-bold text-lg">

              {timeLeft}

            </div>

          </div>

            <h2 className="text-2xl md:text-4xl leading-relaxed font-bold">

              {displayedQuestion}

            </h2>

          </div>

          {/* ANSWER BOX */}

          <textarea
            rows="4"
            placeholder="Write your professional answer here..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg text-white outline-none resize-none focus:border-cyan-400 transition-all"
          />

          {/* BUTTONS */}

          <div className="grid grid-cols-2 gap-3 mt-8">

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
              className="col-span-2 px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition-all font-bold text-lg"
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
