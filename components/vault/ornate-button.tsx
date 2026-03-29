import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface OrnateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  glow?: boolean;
}

export function OrnateButton({
  className,
  glow = true,
  ...props
}: OrnateButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border border-[#f7dfa2]/60 bg-gold-button px-8 py-3",
        "font-display text-lg font-semibold uppercase tracking-[0.18em] text-[#5f3813] transition duration-200",
        "before:absolute before:left-3 before:h-4 before:w-4 before:rounded-full before:border before:border-[#e7c86e]/80 before:bg-[#c9982e]",
        "after:absolute after:right-3 after:h-4 after:w-4 after:rounded-full after:border after:border-[#e7c86e]/80 after:bg-[#c9982e]",
        glow && "shadow-glow hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
        className
      )}
      {...props}
    />
  );
}
