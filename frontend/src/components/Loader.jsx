import { motion } from "framer-motion";

function Loader() {

  return (

    <div className="fixed inset-0 bg-[#030712] flex items-center justify-center z-50">

      <div className="flex flex-col items-center">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full"
        />

        <h1 className="text-white text-2xl font-bold mt-8">

          Initializing AI Interview...

        </h1>

      </div>

    </div>

  );
}

export default Loader;