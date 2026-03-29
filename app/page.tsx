"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { ConnectWalletButton } from "@/components/vault/connect-wallet-button";
import { OrnateButton } from "@/components/vault/ornate-button";
import { SceneStage } from "@/components/vault/scene-stage";
import { useChallenge } from "@/hooks/useChallenge";

export default function LandingPage() {
  const { challenge, isConnected } = useChallenge();

  return (
    <AppShell ambiance="landing">
      <div className="mx-auto flex min-h-screen w-full items-center px-4 py-6 lg:px-8">
        <SceneStage
          src="/references/landing-reference.png"
          alt="The Miser's Vault landing poster"
          priority
        >
          <div className="absolute right-[6%] top-[7%] hidden lg:block">
            <div className="scale-90 origin-top-right">
              <ConnectWalletButton />
            </div>
          </div>

          <div className="absolute left-[51.5%] top-[57.5%] w-[31%] -translate-x-1/2 -translate-y-1/2 lg:w-[24.5%]">
            <Link href="/challenge" className="block">
              <OrnateButton className="w-full text-sm sm:text-lg md:text-[1.7rem]">
                {isConnected ? "Enter (0.001 ETH)" : "Connect To Enter"}
              </OrnateButton>
            </Link>
          </div>

          {challenge ? (
            <div className="absolute bottom-[6%] right-[5%] hidden lg:block">
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
