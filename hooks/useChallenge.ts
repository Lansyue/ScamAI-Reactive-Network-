"use client";

import {
  decodeEventLog,
  formatEther,
  parseEther,
  type Address,
  type Hex,
  zeroHash
} from "viem";
import {
  useAccount,
  useConnect,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWriteContract
} from "wagmi";
import { polygon, sepolia } from "wagmi/chains";
import { useCallback, useEffect, useMemo, useState } from "react";

import { destinationAbi } from "@/lib/abis/destination";
import { originAbi } from "@/lib/abis/origin";

export interface Challenge {
  id: Hex;
  prompt: string;
  aiResponse?: string;
  success: boolean;
  status: "idle" | "pending" | "ai_submitted" | "completed";
  createdAt: number;
  expiresAt: number;
  vaultBalance?: string;
  txHashes: {
    originSubmit?: string;
    aiResult?: string;
    reactive?: string;
    destination?: string;
  };
}

interface SubmitChallengeResult {
  ok: boolean;
  error?: string;
}

const STORAGE_KEY = "misers-vault.challenge";
const TEN_MINUTES = 10 * 60 * 1000;

const originAddress = process.env.NEXT_PUBLIC_ORIGIN_CONTRACT as Address | undefined;
const destinationAddress = process.env
  .NEXT_PUBLIC_DESTINATION_CONTRACT as Address | undefined;

function readStoredChallenge(): Challenge | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Challenge) : null;
  } catch {
    return null;
  }
}

function createMockHash(prefix: string) {
  const random = Math.random().toString(16).slice(2).padEnd(60, "0");
  return `0x${prefix}${random}`.slice(0, 66);
}

export function useChallenge() {
  const { address, chainId, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { connect, connectors } = useConnect();
  const publicClient = usePublicClient({ chainId: sepolia.id });
  const polygonClient = usePublicClient({ chainId: polygon.id });
  const { writeContractAsync, isPending: isWritePending } = useWriteContract();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasContracts = Boolean(originAddress && destinationAddress);
  const isDemoMode = !hasContracts;

  const {
    data: vaultBalanceData,
    refetch: refetchVaultBalance,
    isFetching: isVaultLoading
  } = useReadContract({
    abi: originAbi,
    address: undefined,
    functionName: "canSettle",
    args: [challenge?.id ?? zeroHash],
    query: { enabled: false }
  });

  useEffect(() => {
    setChallenge(readStoredChallenge());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (challenge) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(challenge));
    }
  }, [challenge]);

  const currentStep = useMemo(() => {
    if (!challenge) return 1;
    if (challenge.status === "completed") return 4;
    if (challenge.status === "ai_submitted") return 3;
    if (challenge.status === "pending") return 2;
    return 1;
  }, [challenge]);

  const connectWallet = useCallback(async () => {
    const injectedConnector = connectors.find((connector) => connector.type === "injected");
    if (!injectedConnector) return;
    await connect({ connector: injectedConnector });
  }, [connect, connectors]);

  const refreshVaultBalance = useCallback(async () => {
    if (isDemoMode) {
      setChallenge((current) =>
        current
          ? {
              ...current,
              vaultBalance: "0.847"
            }
          : current
      );
      return "0.847";
    }

    if (!originAddress || !publicClient) return;

    const balance = await publicClient.getBalance({ address: originAddress });
    const formatted = Number(formatEther(balance)).toFixed(3);
    setChallenge((current) =>
      current
        ? {
            ...current,
            vaultBalance: formatted
          }
        : current
    );
    return formatted;
  }, [isDemoMode, publicClient]);

  const submitChallenge = useCallback(
    async (prompt: string): Promise<SubmitChallengeResult> => {
      setError(null);

      if (!prompt.trim()) {
        const message = "Prompt cannot be empty.";
        setError(message);
        return { ok: false, error: message };
      }

      if (!isConnected || !address) {
        const message = "Connect your wallet before entering the vault.";
        setError(message);
        return { ok: false, error: message };
      }

      try {
        if (chainId !== sepolia.id) {
          await switchChainAsync({ chainId: sepolia.id });
        }

        const createdAt = Date.now();

        if (isDemoMode) {
          const mockChallenge: Challenge = {
            id: createMockHash("cafe") as Hex,
            prompt,
            success: false,
            status: "pending",
            createdAt,
            expiresAt: createdAt + TEN_MINUTES,
            vaultBalance: "0.847",
            txHashes: {
              originSubmit: createMockHash("a1")
            }
          };

          setChallenge(mockChallenge);
          return { ok: true };
        }

        if (!originAddress) {
          throw new Error("Missing NEXT_PUBLIC_ORIGIN_CONTRACT");
        }

        const hash = await writeContractAsync({
          abi: originAbi,
          address: originAddress,
          functionName: "submitChallenge",
          args: [prompt],
          value: parseEther("0.001"),
          chainId: sepolia.id
        });

        const receipt = await publicClient?.waitForTransactionReceipt({ hash });
        const submitLog = receipt?.logs.find((log) => log.address === originAddress);

        let challengeId: Hex = zeroHash;
        if (submitLog) {
          const decoded = decodeEventLog({
            abi: originAbi,
            data: submitLog.data,
            topics: submitLog.topics
          });
          if (decoded.eventName === "ChallengeSubmitted") {
            challengeId = decoded.args.id;
          }
        }

        setChallenge({
          id: challengeId,
          prompt,
          success: false,
          status: "pending",
          createdAt,
          expiresAt: createdAt + TEN_MINUTES,
          txHashes: { originSubmit: hash }
        });

        return { ok: true };
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : "Unable to submit challenge.";
        setError(message);
        return { ok: false, error: message };
      }
    },
    [
      address,
      chainId,
      isConnected,
      isDemoMode,
      publicClient,
      switchChainAsync,
      writeContractAsync
    ]
  );

  const pollChallenge = useCallback(async () => {
    if (!challenge) return;
    setIsPolling(true);

    try {
      if (isDemoMode) {
        const elapsed = Date.now() - challenge.createdAt;
        setChallenge((current) => {
          if (!current) return current;
          if (elapsed > 15000 && current.status !== "completed") {
            const success = current.prompt.toLowerCase().includes("profit");
            return {
              ...current,
              success,
              status: "completed",
              aiResponse: success
                ? "YES. You may keep a sliver, if your cunning truly multiplies my fortune."
                : "NO. My coins remain mine, and your silver tongue is worth less than dust.",
              txHashes: {
                ...current.txHashes,
                aiResult: createMockHash("b2"),
                reactive: createMockHash("c3"),
                destination: success ? createMockHash("d4") : undefined
              }
            };
          }

          if (elapsed > 7000 && current.status === "pending") {
            return {
              ...current,
              status: "ai_submitted",
              aiResponse:
                "Review complete. The miser is weighing every syllable against the price of gold.",
              txHashes: {
                ...current.txHashes,
                aiResult: createMockHash("b2")
              }
            };
          }

          return current;
        });
        return;
      }

      if (!publicClient || !originAddress || !challenge.id || !address) return;

      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock > 10_000n ? currentBlock - 10_000n : 0n;

      const aiLogs = await publicClient.getLogs({
        address: originAddress,
        event: originAbi[3],
        fromBlock,
        toBlock: "latest",
        args: { id: challenge.id, player: address }
      });

      const rewardLogs =
        polygonClient && destinationAddress
          ? await polygonClient.getLogs({
              address: destinationAddress,
              event: destinationAbi[0],
              fromBlock: 0n,
              toBlock: "latest",
              args: { challengeId: challenge.id, player: address }
            })
          : [];

      const canSettle =
        challenge.status !== "completed"
          ? await publicClient.readContract({
              abi: originAbi,
              address: originAddress,
              functionName: "canSettle",
              args: [challenge.id]
            })
          : false;

      setChallenge((current) => {
        if (!current) return current;

        const aiLog = aiLogs.at(-1);
        const rewardLog = rewardLogs.at(-1);
        const success = aiLog?.args.success ?? current.success;

        return {
          ...current,
          success,
          aiResponse:
            aiLog?.args.aiResponse ??
            current.aiResponse ??
            "The judge has delivered a sealed response.",
          status: rewardLog ? "completed" : aiLog ? "ai_submitted" : current.status,
          txHashes: {
            ...current.txHashes,
            aiResult: aiLog?.transactionHash ?? current.txHashes.aiResult,
            reactive:
              current.txHashes.reactive ??
              (canSettle && aiLog ? aiLog.transactionHash : current.txHashes.reactive),
            destination: rewardLog?.transactionHash ?? current.txHashes.destination
          }
        };
      });
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Unable to refresh challenge state.";
      setError(message);
    } finally {
      setIsPolling(false);
    }
  }, [address, challenge, isDemoMode, polygonClient, publicClient]);

  useEffect(() => {
    if (!challenge || challenge.status === "completed") return;

    void pollChallenge();
    const timer = window.setInterval(() => {
      void pollChallenge();
    }, 8000);

    return () => window.clearInterval(timer);
  }, [challenge, pollChallenge]);

  const resetChallenge = useCallback(() => {
    setChallenge(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    address,
    challenge,
    currentStep,
    error,
    hasContracts,
    isConnected,
    isDemoMode,
    isPolling,
    isSubmitPending: isWritePending,
    isVaultLoading: isVaultLoading || Boolean(vaultBalanceData && refetchVaultBalance),
    connectWallet,
    refreshVaultBalance,
    resetChallenge,
    submitChallenge
  };
}
