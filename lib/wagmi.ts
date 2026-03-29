import { QueryClient } from "@tanstack/react-query";
// @ts-expect-error Internal wagmi connector path keeps the bundle limited to injected wallets.
import { injected } from "../node_modules/@wagmi/core/dist/esm/connectors/injected.js";
import { createConfig, http } from "wagmi";
import { polygon, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia, polygon],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http()
  },
  ssr: true
});

export const queryClient = new QueryClient();
