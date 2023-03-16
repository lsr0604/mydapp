import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  RainbowKitProvider,
  midnightTheme,
  getWalletConnectConnector,
  Wallet,
} from "@rainbow-me/rainbowkit";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { chains, client } from "../wagmi";

export interface MyWalletOptions {
  chains: Chain[];
}

export const rainbow = ({ chains }: MyWalletOptions): Wallet => ({
  id: "my-wallet",
  name: "My Wallet",
  iconUrl: "https://my-image.xyz",
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://my-wallet/android",
    ios: "https://my-wallet/ios",
    qrCode: "https://my-wallet/qr",
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://my-wallet/learn-more",
          steps: [
            {
              description:
                "We recommend putting My Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the My Wallet app",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button",
            },
          ],
        },
      },
    };
  },
});

// function App({ Component, pageProps }: AppProps) {
//   const [mounted, setMounted] = React.useState(false);
//   React.useEffect(() => setMounted(true), []);
//   return (
//     <WagmiConfig client={client}>
//       <SessionProvider refetchInterval={0} session={pageProps.session}>
//         <RainbowKitSiweNextAuthProvider>
//           <RainbowKitProvider chains={chains} theme={midnightTheme()}>
//             <NextHead>
//               <title>My wagmi + RainbowKit App</title>
//             </NextHead>

//             {mounted && <Component {...pageProps} />}
//           </RainbowKitProvider>
//         </RainbowKitSiweNextAuthProvider>
//       </SessionProvider>
//     </WagmiConfig>
//   );
// }

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
          <RainbowKitProvider chains={chains} theme={midnightTheme()}>
            <NextHead>
              <title>My wagmi + RainbowKit App</title>
            </NextHead>

            {mounted && <Component {...pageProps} />}
          </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
