import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Results() {

const navigate = useNavigate();

const location = useLocation();

const score = location.state?.score || 0;

const total = location.state?.total || 0;

const percentage = total > 0
? Math.round((score / total) * 100)
: 0;

// PERFORMANCE MESSAGE

let message = "";

if (percentage >= 80) {


message = "Excellent Performance 🚀";


} else if (percentage >= 50) {


message = "Good Job 👍";


} else {


message = "Keep Practicing 💪";


}

// AI FEEDBACK

let feedback = "";

if (percentage >= 80) {

feedback =
  "Excellent interview performance. You have strong fundamentals and good problem-solving skills. Keep practicing advanced concepts and continue building projects.";
} else if (percentage >= 50) {


feedback =
  "Good effort. You have a solid foundation but should spend more time practicing interview questions and strengthening technical concepts.";
} else {


feedback =
  "You need more practice. Focus on fundamentals, review important concepts, and attempt more mock interviews to improve confidence.";
}

return ( <div className="min-h-screen bg-[#030712] text-white overflow-hidden">


  <Navbar />

  {/* BACKGROUND */}

  <div className="absolute top-32 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl">
  </div>

  <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl">
  </div>

  {/* MAIN */}

  <div className="relative max-w-4xl mx-auto px-6 py-20">

    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 md:p-16 shadow-2xl text-center">

      <p className="text-cyan-400 uppercase tracking-widest font-semibold mb-4">

        Interview Completed

      </p>

      <h1 className="text-5xl md:text-7xl font-black mb-8">

        Your Results

      </h1>

      {/* SCORE */}

      <div className="w-52 h-52 mx-auto rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 p-[4px] shadow-2xl shadow-cyan-500/20 mb-10">

        <div className="w-full h-full rounded-full bg-[#0f172a] flex flex-col items-center justify-center">

          <p className="text-6xl font-black">

            {percentage}%

          </p>

          <p className="text-gray-400 mt-2">

            Score

          </p>

        </div>

      </div>

      {/* PERFORMANCE MESSAGE */}

      <h2 className="text-3xl font-bold mb-4">

        {message}

      </h2>

      <p className="text-gray-400 text-lg mb-8">

        You scored {score} out of {total}
        questions correctly.

      </p>

      {/* AI FEEDBACK */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 text-left">

        <h3 className="text-cyan-400 text-2xl font-bold mb-4">

          AI Feedback 🤖

        </h3>

        <p className="text-gray-300 leading-relaxed">

          {feedback}

        </p>

      </div>

      {/* BUTTONS */}

      <div className="flex flex-col md:flex-row gap-5 justify-center">

        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition-all font-bold text-lg"
        >

          Back to Dashboard

        </button>

        <button
          onClick={() => navigate("/mcq")}
          className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-lg"
        >

          Retry Interview

        </button>

      </div>

    </div>

  </div>

</div>

);
}

export default Results;
