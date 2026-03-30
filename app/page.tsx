"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { ConnectWalletButton } from "@/components/vault/connect-wallet-button";
import { SceneStage } from "@/components/vault/scene-stage";
import { useChallenge } from "@/hooks/useChallenge";

export default function LandingPage() {
  const { challenge, isConnected } = useChallenge();

  return (
    <AppShell ambiance="landing">
      <div className="mx-auto flex min-h-screen w-full items-center px-4 py-6 lg:px-8">
        <SceneStage
          src="/references/landing-reference.png"
          alt="ScamAI landing poster for The Miser's Vault"
          priority
        >
          <div className="absolute right-[2.8%] top-[4.2%] hidden lg:block">
            <div className="scale-[0.72] origin-top-right">
              <ConnectWalletButton />
            </div>
          </div>

          <div className="absolute left-[61.4%] top-[56.6%] h-[12.8%] w-[30%] -translate-x-1/2 -translate-y-1/2 lg:h-[11.8%] lg:w-[25.6%]">
            <Link
              href="/challenge"
              aria-label={isConnected ? "Enter the challenge" : "Connect wallet and enter"}
              className="block h-full w-full rounded-[22px] border border-transparent bg-transparent transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7dfa2]/80"
            >
              <span className="sr-only">
                {isConnected ? "Enter (0.001 ETH)" : "Connect To Enter"}
              </span>
            </Link>
          </div>

          {challenge ? (
            <div className="absolute bottom-[6%] right-[6%] hidden lg:block">
              <Link
                href={challenge.status === "completed" ? "/result" : "/pending"}
                className="rounded-full border border-[#f7dfa2]/35 bg-black/20 px-5 py-2.5 font-display text-xs uppercase tracking-[0.25em] text-[#fff2c7] backdrop-blur-sm"
              >
                Resume Session
              </Link>
            </div>
          ) : null}
        </SceneStage>
      </div>
    </AppShell>
  );
}
