"use client";

import { useState } from "react";

const STORAGE_KEY = "nomad-korea-membership";

export function useMembership() {
  const [isPro, setIsPro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "pro";
  });

  function upgradeToPro() {
    localStorage.setItem(STORAGE_KEY, "pro");
    setIsPro(true);
  }

  return { isPro, upgradeToPro };
}
