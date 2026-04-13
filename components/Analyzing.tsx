"use client";

import { useEffect, useState } from "react";

interface AnalyzingProps {
  onComplete: () => void;
}

const loadingTexts = [
  "正在扫描你的脑力数据…",
  "正在匹配症状数据库…",
  "正在生成诊断报告…",
  "诊断即将完成…",
];

export default function Analyzing({ onComplete }: AnalyzingProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const duration = 2800; // total animation time
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out progress
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(eased * 100, 99));

      // Update text at milestones
      if (t > 0.25 && t < 0.26) setTextIndex(1);
      if (t > 0.55 && t < 0.56) setTextIndex(2);
      if (t > 0.8 && t < 0.81) setTextIndex(3);

      if (step >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-8">
      {/* Animated brain */}
      <div className="text-6xl mb-8 animate-bounce">🔬</div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-teal to-teal-light rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="text-sm font-medium text-gray-700 mb-1 transition-opacity duration-300">
        {loadingTexts[textIndex]}
      </p>
      <p className="text-xs text-gray-400">
        {Math.round(progress)}%
      </p>

      {/* Fun decorative text */}
      <p className="text-[10px] text-gray-300 mt-8 text-center leading-relaxed">
        ⚡ 正在对比8种脑力症状模型…<br />
        📊 分析你的五维脑力数据…
      </p>
    </div>
  );
}
