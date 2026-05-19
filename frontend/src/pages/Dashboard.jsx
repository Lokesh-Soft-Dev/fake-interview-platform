import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { motion } from "framer-motion";

function Dashboard() {

    const navigate = useNavigate();

    const interviewTypes = [

        {
            title: "HR Interview",

            description:
                "Behavioral & communication interview practice with realistic HR questions.",

            gradient:
                "from-violet-600 to-indigo-600",

            glow:
                "shadow-violet-500/30",

            category: "HR",
        },

        {
            title: "Technical Round",

            description:
                "React, Python, DBMS, APIs & full-stack technical interview preparation.",

            gradient:
                "from-cyan-500 to-blue-600",

            glow:
                "shadow-cyan-500/30",

            category: "Technical",
        },

        {
            title: "Coding Challenge",

            description:
                "Improve logic building, DSA thinking and coding interview confidence.",

            gradient:
                "from-pink-500 to-rose-500",

            glow:
                "shadow-pink-500/30",

            category: "Coding",
        },
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

            <Navbar />

            {/* BACKGROUND GLOWS */}

            <div className="absolute top-32 left-10 md:left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-10 right-10 md:right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl">
            </div>

            {/* MAIN CONTENT */}

            <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16">

                {/* HERO SECTION */}

                <motion.div
                    initial={{ opacity: 0, y: 60 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.8 }}

                    className="mb-20"
                >

                    <p className="text-cyan-400 font-semibold mb-5 tracking-[4px] uppercase text-sm md:text-base">

                        AI Powered Interview Platform

                    </p>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight max-w-5xl">

                        Crack Your

                        <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">

                            {" "}Dream Job

                        </span>

                    </h1>

                    <p className="text-gray-400 text-lg md:text-2xl mt-8 max-w-3xl leading-relaxed">

                        Practice HR, Technical & Coding interviews
                        with immersive AI-powered real-world simulations.

                    </p>

                </motion.div>

                {/* INTERVIEW CARDS */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {interviewTypes.map((item, index) => (

                        <motion.div
                            key={index}

                            initial={{ opacity: 0, y: 80 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{
                                duration: 0.7,
                                delay: index * 0.15,
                            }}

                            whileHover={{
                                y: -8,
                            }}

                            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1120]/80 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-cyan-400/20"
                        >

                            {/* TOP LINE */}

                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                            </div>

                            {/* SMALL LABEL */}

                            <p className="text-cyan-400 text-xs tracking-[3px] uppercase mb-6 font-semibold">

                                AI Interview Module

                            </p>

                            {/* TITLE */}

                            <h2 className="text-3xl font-black text-white mb-5 leading-tight">

                                {item.title}

                            </h2>

                            {/* DESCRIPTION */}

                            <p className="text-gray-400 leading-relaxed text-lg mb-10">

                                {item.description}

                            </p>

                            {/* FEATURES */}

                            <div className="space-y-4 mb-12">

                                <div className="flex items-center gap-3 text-gray-300">

                                    <div className="w-2 h-2 rounded-full bg-cyan-400">
                                    </div>

                                    Real-world interview questions

                                </div>

                                <div className="flex items-center gap-3 text-gray-300">

                                    <div className="w-2 h-2 rounded-full bg-cyan-400">
                                    </div>

                                    Timed interview simulation

                                </div>

                                <div className="flex items-center gap-3 text-gray-300">

                                    <div className="w-2 h-2 rounded-full bg-cyan-400">
                                    </div>

                                    AI-powered practice experience

                                </div>

                            </div>

                            {/* BUTTON */}

                            <motion.button

                                whileHover={{ scale: 1.03 }}

                                whileTap={{ scale: 0.97 }}

                                onClick={() =>
                                    navigate(
                                        `/interview/${item.category}`
                                    )
                                }

                                className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-400/10 py-4 text-lg font-bold text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                            >

                                Start Session →

                            </motion.button>

                        </motion.div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;