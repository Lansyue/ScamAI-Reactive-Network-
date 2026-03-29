"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { OrnateButton } from "@/components/vault/ornate-button";
import { trimHash } from "@/lib/utils";

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = useMemo(
    () => connectors.find((connector) => connector.type === "injected") ?? connectors[0],
    [connectors]
  );

  if (isConnected && address) {
    return (
      <OrnateButton onClick={() => disconnect()} className="min-w-[220px]">
        {trimHash(address, 8)}
      </OrnateButton>
    );
  }

  return (
    <OrnateButton
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      disabled={!injectedConnector || isPending}
      className="min-w-[220px]"
    >
      {isPending ? "Summoning Wallet" : "Connect Wallet"}
    </OrnateButton>
  );
}
