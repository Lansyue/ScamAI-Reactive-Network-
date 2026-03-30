import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface AppShellProps extends PropsWithChildren {
  className?: string;
  ambiance?: "landing" | "challenge" | "pending" | "result";
}

const ambianceMap = {
  landing:
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_78%_18%,rgba(255,220,122,0.26),transparent_22%),radial-gradient(circle_at_18%_72%,rgba(181,94,26,0.16),transparent_26%)]",
  challenge:
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_25%_30%,rgba(255,215,125,0.12),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(255,208,102,0.18),transparent_24%)]",
  pending:
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_65%_18%,rgba(248,214,132,0.16),transparent_20%),radial-gradient(circle_at_15%_80%,rgba(169,102,47,0.16),transparent_24%)]",
  result:
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_82%_16%,rgba(255,221,137,0.2),transparent_24%),radial-gradient(circle_at_12%_78%,rgba(172,91,31,0.12),transparent_24%)]"
} as const;

export function AppShell({
  children,
  className,
  ambiance = "landing"
}: AppShellProps) {
  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-vault-radial text-vault-parchment",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.28))]",
        ambianceMap[ambiance],
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="pointer-events-none absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="rounded-[18px] border border-[#f3ddaa]/20 bg-[rgba(17,10,7,0.42)] px-4 py-2.5 text-[#fff1c3] shadow-[0_14px_30px_rgba(15,8,5,0.18)] backdrop-blur-[6px]">
          <p className="font-display text-lg uppercase tracking-[0.18em] sm:text-xl">ScamAI</p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f3ddaa]/80 sm:text-xs">
            The Miser&apos;s Vault
          </p>
        </div>
      </div>
      <div className="relative z-10 min-h-screen">{children}</div>
    </main>
  );
}
