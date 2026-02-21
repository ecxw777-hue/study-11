"use client";

import { useState, useEffect, useCallback } from "react";
import { Share2, Link, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (appKey: string) => void;
      Share: {
        sendDefault: (params: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: { mobileWebUrl: string; webUrl: string };
          };
          buttons: Array<{
            title: string;
            link: { mobileWebUrl: string; webUrl: string };
          }>;
        }) => void;
      };
    };
  }
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.56-.96 3.6-.99 3.83 0 0-.02.17.09.23.11.07.24.02.24.02.31-.04 3.65-2.4 4.22-2.81.58.08 1.17.12 1.78.12 5.52 0 10-3.58 10-7.94C22 6.58 17.52 3 12 3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButtons({
  url,
  title,
  description,
  imageUrl,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    const checkKakao = () => {
      if (window.Kakao) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (appKey && !window.Kakao.isInitialized()) {
          window.Kakao.init(appKey);
        }
        setKakaoReady(!!appKey && window.Kakao.isInitialized());
      }
    };

    checkKakao();
    // SDK가 아직 로드 안 됐을 수 있으므로 재시도
    const timer = setTimeout(checkKakao, 2000);
    return () => clearTimeout(timer);
  }, []);

  const shareToKakao = useCallback(() => {
    if (!window.Kakao?.Share) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: { mobileWebUrl: url, webUrl: url },
        },
      ],
    });
  }, [url, title, description, imageUrl]);

  const shareToTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  }, [url, title]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("링크가 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("링크 복사에 실패했습니다");
    }
  }, [url]);

  return (
    <div className="flex items-center gap-1.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/70 hover:bg-white/20 hover:text-white"
            onClick={shareToKakao}
            disabled={!kakaoReady}
            aria-label="카카오톡으로 공유"
          >
            <KakaoIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {kakaoReady ? "카카오톡 공유" : "카카오톡 공유 (설정 필요)"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/70 hover:bg-white/20 hover:text-white"
            onClick={shareToTwitter}
            aria-label="X(트위터)로 공유"
          >
            <XIcon className="size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>X(트위터) 공유</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/70 hover:bg-white/20 hover:text-white"
            onClick={copyLink}
            aria-label="링크 복사"
          >
            {copied ? <Check className="size-4" /> : <Link className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "복사됨!" : "링크 복사"}</TooltipContent>
      </Tooltip>
    </div>
  );
}
