import Link from "next/link";

import { Challenge } from "@/hooks/useChallenge";
import { trimHash } from "@/lib/utils";
import { SceneStage } from "@/components/vault/scene-stage";

interface ResultPosterProps {
  challenge: Challenge | null;
}

export function ResultPoster({ challenge }: ResultPosterProps) {
  const success = Boolean(challenge?.success);

  return (
    <SceneStage
      src={
        success
          ? "/references/result-win-reference.png"
          : "/references/result-fail-clean.png"
      }
      alt={success ? "Winning result scene" : "Failed result scene"}
      priority
    >
      <div
        className={
          success
            ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,8,0.08),rgba(18,12,8,0.08)_54%,rgba(18,12,8,0.22))]"
            : "absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,8,0.04),rgba(18,12,8,0.04)_55%,rgba(18,12,8,0.12))]"
        }
      />

      <div className="absolute right-[4.8%] top-[9%] w-[35%] text-[#5f3813]">
        <div className="rounded-[22px] border border-[#d7b26e]/34 bg-[rgba(255,249,239,0.82)] p-5 text-center shadow-[0_18px_34px_rgba(68,38,13,0.14)] backdrop-blur-[1px]">
          <p className="font-display text-xl uppercase tracking-[0.16em] lg:text-3xl">
            {success ? "You Win..." : "Nice Try"}
          </p>
          <p className="mt-3 text-sm leading-relaxed lg:text-xl">
            {challenge?.aiResponse ??
              (success
                ? "YES. You may take this sliver, though I resent every coin."
                : "NO. My gold stays with me, and your charm remains insufficient.")}
          </p>
        </div>

        <div className="mt-4 rounded-[22px] border border-[#d7b26e]/32 bg-[rgba(255,250,241,0.74)] p-5 shadow-[0_18px_34px_rgba(68,38,13,0.12)] backdrop-blur-[1px]">
          <p className="font-display text-xl lg:text-3xl">
            {success ? "Received 0.005 ETH" : "Better Luck Next Time"}
          </p>
          <div className="mt-3 space-y-2 text-xs lg:text-base">
            <p>Submit: {trimHash(challenge?.txHashes.originSubmit, 10)}</p>
            <p>AI Result: {trimHash(challenge?.txHashes.aiResult, 10)}</p>
            <p>Reactive: {trimHash(challenge?.txHashes.reactive, 10)}</p>
            <p>Destination: {trimHash(challenge?.txHashes.destination, 10)}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href="/challenge"
            className="rounded-full border border-[#c9982e]/70 bg-[#e4c35f]/85 px-5 py-3 font-display text-xs uppercase tracking-[0.18em] text-[#5f3813] lg:text-sm"
          >
            {success ? "Play Again" : "Try Again"}
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#d7b26e]/45 bg-black/20 px-5 py-3 font-display text-xs uppercase tracking-[0.18em] text-[#fff2c7] lg:text-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </SceneStage>
  );
}
