import { cookieStorage, createStorage } from 'wagmi';
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from '@reown/appkit/networks'; 


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined in .env.local');
}

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
  ssr: true,
  connectors: [],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId,
  metadata: {
    name: "Stack Game",
    description: "Based Stacks DOT Game",
    url: "https://stacksdot.app",
    icons: ["https://stacksdot.app/logo.png"],
  },
  features: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    history: false,
    send: true,
  },
  themeMode: "dark",
});


export const config = wagmiAdapter.wagmiConfig;