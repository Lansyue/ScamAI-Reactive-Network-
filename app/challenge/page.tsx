"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { OrnateButton } from "@/components/vault/ornate-button";
import { SceneStage } from "@/components/vault/scene-stage";
import { useChallenge } from "@/hooks/useChallenge";

export default function ChallengePage() {
  const router = useRouter();
  const {
    challenge,
    error,
    isConnected,
    isDemoMode,
    isSubmitPending,
    refreshVaultBalance,
    submitChallenge
  } = useChallenge();
  const [prompt, setPrompt] = useState(challenge?.prompt ?? "");

  useEffect(() => {
    void refreshVaultBalance();
  }, [refreshVaultBalance]);

  const vaultBalance = challenge?.vaultBalance ?? "0.847";

  async function handleSubmit() {
    const result = await submitChallenge(prompt);
    if (result.ok) {
      router.push("/pending");
    }
  }

  return (
    <AppShell ambiance="challenge">
      <div className="mx-auto flex min-h-screen w-full items-center px-4 py-6 lg:px-8">
        <SceneStage src="/references/challenge-reference.png" alt="Challenge scene">
          <div className="absolute right-[1.6%] top-[2.6%] h-[94.2%] w-[49%] p-[3.2%] text-[#5f3813]">
            <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-[#d7b26e]/55 bg-[rgba(247,234,208,0.82)] px-5 py-3 shadow-[0_6px_20px_rgba(176,131,53,0.08)]">
              <span className="text-2xl">🪙</span>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8b6c42]">Vault</p>
                <p className="font-display text-2xl lg:text-3xl">{vaultBalance} ETH</p>
              </div>
            </div>

            <div className="mt-[8.5%] px-[1.8%]">
              <textarea
                id="challenge-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="What will you say to get my gold?"
                className="min-h-[18vh] w-full resize-none rounded-[16px] border border-[#d7b26e]/55 bg-[rgba(255,253,248,0.55)] p-4 text-base leading-relaxed text-[#4d3118] outline-none focus:border-[#c9982e] focus:ring-2 focus:ring-[#d4af37]/20 lg:min-h-[19.5vh] lg:text-xl"
              />
            </div>

            <div className="mt-[3.6%] flex justify-center">
              <OrnateButton
                onClick={handleSubmit}
                disabled={!isConnected || isSubmitPending || !prompt.trim()}
                className="min-w-[34%] text-xs lg:text-base"
              >
                {isSubmitPending ? "Submitting..." : "Submit"}
              </OrnateButton>
            </div>

            <div className="mt-[29%] px-[2%]">
              <div className="rounded-[20px] border border-[#d7b26e]/40 bg-[rgba(255,251,243,0.34)] p-4 text-sm backdrop-blur-[1px] lg:text-base">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-lg">Sepolia challenge • Polygon reward</p>
                  <p className="text-[#7b5d39]">
                    {isDemoMode ? "Demo mode active" : "Live mode ready"}
                  </p>
                </div>
                <p className="mt-2 leading-relaxed text-[#5b3e1e]">
                  Ticket 0.001 ETH, 10 minute delay window, fixed 0.005 ETH reward for success.
                </p>
                <p className="mt-2 truncate text-[#5b3e1e]">
                  {prompt || "Write your argument and the ledger preview will update here."}
                </p>
                {error ? <p className="mt-2 text-[#9d3d25]">{error}</p> : null}
              </div>
            </div>
          </div>
        </SceneStage>
      </div>
    </AppShell>
  );
}
