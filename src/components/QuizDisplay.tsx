"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Question = {
  question: string;
  options: string[]; // always expecting an array
  correctAnswer: string;
};

type QuizDisplayProps = {
  prompt: string;
  onFinish: (results: {
    question: string;
    correctAnswer: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[]) => void;
};

export default function QuizDisplay({ prompt, onFinish }: QuizDisplayProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<
    {
      question: string;
      correctAnswer: string;
      selectedAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  const currentQuestion = questions[currentIndex];

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://localhost:8000/generate-quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        // Defensive check: ensure options are array
const safeQuestions: Question[] = data.questions.map((q: {
  question: string;
  options: string[] | string;
  answer: string;
}) => ({
  ...q,
  options: Array.isArray(q.options)
    ? q.options
    : typeof q.options === "string"
    ? q.options.split(",").map((opt) => opt.trim())
    : [],
}));

        setQuestions(safeQuestions);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [prompt]);

  // Timer logic
  useEffect(() => {
    if (isQuizFinished || loading || !questions.length) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, isQuizFinished, loading]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext(option);
    }, 800);
  };

  const handleNext = (selected: string | null) => {
    const result = {
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      selectedAnswer: selected ?? "No answer",
      isCorrect: selected === currentQuestion.correctAnswer,
    };

    const updatedResults = [...results, result];
    setResults(updatedResults);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(15);
    } else {
      setIsQuizFinished(true);
      onFinish(updatedResults);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimer(15);
    setIsQuizFinished(false);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">🔥 Quiz on: {prompt}</h1>

      {loading ? (
        <p className="text-xl text-purple-300 animate-pulse">📡 Generating quiz, please wait...</p>
      ) : isQuizFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 border border-purple-500 backdrop-blur-md p-10 rounded-xl shadow-xl text-center max-w-xl w-full"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-300">🎉 Quiz Completed!</h2>
          <p className="text-xl mb-6">
            Your score is <span className="text-green-400 font-bold">{score}</span> out of{" "}
            <span className="text-white">{questions.length}</span>
          </p>
          <button
            onClick={handleRestart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            🔁 Restart Quiz
          </button>
        </motion.div>
      ) : (
        <>
          <div className="w-full max-w-xl mb-6 bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-purple-500"
            />
          </div>

          <div className="text-lg mb-2">
            ⏳ Time Left: <span className="font-bold">{timer}s</span>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-xl w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">{currentQuestion.question}</h2>
            <div className="grid grid-cols-1 gap-4">
              {Array.isArray(currentQuestion.options) &&
                currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg text-lg font-medium border transition duration-300 ${
                      selectedOption
                        ? option === currentQuestion.correctAnswer
                          ? "bg-green-600 border-green-500"
                          : option === selectedOption
                          ? "bg-red-600 border-red-500"
                          : "bg-gray-700 border-gray-600"
                        : "bg-purple-600 hover:bg-purple-700 border-purple-500"
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-300">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </>
      )}
    </div>
  );
}
