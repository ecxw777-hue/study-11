import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nomad Korea — 한국 디지털 노마드 가이드",
  description:
    "한국에서 디지털 노마드 생활을 시작하세요. 도시별 노마드 스코어, 인터넷 속도, 생활비, 안전 정보를 한눈에.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
