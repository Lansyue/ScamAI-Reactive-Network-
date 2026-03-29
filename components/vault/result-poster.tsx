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
          : "/references/result-fail-reference.png"
      }
      alt={success ? "Winning result scene" : "Failed result scene"}
      priority
    >
      <div className="absolute right-[4.5%] top-[12%] w-[34%] text-[#5f3813]">
        <div className="rounded-[18px] border border-[#d7b26e]/45 bg-[rgba(255,250,241,0.9)] p-5 text-center">
          <p className="font-display text-2xl lg:text-4xl">
            {success ? "Received 0.005 ETH" : "Attempt Failed"}
          </p>
          <p className="mt-3 text-sm leading-relaxed lg:text-2xl">
            {challenge?.aiResponse ??
              (success
                ? "YES. You may take this sliver, though I resent every coin."
                : "NO. My gold stays with me, and your charm remains insufficient.")}
          </p>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#d7b26e]/45 bg-[rgba(255,250,241,0.88)] p-5">
          <p className="font-display text-xl lg:text-3xl">Transaction Confirmed</p>
          <div className="mt-3 space-y-2 text-xs lg:text-lg">
            <p>Submit: {trimHash(challenge?.txHashes.originSubmit, 10)}</p>
            <p>AI Result: {trimHash(challenge?.txHashes.aiResult, 10)}</p>
            <p>Reactive: {trimHash(challenge?.txHashes.reactive, 10)}</p>
            <p>Destination: {trimHash(challenge?.txHashes.destination, 10)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
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
