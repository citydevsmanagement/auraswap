import { http } from 'viem';
import { mainnet, polygon, bsc, arbitrum, base } from 'viem/chains';
import { createConfig } from 'wagmi';
import { coinbaseWallet, walletConnect, injected } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b96556726499ce5777cddeafd41b3f1b';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, bsc, arbitrum, base],
  connectors: [
    coinbaseWallet({
      appName: 'AuraSwap',
      appLogoUrl: 'https://example.com/logo.png',
    }),
    walletConnect({ 
      projectId,
      showQrModal: true,
    }),
    injected(),
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
