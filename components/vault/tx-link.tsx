import Link from "next/link";

import { explorerLink, trimHash } from "@/lib/utils";

interface TxLinkProps {
  hash?: string;
  kind: "origin" | "destination";
  label: string;
}

export function TxLink({ hash, kind, label }: TxLinkProps) {
  if (!hash) {
    return (
      <div className="rounded-2xl border border-[#d7b26e]/20 bg-black/10 px-4 py-3">
        <p className="text-xs uppercase tracking-[0.24em] text-vault-blush/70">{label}</p>
        <p className="mt-1 text-sm text-vault-parchment/70">Awaiting confirmation</p>
      </div>
    );
  }

  return (
    <Link
      href={explorerLink(hash, kind)}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-[#d7b26e]/25 bg-black/10 px-4 py-3 transition hover:border-[#f7dfa2]/60 hover:bg-black/20"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-vault-blush/70">{label}</p>
      <p className="mt-1 text-sm text-vault-candle">{trimHash(hash, 10)}</p>
    </Link>
  );
}
