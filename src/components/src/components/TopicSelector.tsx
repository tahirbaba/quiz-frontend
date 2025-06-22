"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type TopicSelectorProps = {
  topics: string[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string) => void;
};

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-10">
      {topics.map((topic) => (
        <motion.button
          key={topic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectTopic(topic)}
          className={clsx(
            "px-6 py-3 rounded-xl text-lg font-semibold shadow-lg border-2 transition-all duration-300",
            selectedTopic === topic
              ? "bg-purple-700 text-white border-purple-400 shadow-[0_0_30px_#a855f7]"
              : "bg-[#1f1f3b] text-gray-200 border-purple-600 hover:shadow-[0_0_15px_#9333ea]"
          )}
        >
          {topic}
        </motion.button>
      ))}
    </div>
  );
};

export default TopicSelector;
