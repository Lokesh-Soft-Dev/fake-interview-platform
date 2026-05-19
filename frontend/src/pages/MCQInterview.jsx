import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function MCQInterview() {

    const navigate = useNavigate();

    const questions = [

        {
            question: "What is React?",

            options: [
                "Database",
                "JavaScript Library",
                "Backend Framework",
                "Operating System"
            ],

            answer: "JavaScript Library",
        },

        {
            question: "What is JWT?",

            options: [
                "Database",
                "Authentication Token",
                "CSS Framework",
                "Compiler"
            ],

            answer: "Authentication Token",
        },

        {
            question: "Which hook manages state in React?",

            options: [
                "useFetch",
                "useAPI",
                "useState",
                "useData"
            ],

            answer: "useState",
        },

        {
            question: "Which database is SQL?",

            options: [
                "MongoDB",
                "Firebase",
                "MySQL",
                "Redis"
            ],

            answer: "MySQL",
        },

        {
            question: "What does API stand for?",

            options: [
                "Application Programming Interface",
                "Advanced Program Internet",
                "Applied Programming Input",
                "None"
            ],

            answer: "Application Programming Interface",
        },

    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedOption, setSelectedOption] = useState("");

    const [score, setScore] = useState(0);

    const handleNext = () => {

        if (!selectedOption) {

            alert("Please select an option.");

            return;
        }

        if (
            selectedOption === questions[currentQuestion].answer
        ) {

            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

            setSelectedOption("");

        } else {

            navigate("/results", {
                state: {
                    score: score + 1,
                    total: questions.length,
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">

            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-10">

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-4xl font-bold">
                        Technical MCQ Round
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
                    >
                        Exit
                    </button>

                </div>

                {/* PROGRESS */}

                <div className="w-full bg-gray-700 rounded-full h-3 mb-10">

                    <div
                        className="bg-cyan-500 h-3 rounded-full transition-all"
                        style={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                    >
                    </div>

                </div>

                {/* QUESTION CARD */}

                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                    <p className="text-cyan-400 mb-4">
                        Question {currentQuestion + 1}
                    </p>

                    <h2 className="text-3xl font-bold mb-10">

                        {questions[currentQuestion].question}

                    </h2>

                    <div className="space-y-5">

                        {questions[currentQuestion].options.map((option, index) => (

                            <button
                                key={index}
                                onClick={() => setSelectedOption(option)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all
                  
                  ${selectedOption === option
                                        ? "bg-cyan-500 border-cyan-500"
                                        : "bg-black/30 border-white/10 hover:bg-white/10"
                                    }
                `}
                            >

                                {option}

                            </button>

                        ))}

                    </div>

                    {/* BUTTON */}

                    <button
                        onClick={handleNext}
                        className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-lg font-semibold transition"
                    >
                        Next Question
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MCQInterview;