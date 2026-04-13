"use client";

import { useRef, useState } from "react";
import { DiagnosisResult } from "../lib/scoring";
import { DimensionScores } from "../data/types";
import { Diagnosis } from "../data/types";
import ShareCard from "./ShareCard";

interface ResultProps {
  result: DiagnosisResult;
  onRetake: () => void;
}

const dimensionLabels: Record<string, string> = {
  mem: "记忆",
  att: "注意",
  lang: "语言",
  exec: "执行",
  emo: "情绪",
};

const dimensionColors: Record<string, string> = {
  mem: "#1565C0",
  att: "#E65100",
  lang: "#2E7D32",
  exec: "#6A1B9A",
  emo: "#C2185B",
};

/** Generate a "why this diagnosis" explanation based on dimension scores */
function generateDiagnosisReasoning(scores: DimensionScores, primary: Diagnosis): string {
  const dims = Object.entries(scores) as [keyof DimensionScores, number][];
  // Sort by most extreme (lowest first, then highest)
  const sorted = [...dims].sort((a, b) => a[1] - b[1]);
  const lowest = sorted[0];
  const secondLowest = sorted[1];
  const highest = sorted[sorted.length - 1];

  const nameMap: Record<string, string> = {
    mem: "记忆力",
    att: "注意力",
    lang: "语言表达",
    exec: "执行功能",
    emo: "情绪调节",
  };

  const parts: string[] = [];

  // Mention the weakest dimension
  if (lowest[1] < 40) {
    parts.push(`你的${nameMap[lowest[0]]}维度仅${lowest[1]}分`);
  }
  if (secondLowest[1] < 45) {
    parts.push(`${nameMap[secondLowest[0]]}${secondLowest[1]}分`);
  }

  // Mention if any dimension is unusually high
  if (highest[1] > 70) {
    parts.push(`${nameMap[highest[0]]}却高达${highest[1]}分`);
  }

  if (parts.length === 0) {
    return `你的五维数据呈现出典型的「${primary.name}」特征——各项能力看似均衡，实则都在及格线上疯狂试探。`;
  }

  const scoreDesc = parts.join("，");

  // Diagnosis-specific flavor text
  const flavorMap: Record<string, string> = {
    "memory-loss": "信息在进入大脑的路上就已经开始蒸发了。你的记忆像一个没有保存按钮的文档——永远在编辑，从未被存储。",
    "attention-evaporation": "你的注意力像一只蝴蝶，每朵花都想停一下，但没有一朵花值得停超过3秒。大脑弹幕太密，连你自己都看不清重点。",
    "mental-drain": "你的情绪处理器在疯狂运转，但CPU显示没有任何有效输出。所有的能量都被内耗吃掉了，留给现实世界的所剩无几。",
    "decision-paralysis": "你的决策系统已经进入无限循环。选项越多越崩溃，最后连「算了」都要纠结三遍才能说出口。",
    "nocturnal-awakening": "白天的你和夜晚的你根本不是同一个操作系统。一个是省电模式，一个是超频运行——可惜超频的时候全世界都睡了。",
    "social-npc": "你的社交模块已经被自动回复接管了。真实想法深埋在第47层防火墙后面，连你自己都快忘了密码。",
    "multi-thread-crash": "你试图同时运行太多进程，但每个进程都只分到了可怜的一点算力。结果：什么都在做，什么都没做好。",
    "emotional-overflow": "你的情感缓存区严重超载。别人的一个眼神就能触发你的深度分析模式，2019年的记忆比昨天的午饭还清晰。",
  };

  const flavor = flavorMap[primary.id] || "你的大脑正在以一种非常有个性的方式运转着。";

  return `${scoreDesc}——${flavor}`;
}

export default function Result({ result, onRetake }: ResultProps) {
  const { primary, secondary, scores } = result;
  const [showShareCard, setShowShareCard] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const reasoning = generateDiagnosisReasoning(scores, primary);

  return (
    <>
      <div ref={resultRef} className="h-full overflow-y-auto bg-gray-50">
        {/* Certificate header */}
        <div className="bg-white border-b-2 border-dashed border-gray-300 px-5 pt-6 pb-4">
          <div className="flex justify-between items-center text-[10px] text-gray-400 mb-2">
            <span>和睦家医院 · 脑力健康评估中心</span>
            <span>{new Date().toLocaleDateString("zh-CN")}</span>
          </div>
          <h1 className="text-center text-2xl font-black text-red tracking-[6px] mb-1">
            诊 断 书
          </h1>
          <p className="text-center text-[9px] text-gray-300 mt-1">
            仅供娱乐 · 非医学诊断
          </p>
        </div>

        {/* Main diagnosis */}
        <div className="px-5 py-5 bg-white">
          {/* Diagnosis name */}
          <div className="text-center mb-4">
            <span className="text-4xl mb-2 block">{primary.emoji}</span>
            <h2 className="text-xl font-black text-red">{primary.name}</h2>
            <p className="text-xs text-gray-400 mt-1">{primary.englishName}</p>
            <p className="text-sm text-gray-600 mt-2 font-medium">{primary.tagline}</p>
          </div>

          {/* Dimension scores */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-[10px] text-gray-400 text-center mb-3">五维脑力图</p>
            <div className="flex justify-between">
              {(Object.keys(scores) as (keyof typeof scores)[]).map((key) => (
                <div key={key} className="text-center flex-1">
                  <div
                    className="text-lg font-black"
                    style={{ color: dimensionColors[key] }}
                  >
                    {scores[key]}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {dimensionLabels[key]}
                  </div>
                  {/* Mini bar */}
                  <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mt-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${scores[key]}%`,
                        backgroundColor: dimensionColors[key],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-bold text-red">症状：</span>
              {primary.symptoms}
            </p>
          </div>

          {/* Diagnosis reasoning — why this diagnosis */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-teal">诊断依据：</span>
              {reasoning}
            </p>
          </div>

          {/* Soul labels */}
          <div className="flex flex-wrap gap-2 mb-4">
            {primary.soulLabels.map((label) => (
              <span
                key={label}
                className="bg-red-bg text-red text-xs px-3 py-1 rounded-full font-medium"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Doctor note */}
          <div className="bg-orange-bg rounded-xl p-3 mb-4">
            <p className="text-sm text-orange">
              <span className="font-bold">医嘱：</span>
              {primary.doctorNote}
            </p>
          </div>

          {/* Secondary diagnosis hint */}
          <div className="text-center py-3 border-t border-dashed border-gray-200">
            <p className="text-xs text-gray-400">
              同时疑似：<span className="font-medium text-gray-600">{secondary.emoji} {secondary.name}</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 space-y-3">
          <button
            onClick={() => setShowShareCard(true)}
            className="w-full py-3.5 rounded-full font-bold text-white text-sm
              bg-gradient-to-r from-red to-red-light active:scale-[0.98] transition-transform shadow-md"
          >
            生成诊断书图片 📋
          </button>
          <button
            onClick={onRetake}
            className="w-full py-3 rounded-full font-medium text-gray-600 text-sm
              border border-gray-200 bg-white active:scale-[0.98] transition-transform"
          >
            再测一次 🔄
          </button>
        </div>

        {/* rTMS EEG CTA */}
        <div className="mx-5 mb-4 bg-white rounded-2xl border border-teal/20 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-teal to-teal-light px-4 py-2.5">
            <p className="text-white text-sm font-bold">
              🧪 玩笑归玩笑，认真筛查很重要
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              和睦家医院提供专业的 rTMS·EEG 脑健康筛查服务——通过经颅磁刺激与脑电图技术，精准评估认知功能状态，早发现、早干预。
            </p>
            <button className="w-full py-2.5 rounded-full font-bold text-teal text-sm
              border-2 border-teal active:scale-[0.98] transition-transform">
              了解专业 rTMS·EEG 脑健康筛查 →
            </button>
          </div>
        </div>

        {/* Subtle footer */}
        <div className="text-center pb-8 pt-2">
          <p className="text-[10px] text-gray-300 leading-relaxed">
            和睦家医院 · 关注您的脑健康
          </p>
          <p className="text-[9px] text-gray-200 mt-1">
            本测试仅供娱乐，不构成任何医学建议
          </p>
        </div>
      </div>

      {/* Share card modal */}
      {showShareCard && (
        <ShareCard result={result} onClose={() => setShowShareCard(false)} />
      )}
    </>
  );
}
