"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { SceneStage } from "@/components/vault/scene-stage";
import { useChallenge } from "@/hooks/useChallenge";
import { formatCountdown, trimHash } from "@/lib/utils";

const TEN_MINUTES = 10 * 60 * 1000;

export default function PendingPage() {
  const router = useRouter();
  const { challenge, currentStep, isPolling } = useChallenge();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (challenge?.status !== "completed") return;

    const timer = window.setTimeout(() => {
      router.push("/result");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [challenge?.status, router]);

  const remaining = useMemo(() => {
    if (!challenge) return TEN_MINUTES;
    return Math.max(0, challenge.expiresAt - now);
  }, [challenge, now]);

  const steps = ["Review", "Approve", "Secure Payment", "Complete"];

  return (
    <AppShell ambiance="pending">
      <div className="mx-auto flex min-h-screen w-full items-center px-4 py-6 lg:px-8">
        <SceneStage src="/references/pending-clean.png" alt="Pending settlement scene">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,10,8,0.03),rgba(16,10,8,0.12)_48%,rgba(16,10,8,0.18))]" />

          <div className="absolute left-[9%] top-[8.5%] w-[56%]">
            <div className="grid grid-cols-4 items-center gap-3">
              {steps.map((step, index) => {
                const active = index + 1 <= currentStep;
                return (
                  <div key={step} className="text-center text-[#f3ddaa]">
                    <div
                      className="mx-auto h-7 w-7 rounded-full border border-[#f3ddaa]/85 bg-transparent shadow-[0_0_12px_rgba(244,221,151,0.18)]"
                      title={`Step ${index + 1}: ${step}`}
                    >
                      {active ? (
                        <div className="m-[3px] h-[18px] rounded-full bg-[#ffe79d] shadow-[0_0_14px_rgba(255,231,157,0.75)]" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,rgba(243,221,170,0.45),rgba(255,231,157,0.95),rgba(243,221,170,0.45))] shadow-[0_0_12px_rgba(255,231,157,0.35)]" />
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[#f7e6ba]">
              {steps.map((step, index) => (
                <p key={step} className="font-display text-[10px] leading-tight lg:text-base">
                  Step {index + 1}
                  <br />
                  {step}
                </p>
              ))}
            </div>
          </div>

          <div className="absolute right-[6.5%] top-[12%] rounded-[22px] border border-[#d7b26e]/30 bg-[rgba(37,23,14,0.16)] px-5 py-4 text-center text-[#fff1c3] backdrop-blur-[1px]">
            <p className="font-display text-3xl lg:text-5xl">{formatCountdown(remaining)}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.28em] lg:text-xs">
              remaining
            </p>
          </div>

          <div className="absolute bottom-[14%] left-[4.5%] w-[24%] rounded-[20px] border border-[#d7b26e]/35 bg-[rgba(249,241,224,0.78)] p-4 text-[#4d3118] shadow-[0_16px_32px_rgba(36,21,9,0.16)] backdrop-blur-[1px]">
            <p className="font-display text-lg lg:text-2xl">Transaction Status</p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed lg:text-base">
              <li>Pending: Origin challenge acknowledged.</li>
              <li>Processing: Reactive callback countdown.</li>
              <li>Ready: Destination reward transfer.</li>
            </ul>
          </div>

          <div className="absolute bottom-[17%] left-[41%] max-w-[20%] rounded-[22px] border border-[#d7b26e]/30 bg-[rgba(255,250,240,0.84)] px-5 py-4 text-center text-[#5f3813] shadow-[0_10px_24px_rgba(66,38,15,0.14)] backdrop-blur-[1px]">
            <p className="text-sm italic leading-tight lg:text-2xl">Time is money, you know...</p>
          </div>

          <div className="absolute bottom-[8%] right-[4.5%] w-[28%] rounded-[22px] border border-[#d7b26e]/30 bg-[rgba(31,19,11,0.34)] p-4 text-[#fff2c7] shadow-[0_18px_36px_rgba(22,12,7,0.22)] backdrop-blur-[3px]">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg lg:text-2xl">Chain Trace</p>
              <p className="text-[10px] uppercase tracking-[0.28em] lg:text-xs">
                {challenge?.status ?? "pending"}
              </p>
            </div>
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed lg:text-sm">
              <p>Submit: {trimHash(challenge?.txHashes.originSubmit, 10)}</p>
              <p>AI: {trimHash(challenge?.txHashes.aiResult, 10)}</p>
              <p>Reactive: {trimHash(challenge?.txHashes.reactive, 10)}</p>
              <p>Reward: {trimHash(challenge?.txHashes.destination, 10)}</p>
              <p>{isPolling ? "Polling latest chain state..." : "Waiting for next update..."}</p>
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
