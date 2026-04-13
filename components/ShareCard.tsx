"use client";

import { useRef, useEffect, useState } from "react";
import { DiagnosisResult } from "../lib/scoring";

interface ShareCardProps {
  result: DiagnosisResult;
  onClose: () => void;
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

export default function ShareCard({ result, onClose }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { primary, scores } = result;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 2;
    const W = 360;
    const H = 640;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // Top header area
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, W, 80);

    // Header text
    ctx.fillStyle = "#999999";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("和睦家医院 · 脑力健康评估中心", 20, 30);
    ctx.textAlign = "right";
    ctx.fillText(new Date().toLocaleDateString("zh-CN"), W - 20, 30);

    // Title
    ctx.fillStyle = "#c62828";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("脑 力 诊 断 书", W / 2, 62);

    // Dashed line
    ctx.strokeStyle = "#cccccc";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 80);
    ctx.lineTo(W - 20, 80);
    ctx.stroke();
    ctx.setLineDash([]);

    // Emoji
    ctx.font = "40px sans-serif";
    ctx.fillText(primary.emoji, W / 2, 130);

    // Diagnosis name
    ctx.fillStyle = "#c62828";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(primary.name, W / 2, 165);

    // English name
    ctx.fillStyle = "#999999";
    ctx.font = "10px sans-serif";
    ctx.fillText(primary.englishName, W / 2, 182);

    // Tagline
    ctx.fillStyle = "#555555";
    ctx.font = "13px sans-serif";
    ctx.fillText(primary.tagline, W / 2, 205);

    // Dimension scores background
    ctx.fillStyle = "#f8f9fa";
    roundRect(ctx, 20, 220, W - 40, 70, 10);
    ctx.fill();

    // Dimension scores
    const dims = Object.keys(scores) as (keyof typeof scores)[];
    const scoreAreaW = W - 80;
    const gap = scoreAreaW / dims.length;

    dims.forEach((key, i) => {
      const x = 40 + gap * i + gap / 2;
      // Score
      ctx.fillStyle = dimensionColors[key];
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(scores[key]), x, 253);
      // Label
      ctx.fillStyle = "#999999";
      ctx.font = "9px sans-serif";
      ctx.fillText(dimensionLabels[key], x, 270);
      // Mini bar bg
      ctx.fillStyle = "#e0e0e0";
      roundRect(ctx, x - 15, 275, 30, 3, 1.5);
      ctx.fill();
      // Mini bar fill
      ctx.fillStyle = dimensionColors[key];
      roundRect(ctx, x - 15, 275, Math.max(3, (scores[key] / 100) * 30), 3, 1.5);
      ctx.fill();
    });

    // Symptoms text
    ctx.fillStyle = "#333333";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    const symptomsText = primary.symptoms;
    const lines = wrapText(ctx, symptomsText, W - 60, 12);
    let sy = 320;
    // Red "症状：" prefix
    ctx.fillStyle = "#c62828";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("症状：", 30, sy);
    const prefixW = ctx.measureText("症状：").width;
    ctx.fillStyle = "#555555";
    ctx.font = "12px sans-serif";
    // First line after prefix
    ctx.fillText(lines[0], 30 + prefixW, sy);
    for (let i = 1; i < Math.min(lines.length, 4); i++) {
      sy += 18;
      ctx.fillText(lines[i], 30, sy);
    }

    // Soul labels
    const labelY = sy + 30;
    let lx = 30;
    primary.soulLabels.forEach((label) => {
      const tw = ctx.measureText(label).width + 16;
      // Pill background
      ctx.fillStyle = "#ffebee";
      roundRect(ctx, lx, labelY - 10, tw, 22, 11);
      ctx.fill();
      // Pill text
      ctx.fillStyle = "#c62828";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(label, lx + 8, labelY + 4);
      lx += tw + 6;
    });

    // Doctor note box
    const noteY = labelY + 30;
    ctx.fillStyle = "#fff3e0";
    roundRect(ctx, 20, noteY, W - 40, 44, 8);
    ctx.fill();
    ctx.fillStyle = "#e65100";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("医嘱：", 30, noteY + 18);
    ctx.font = "11px sans-serif";
    const noteLines = wrapText(ctx, primary.doctorNote, W - 80, 11);
    const notePrefix = ctx.measureText("医嘱：").width;
    ctx.fillText(noteLines[0], 30 + notePrefix, noteY + 18);
    if (noteLines.length > 1) {
      ctx.fillText(noteLines[1], 30, noteY + 34);
    }

    // Footer
    const footerY = H - 60;
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, footerY, W, 60);

    ctx.fillStyle = "#004d5b";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("你的大脑得了什么症？", 20, footerY + 22);
    ctx.fillStyle = "#999999";
    ctx.font = "9px sans-serif";
    ctx.fillText("长按保存 · 分享给朋友", 20, footerY + 38);

    // Faded stamp
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.translate(W - 55, H - 130);
    ctx.rotate(-0.25);
    ctx.strokeStyle = "#c62828";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#c62828";
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("和睦家", 0, -4);
    ctx.fillText("脑力评估", 0, 8);
    ctx.restore();

    // Generate image
    const url = canvas.toDataURL("image/png");
    setImageUrl(url);
  }, [primary, scores]);

  const handleSave = async () => {
    if (!imageUrl) return;
    setSaving(true);
    try {
      // Try native share/download
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], "脑力诊断书.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "脑力诊断书" });
      } else {
        // Fallback: download
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = "脑力诊断书.png";
        a.click();
      }
    } catch {
      // User cancelled or error — show long-press instruction
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center p-6">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 text-2xl p-2 active:opacity-50"
      >
        ✕
      </button>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Preview image */}
      {imageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="诊断书"
            className="max-w-[85vw] max-h-[70vh] rounded-xl shadow-2xl"
          />
          <p className="text-white/60 text-xs mt-3 text-center">
            长按图片保存到相册
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-3 bg-white text-gray-800 font-bold text-sm px-8 py-3 rounded-full
              active:scale-95 transition-transform disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存图片 📲"}
          </button>
        </>
      )}
    </div>
  );
}

// Helper: rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Helper: wrap text into lines
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  _fontSize: number
): string[] {
  const chars = text.split("");
  const lines: string[] = [];
  let currentLine = "";

  for (const char of chars) {
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
