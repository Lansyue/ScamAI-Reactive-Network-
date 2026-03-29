"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { ConnectWalletButton } from "@/components/vault/connect-wallet-button";
import { FrameCard } from "@/components/vault/frame-card";
import { OrnateButton } from "@/components/vault/ornate-button";
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
        <div className="grid w-full max-w-[1440px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative min-h-[760px] overflow-hidden rounded-[34px] border border-[#8a6233]/45 bg-[radial-gradient(circle_at_72%_22%,rgba(255,215,120,0.18),transparent_20%),linear-gradient(180deg,rgba(73,47,28,0.92),rgba(27,17,12,0.98))] shadow-panel">
            <Image
              src="/references/challenge-reference.png"
              alt="Grandet counting coins"
              fill
              priority
              className="object-cover object-left"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.16))]" />
          </section>

          <FrameCard parchment className="min-h-[760px] p-6 md:p-8">
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8b6c42]">
                    Challenge Chamber
                  </p>
                  <h1 className="mt-2 font-display text-4xl text-[#5f3813] md:text-5xl">
                    Convince The Miser
                  </h1>
                </div>
                <div className="rounded-2xl border border-[#d7b26e]/60 bg-[#f6e6c1]/90 px-5 py-3 text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8b6c42]">Vault</p>
                  <p className="font-display text-3xl text-[#5f3813]">{vaultBalance} ETH</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#d7b26e]/45 bg-[rgba(255,249,239,0.52)] px-4 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8b6c42]">
                    Wallet Access
                  </p>
                  <p className="mt-1 text-sm text-[#6b4b28] md:text-base">
                    {isDemoMode
                      ? "Demo mode runs without a wallet, but you can still connect MetaMask for the live presentation."
                      : "Connect your wallet on Sepolia to submit the live challenge ticket."}
                  </p>
                </div>
                <ConnectWalletButton />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="challenge-prompt"
                  className="text-xs uppercase tracking-[0.26em] text-[#8b6c42]"
                >
                  Your Plea
                </label>
                <textarea
                  id="challenge-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="What will you say to get my gold?"
                  className="mt-3 min-h-[250px] w-full resize-none rounded-[20px] border border-[#d7b26e]/60 bg-[rgba(255,253,248,0.9)] p-5 text-lg leading-relaxed text-[#4d3118] outline-none transition focus:border-[#c9982e] focus:ring-2 focus:ring-[#d4af37]/25"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <OrnateButton
                  onClick={handleSubmit}
                  disabled={isSubmitPending || !prompt.trim() || (!isDemoMode && !isConnected)}
                  className="min-w-[240px] text-sm lg:text-base"
                >
                  {isSubmitPending ? "Submitting..." : "Submit"}
                </OrnateButton>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-[#d7b26e]/50 bg-[rgba(255,255,255,0.55)] p-5">
                  <p className="font-display text-2xl text-[#5f3813]">Challenge Rules</p>
                  <p className="mt-3 text-lg leading-relaxed text-[#5b3e1e]">
                    Ticket 0.001 ETH on Sepolia. Settlement unlocks after 10 minutes. Success
                    pays 0.005 ETH on Polygon.
                  </p>
                </div>
                <div className="rounded-[22px] border border-[#d7b26e]/50 bg-[rgba(255,255,255,0.42)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-2xl text-[#5f3813]">Status</p>
                    <p className="text-sm text-[#7b5d39]">
                      {isDemoMode
                        ? isConnected
                          ? "Demo mode with wallet connected"
                          : "Demo mode active"
                        : isConnected
                          ? "Live mode ready"
                          : "Waiting for wallet"}
                    </p>
                  </div>
                  <p className="mt-3 text-lg leading-relaxed text-[#5b3e1e]">
                    {prompt || "Write your argument and the ledger preview will update here."}
                  </p>
                  {error ? <p className="mt-3 text-sm text-[#9d3d25]">{error}</p> : null}
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-[#d7b26e]/40 bg-[rgba(255,251,243,0.34)] p-5">
                <p className="font-display text-2xl text-[#5f3813]">Dialogue Ledger</p>
                <div className="mt-4 space-y-4">
                  <div className="max-w-[82%] rounded-[20px] border border-[#d7b26e]/45 bg-[rgba(255,255,255,0.72)] px-4 py-3 text-lg text-[#4d3118]">
                    Speak carefully. I reward only arguments that profit me.
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-[20px] border border-[#d7b26e]/45 bg-[rgba(249,239,222,0.86)] px-4 py-3 text-lg text-[#4d3118]">
                    {prompt || "Your message will appear here."}
                  </div>
                  <div className="max-w-[84%] rounded-[20px] border border-dashed border-[#d7b26e]/45 bg-transparent px-4 py-3 text-lg italic text-[#8b6c42]">
                    AI reply placeholder. The relayer writes the verdict after evaluation.
                  </div>
                </div>
              </div>
            </div>
          </FrameCard>
        </div>
      </div>
    </AppShell>
  );
}
