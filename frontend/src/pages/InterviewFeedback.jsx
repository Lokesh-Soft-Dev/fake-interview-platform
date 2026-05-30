import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function InterviewFeedback() {

    const navigate = useNavigate();

    const location = useLocation();

    const category =
        location.state?.category || "Interview";

    const confidence =
        location.state?.confidence || "Medium";

    const performance =
        location.state?.performance || "Good";

    const totalQuestions =
        location.state?.totalQuestions || 5;

    return (<div className="min-h-screen bg-[#030712] text-white">

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-20">

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 md:p-16 text-center">

                <p className="text-cyan-400 uppercase tracking-widest font-semibold mb-4">

                    Interview Completed

                </p>

                <h1 className="text-5xl md:text-7xl font-black mb-8">

                    AI Feedback 🤖

                </h1>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left mb-10">

                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">

                        {category} Round Feedback

                    </h2>

                    <div className="space-y-4 mb-8">

                        <p className="text-xl">

                            Questions Answered:
                            <span className="text-cyan-400 font-bold">
                                {" "}
                                {totalQuestions}/{totalQuestions}
                            </span>

                        </p>

                        <p className="text-xl">

                            Confidence Level:
                            <span className="text-green-400 font-bold">
                                {" "}
                                {confidence}
                            </span>

                        </p>

                        <p className="text-xl">

                            Performance:
                            <span className="text-violet-400 font-bold">
                                {" "}
                                {performance}
                            </span>

                        </p>

                    </div>

                    <p className="text-gray-300 leading-relaxed">

                        Great effort completing the interview session.

                        You successfully answered all questions and
                        demonstrated consistency throughout the round.

                        Continue practicing communication, problem-solving,
                        and technical concepts to further improve your
                        interview confidence.

                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition-all font-bold text-lg"
                >

                    Back To Dashboard

                </button>

            </div>

        </div>

    </div>

    );
}

export default InterviewFeedback;
