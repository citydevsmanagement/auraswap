import { http } from 'viem';
import { mainnet, polygon, bsc, arbitrum, base } from 'viem/chains';
import { createConfig } from 'wagmi';
import { coinbaseWallet, walletConnect, injected } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b96556726499ce5777cddeafd41b3f1b';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, bsc, arbitrum, base],
  connectors: [
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: 'AuraSwap',
      preference: 'all',
    }),
    walletConnect({ 
      projectId,
      showQrModal: true,
      metadata: {
        name: 'AuraSwap',
        description: 'Decentralized Token Swap Platform',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://auraswap.app',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

export const SUPPORTED_CHAINS = [mainnet, polygon, bsc, arbitrum, base];
