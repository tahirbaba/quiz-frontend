"use client";

import { useState } from "react";
import PromptInput from "@/components/PromptInput";
import QuizDisplay from "@/components/QuizDisplay";
import QuizResult from "@/components/QuizResult";

export default function Home() {
  const [userPrompt, setUserPrompt] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState<
    {
      question: string;
      correctAnswer: string;
      selectedAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  return (
    <main className="min-h-screen text-white">
      {!userPrompt ? (
        <PromptInput onPromptSubmit={setUserPrompt} />
      ) : !quizFinished ? (
        <QuizDisplay
          prompt={userPrompt}
          onFinish={(results) => {
            setQuizResults(results);
            setQuizFinished(true);
          }}
        />
      ) : (
        <QuizResult results={quizResults} />
      )}
    </main>
  );
}
