import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  DynamicContextProvider,
  DynamicWagmiConnector,
  EthersExtension,
  EthereumWalletConnectors,
  StarknetWalletConnectors,
  SolanaWalletConnectors,
  BitcoinWalletConnectors,
  ZeroDevSmartWalletConnectors,
} from "@/lib/dynamic";

import { AvocadoProvider } from "@/services/lazyAvocadoProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <DynamicContextProvider
          settings={{
            environmentId: "c3aa3bb7-b2fd-44f6-bb3e-be6327f9bb1c",
            walletConnectors: [
              EthereumWalletConnectors,
              SolanaWalletConnectors,
              BitcoinWalletConnectors,
              StarknetWalletConnectors,
              ZeroDevSmartWalletConnectors,
            ],
            evmNetworks: [
              {
                blockExplorerUrls: ["https://etherscan.io/"],
                chainId: 634,
                name: "Avocado Mainnet",
                iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
                nativeCurrency: { decimals: 18, name: "usdc", symbol: "USDC" },
                networkId: 634,
                rpcUrls: ["https://rpc.avocado.instadapp.io"],
                vanityName: "Avocado",
              },
            ],
            walletConnectorExtensions: [EthersExtension],
          }}
        >
          <DynamicWagmiConnector>
            <AvocadoProvider>
            {children}
            </AvocadoProvider>
          </DynamicWagmiConnector>
        </DynamicContextProvider>
        
      </body>
    </html>
  );
}
