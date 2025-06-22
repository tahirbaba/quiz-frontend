"use client";

import React, { useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";

type PromptInputProps = {
  onPromptSubmit: (prompt: string) => void;
};

const PromptInput: React.FC<PromptInputProps> = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt);
      setPrompt("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 relative overflow-hidden"
    >
      {/* 🔮 Background glow effect */}
      <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-[#8e2de2]/10 via-[#4a00e0]/10 to-[#000000]/10 blur-3xl animate-pulse opacity-70" />

      {/* 🧠 Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-black mb-6 text-center drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500"
      >
        🚀 Enter Your Prompt
      </motion.h1>

      {/* 🎯 Animated Icon */}
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mb-10"
      >
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 border border-purple-600 p-6 rounded-full shadow-[0_0_40px_#9333ea] transition-all duration-500 hover:shadow-[0_0_60px_#c084fc] backdrop-blur-lg"
        >
          <FaArrowCircleDown className="text-purple-400 text-5xl drop-shadow-xl animate-bounce" />
        </motion.div>
      </motion.div>

      {/* 🧪 Prompt Input */}
      <motion.input
        type="text"
        placeholder="Type your tech quiz prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-xl px-6 py-4 rounded-2xl text-white bg-[#1f1f3b] border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-lg shadow-lg backdrop-blur-lg transition"
        whileFocus={{ scale: 1.02 }}
      />

      {/* 🧨 Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-lg transition-all duration-300 animate-pulse"
      >
        ✨ Generate Quiz
      </motion.button>
    </form>
  );
};

export default PromptInput;
