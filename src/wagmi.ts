import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { arbitrum, bsc, bscTestnet, goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NODE_ENV === "development" ? [goerli] : []),
    bsc,
    bscTestnet,
    arbitrum,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My wagmi + RainbowKit App",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };
