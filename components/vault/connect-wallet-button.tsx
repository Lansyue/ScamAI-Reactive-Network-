"use client";

import { useMemo } from "react";
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

import { OrnateButton } from "@/components/vault/ornate-button";
import { trimHash } from "@/lib/utils";

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const injectedConnector = useMemo(
    () => connectors.find((connector) => connector.type === "injected") ?? connectors[0],
    [connectors]
  );

  const isWrongNetwork = isConnected && chainId !== sepolia.id;

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="rounded-full border border-[#f7dfa2]/35 bg-black/20 px-4 py-1 text-[11px] uppercase tracking-[0.22em] text-[#fff2c7] backdrop-blur-sm">
          {isWrongNetwork ? "Wrong Network" : chainId === sepolia.id ? "Sepolia Ready" : "Wallet Connected"}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {isWrongNetwork ? (
            <OrnateButton
              onClick={() => switchChain?.({ chainId: sepolia.id })}
              disabled={isSwitching}
              className="min-w-[170px]"
            >
              {isSwitching ? "Switching..." : "Switch To Sepolia"}
            </OrnateButton>
          ) : null}
          <OrnateButton onClick={() => disconnect()} className="min-w-[220px]">
            {trimHash(address, 8)}
          </OrnateButton>
        </div>
      </div>
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
