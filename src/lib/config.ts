import { http } from 'viem';
import { mainnet, polygon, bsc, arbitrum, base } from 'viem/chains';
import { createConfig } from 'wagmi';
import { baseAccount, walletConnect, injected } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b96556726499ce5777cddeafd41b3f1b';

const getCallbackUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://auraswap.lovable.app';
};

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, bsc, arbitrum, base],
  connectors: [
    injected({ shimDisconnect: true }),
    baseAccount({
      appName: 'AuraSwap',
      appLogoUrl: `${getCallbackUrl()}/placeholder.svg`,
      appURI: getCallbackUrl(),
    }),
    walletConnect({ 
      projectId,
      showQrModal: true,
      metadata: {
        name: 'AuraSwap',
        description: 'Decentralized Token Swap Platform',
        url: getCallbackUrl(),
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
