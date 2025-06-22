"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizResultProps {
  results: {
    question: string;
    correctAnswer: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
}

const QuizResult: React.FC<QuizResultProps> = ({ results }) => {
  const correctCount = results.filter((res) => res.isCorrect).length;

  // 👇 Handler for restarting or going back
  const handleRestart = () => window.location.reload();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 border border-purple-500 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center w-full max-w-4xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-purple-300 tracking-tight">📊 Quiz Results</h2>

        <p className="text-xl mb-10">
          You answered{" "}
          <span className="text-green-400 font-bold">{correctCount}</span> out of{" "}
          <span className="text-white font-bold">{results.length}</span> questions correctly!
        </p>

        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 text-left scrollbar-thin scrollbar-thumb-purple-500/60 scrollbar-track-transparent mb-10">
          {results.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-xl p-6 border-l-8 shadow-md ${
                item.isCorrect
                  ? "border-green-500 bg-green-800/30"
                  : "border-red-500 bg-red-800/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  {item.isCorrect ? (
                    <CheckCircle size={28} className="text-green-400" />
                  ) : (
                    <XCircle size={28} className="text-red-400" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    Q{index + 1}: {item.question}
                  </h3>
                  <p className="mb-1 text-sm md:text-base">
                    ✅ <span className="text-green-300 font-semibold">Correct:</span>{" "}
                    <span className="font-bold text-green-400">{item.correctAnswer}</span>
                  </p>
                  <p className="text-sm md:text-base">
                    ✏️ <span className="text-purple-200 font-semibold">You Selected:</span>{" "}
                    <span
                      className={`font-bold ${
                        item.isCorrect ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.selectedAnswer}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔁 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={handleRestart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            🔁 Restart Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;
