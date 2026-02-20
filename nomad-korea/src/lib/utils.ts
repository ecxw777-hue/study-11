import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num);
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000) {
    return `${Math.floor(amount / 10000)}만원`;
  }
  return `${formatNumber(amount)}원`;
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-nk-green";
  if (score >= 70) return "text-nk-gold";
  return "text-nk-red";
}

export function getScoreBarColor(score: number): string {
  if (score >= 85) return "bg-nk-green";
  if (score >= 70) return "bg-nk-gold";
  return "bg-nk-red";
}

export function getSafetyLabel(rating: number): string {
  if (rating >= 4.5) return "매우 안전";
  if (rating >= 4.0) return "안전";
  if (rating >= 3.0) return "보통";
  return "주의";
}

export function getPm25Label(pm25: number): string {
  if (pm25 <= 15) return "좋음";
  if (pm25 <= 25) return "보통";
  if (pm25 <= 50) return "나쁨";
  return "매우 나쁨";
}

export function getPm25Color(pm25: number): string {
  if (pm25 <= 15) return "text-nk-green";
  if (pm25 <= 25) return "text-nk-blue";
  if (pm25 <= 50) return "text-nk-gold";
  return "text-nk-red";
}
