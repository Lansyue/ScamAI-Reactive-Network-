import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function trimHash(value?: string, size = 6) {
  if (!value) return "Awaiting";
  return `${value.slice(0, size)}...${value.slice(-4)}`;
}

export function explorerLink(hash: string, kind: "origin" | "destination") {
  const base =
    kind === "origin"
      ? process.env.NEXT_PUBLIC_ORIGIN_EXPLORER
      : process.env.NEXT_PUBLIC_DESTINATION_EXPLORER;

  return `${base ?? ""}${hash}`;
}
