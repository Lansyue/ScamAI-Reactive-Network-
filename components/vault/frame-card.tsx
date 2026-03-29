import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface FrameCardProps extends PropsWithChildren {
  className?: string;
  parchment?: boolean;
}

export function FrameCard({
  children,
  className,
  parchment = false
}: FrameCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-[#caa35a]/40 shadow-panel",
        parchment
          ? "bg-parchment-panel text-vault-night"
          : "bg-[linear-gradient(180deg,rgba(57,37,25,0.85),rgba(29,18,12,0.95))] text-vault-parchment",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-[#d7b26e]/30" />
      <div className="pointer-events-none absolute left-5 top-5 h-4 w-4 rounded-full border border-[#d7b26e]/60" />
      <div className="pointer-events-none absolute right-5 top-5 h-4 w-4 rounded-full border border-[#d7b26e]/60" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 rounded-full border border-[#d7b26e]/60" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 rounded-full border border-[#d7b26e]/60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
