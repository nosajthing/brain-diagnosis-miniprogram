import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "脑力诊断书 — 你的大脑得了什么症？",
  description: "31道灵魂拷问，测出你的脑力症状。来自脑力健康评估中心。",
  openGraph: {
    title: "脑力诊断书 — 你的大脑得了什么症？",
    description: "31道灵魂拷问，测出你的脑力症状",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
