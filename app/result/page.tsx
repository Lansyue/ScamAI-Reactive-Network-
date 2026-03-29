"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ResultPoster } from "@/components/vault/result-poster";
import { useChallenge } from "@/hooks/useChallenge";

export default function ResultPage() {
  const { challenge } = useChallenge();

  return (
    <AppShell ambiance="result">
      <div className="mx-auto flex min-h-screen w-full items-center px-6 py-8 lg:px-10">
        <ResultPoster challenge={challenge} />
      </div>
    </AppShell>
  );
}
