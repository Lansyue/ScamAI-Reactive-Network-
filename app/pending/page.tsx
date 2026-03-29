"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { SceneStage } from "@/components/vault/scene-stage";
import { useChallenge } from "@/hooks/useChallenge";
import { formatCountdown, trimHash } from "@/lib/utils";

const TEN_MINUTES = 10 * 60 * 1000;

export default function PendingPage() {
  const { challenge, currentStep, isPolling } = useChallenge();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = useMemo(() => {
    if (!challenge) return TEN_MINUTES;
    return Math.max(0, challenge.expiresAt - now);
  }, [challenge, now]);

  const steps = ["Review", "Approve", "Secure Payment", "Complete"];

  return (
    <AppShell ambiance="pending">
      <div className="mx-auto flex min-h-screen w-full items-center px-4 py-6 lg:px-8">
        <SceneStage src="/references/pending-reference.png" alt="Pending settlement scene">
          <div className="absolute left-[8%] top-[8%] w-[56%]">
            <div className="grid grid-cols-4 items-center gap-3">
              {steps.map((step, index) => {
                const active = index + 1 <= currentStep;
                return (
                  <div key={step} className="text-center text-[#f3ddaa]">
                    <div className="mx-auto h-6 w-6 rounded-full border border-[#f3ddaa] bg-black/15">
                      {active ? <div className="m-1 h-4 rounded-full bg-[#ffe79d]" /> : null}
                    </div>
                    <p className="mt-3 font-display text-xs leading-tight lg:text-lg">
                      Step {index + 1}: {step}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-[-4.65rem] h-1 w-full rounded-full bg-[#d4af37]/55 lg:mt-[-5.5rem]" />
          </div>

          <div className="absolute right-[7%] top-[12%] text-center text-[#fff1c3]">
            <p className="font-display text-3xl lg:text-6xl">{formatCountdown(remaining)}</p>
            <p className="font-display text-lg lg:text-3xl">remaining</p>
          </div>

          <div className="absolute bottom-[18%] left-[4.5%] w-[23%] rounded-[18px] border border-[#d7b26e]/45 bg-[rgba(246,237,219,0.82)] p-4 text-[#4d3118] backdrop-blur-[2px]">
            <p className="font-display text-lg lg:text-2xl">Transaction Status</p>
            <ul className="mt-3 space-y-2 text-xs lg:text-lg">
              <li>Pending: Gold Coin Transfer</li>
              <li>Completed: Ledger Update</li>
              <li>Processing: Interest Calculation</li>
            </ul>
          </div>

          <div className="absolute bottom-[16%] left-[41%] max-w-[18%] rounded-[20px] border border-[#d7b26e]/45 bg-[rgba(255,252,245,0.92)] px-4 py-3 text-center text-[#5f3813]">
            <p className="text-sm italic leading-tight lg:text-2xl">Time is money, you know...</p>
          </div>

          <div className="absolute bottom-[8%] right-[4%] w-[28%] rounded-[20px] border border-[#d7b26e]/35 bg-black/30 p-4 text-[#fff2c7] backdrop-blur-sm">
            <p className="font-display text-lg lg:text-2xl">Hashes</p>
            <div className="mt-3 space-y-2 text-[11px] lg:text-sm">
              <p>Submit: {trimHash(challenge?.txHashes.originSubmit, 10)}</p>
              <p>AI: {trimHash(challenge?.txHashes.aiResult, 10)}</p>
              <p>Reactive: {trimHash(challenge?.txHashes.reactive, 10)}</p>
              <p>Reward: {trimHash(challenge?.txHashes.destination, 10)}</p>
              <p>Status: {challenge?.status ?? "pending"}{isPolling ? " • polling" : ""}</p>
            </div>
            {challenge?.status === "completed" ? (
              <Link
                href="/result"
                className="mt-4 inline-block rounded-full border border-[#f3ddaa]/50 px-4 py-2 font-display text-xs uppercase tracking-[0.2em] lg:text-sm"
              >
                View Result
              </Link>
            ) : null}
          </div>
        </SceneStage>
      </div>
    </AppShell>
  );
}
