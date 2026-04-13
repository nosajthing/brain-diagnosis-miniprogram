"use client";

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal to-teal-light p-8 text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-6xl opacity-10 animate-pulse">🧠</div>
        <div className="absolute top-[25%] right-[15%] text-4xl opacity-10 animate-pulse delay-300">💊</div>
        <div className="absolute bottom-[30%] left-[20%] text-5xl opacity-10 animate-pulse delay-700">📋</div>
        <div className="absolute bottom-[15%] right-[10%] text-4xl opacity-10 animate-pulse delay-500">🔬</div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Hospital branding */}
        <div className="border border-white/30 rounded-lg px-4 py-1.5 mb-6 text-xs tracking-widest opacity-80">
          和睦家医院 · 脑力健康评估中心
        </div>

        {/* Main title */}
        <h1 className="text-3xl font-black tracking-wider mb-3">
          脑力诊断书
        </h1>
        <p className="text-lg font-semibold mb-2 opacity-95">
          趁你还记得自己是谁，先来测一下
        </p>
        <p className="text-sm opacity-70 mb-10 leading-relaxed">
          15道灵魂拷问<br />
          别等忘了WiFi密码才后悔
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="bg-white text-teal font-bold text-lg px-10 py-4 rounded-full shadow-lg
            active:scale-95 transition-transform duration-150"
        >
          开始测试 →
        </button>

        {/* Disclaimer */}
        <p className="mt-8 text-[10px] opacity-40 leading-relaxed">
          本测试仅供娱乐，不构成任何医学建议<br />
          如有健康疑虑请咨询专业医生
        </p>
      </div>
    </div>
  );
}
