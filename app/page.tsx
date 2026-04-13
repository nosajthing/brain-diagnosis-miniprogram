"use client";

import { useState, useCallback } from "react";
import { DimensionScores } from "../data/types";
import { questions } from "../data/questions";
import { matchDiagnosis, DiagnosisResult } from "../lib/scoring";
import Landing from "../components/Landing";
import Quiz from "../components/Quiz";
import Analyzing from "../components/Analyzing";
import Result from "../components/Result";

type AppState = "landing" | "quiz" | "analyzing" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");
  const [answers, setAnswers] = useState<DimensionScores[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleStart = useCallback(() => {
    setAnswers([]);
    setResult(null);
    setState("quiz");
  }, []);

  const handleQuizComplete = useCallback((collectedAnswers: DimensionScores[]) => {
    setAnswers(collectedAnswers);
    setState("analyzing");
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    const diagResult = matchDiagnosis(answers);
    setResult(diagResult);
    setState("result");
  }, [answers]);

  const handleRetake = useCallback(() => {
    setAnswers([]);
    setResult(null);
    setState("landing");
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      {state === "landing" && <Landing onStart={handleStart} />}
      {state === "quiz" && (
        <Quiz
          questions={questions}
          onComplete={handleQuizComplete}
          onExit={() => setState("landing")}
        />
      )}
      {state === "analyzing" && (
        <Analyzing onComplete={handleAnalysisComplete} />
      )}
      {state === "result" && result && (
        <Result result={result} onRetake={handleRetake} />
      )}
    </div>
  );
}
