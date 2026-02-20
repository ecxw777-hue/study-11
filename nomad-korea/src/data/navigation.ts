import { NavItem, FooterSection } from "@/types";

export const mainNav: NavItem[] = [
  { label: "도시 탐색", href: "#cities" },
  { label: "한달살기", href: "#monthly-stay" },
  { label: "밋업", href: "#meetups" },
  { label: "커뮤니티", href: "#community" },
  { label: "멤버십", href: "#membership" },
];

export const footerSections: FooterSection[] = [
  {
    title: "탐색",
    links: [
      { label: "인기 도시", href: "#" },
      { label: "한달살기", href: "#" },
      { label: "코워킹 스페이스", href: "#" },
      { label: "노마드 지도", href: "#" },
    ],
  },
  {
    title: "커뮤니티",
    links: [
      { label: "밋업", href: "#" },
      { label: "포럼", href: "#" },
      { label: "슬랙 채널", href: "#" },
      { label: "뉴스레터", href: "#" },
    ],
  },
  {
    title: "정보",
    links: [
      { label: "비자 가이드", href: "#" },
      { label: "생활비 계산기", href: "#" },
      { label: "안전 정보", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "소개", href: "#" },
      { label: "블로그", href: "#" },
      { label: "제휴 문의", href: "#" },
      { label: "이용약관", href: "#" },
    ],
  },
];
