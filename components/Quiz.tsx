"use client";

import { useState, useCallback } from "react";
import { Question, DimensionScores } from "../data/types";
import { sections } from "../data/sections";

interface QuizProps {
  questions: Question[];
  onComplete: (answers: DimensionScores[]) => void;
  onExit: () => void;
}

export default function Quiz({ questions, onComplete, onExit }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(DimensionScores | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);

  const total = questions.length;
  const question = questions[currentIndex];
  const section = sections.find((s) => s.id === question.section)!;
  const progress = ((currentIndex + 1) / total) * 100;

  // Check if we're at the start of a new section
  const isNewSection =
    currentIndex === 0 ||
    questions[currentIndex - 1]?.section !== question.section;

  const handleAnswer = useCallback(
    (scores: DimensionScores) => {
      if (animating) return;
      setAnimating(true);

      const newAnswers = [...answers];
      newAnswers[currentIndex] = scores;
      setAnswers(newAnswers);
      setDirection("forward");

      setTimeout(() => {
        if (currentIndex < total - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Quiz complete
          onComplete(newAnswers.filter((a): a is DimensionScores => a !== null));
        }
        setAnimating(false);
      }, 200);
    },
    [currentIndex, total, answers, onComplete, animating]
  );

  const handleBack = useCallback(() => {
    if (animating) return;
    if (currentIndex === 0) {
      onExit();
      return;
    }
    setDirection("back");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setAnimating(false);
    }, 150);
  }, [currentIndex, onExit, animating]);

  // Answer button colors — all answers feel equally "valid", just different vibes
  const optionColors = [
    "bg-red/5 border-red/20 active:bg-red/10",
    "bg-orange-bg border-orange/20 active:bg-orange-bg",
    "bg-teal/5 border-teal/20 active:bg-teal/10",
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <button
          onClick={handleBack}
          className="text-gray-500 text-sm p-2 -ml-2 active:opacity-50"
        >
          ← {currentIndex === 0 ? "退出" : "上一题"}
        </button>
        <span className="text-xs text-gray-400">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 mx-4 rounded-full shrink-0 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal to-teal-light rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section header (shows at section transitions) */}
      {isNewSection && (
        <div className="mx-4 mt-3 px-3 py-2 bg-gradient-to-r from-teal to-teal-light rounded-lg text-white text-xs font-medium flex items-center gap-2">
          <span>Part {section.id}/5</span>
          <span>·</span>
          <span>{section.emoji} {section.title}</span>
        </div>
      )}

      {/* Question area */}
      <div
        className={`flex-1 flex flex-col px-5 pt-4 pb-4 overflow-y-auto transition-all duration-200 ${
          animating
            ? direction === "forward"
              ? "opacity-0 translate-x-4"
              : "opacity-0 -translate-x-4"
            : "opacity-100 translate-x-0"
        }`}
      >
        {/* Dimension badge */}
        <div className="mb-3">
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {question.dimensionLabel}
          </span>
        </div>

        {/* Question text */}
        <div className="mb-3">
          <span className="text-xl mr-2">{question.emoji}</span>
          <h2 className="text-lg font-bold text-gray-900 leading-relaxed inline">
            {question.text}
          </h2>
        </div>

        {/* Answer options */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, i) => (
            <button
              key={`${question.id}-${option.label}`}
              onClick={() => handleAnswer(option.scores)}
              className={`text-left p-4 rounded-xl border transition-all duration-150
                active:scale-[0.98] ${optionColors[i]}`}
            >
              <span className="text-sm leading-relaxed text-gray-800">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
