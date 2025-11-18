import { mainnet, polygon, bsc, arbitrum, base } from 'viem/chains';

export interface Token {
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  coingeckoId?: string;
}

// Expanded token list with icons
export const TOKENS_BY_CHAIN: Record<number, Token[]> = {
  [mainnet.id]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      coingeckoId: 'ethereum',
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
      coingeckoId: 'wrapped-bitcoin',
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
      coingeckoId: 'usd-coin',
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      coingeckoId: 'tether',
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
      coingeckoId: 'dai',
    },
    {
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      symbol: 'LINK',
      name: 'Chainlink',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
      coingeckoId: 'chainlink',
    },
    {
      address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
      symbol: 'SHIB',
      name: 'Shiba Inu',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
      coingeckoId: 'shiba-inu',
    },
    {
      address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
      symbol: 'FRAX',
      name: 'Frax',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png',
      coingeckoId: 'frax',
    },
  ],
  [polygon.id]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'MATIC',
      name: 'Polygon',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
      coingeckoId: 'matic-network',
    },
    {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      name: 'Wrapped ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png',
      coingeckoId: 'weth',
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
      coingeckoId: 'usd-coin',
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      coingeckoId: 'tether',
    },
    {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
      coingeckoId: 'dai',
    },
    {
      address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
      coingeckoId: 'wrapped-bitcoin',
    },
    {
      address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
      symbol: 'LINK',
      name: 'Chainlink',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
      coingeckoId: 'chainlink',
    },
  ],
  [bsc.id]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
      coingeckoId: 'binancecoin',
    },
    {
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      coingeckoId: 'ethereum',
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
      coingeckoId: 'usd-coin',
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      coingeckoId: 'tether',
    },
    {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
      coingeckoId: 'dai',
    },
    {
      address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      symbol: 'BTCB',
      name: 'Bitcoin BEP2',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/14108/small/Binance-bitcoin.png',
      coingeckoId: 'binance-bitcoin',
    },
    {
      address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      symbol: 'LINK',
      name: 'Chainlink',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
      coingeckoId: 'chainlink',
    },
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      name: 'Wrapped BNB',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png',
      coingeckoId: 'wbnb',
    },
    {
      address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
      symbol: 'ADA',
      name: 'Cardano',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
      coingeckoId: 'cardano',
    },
    {
      address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
      symbol: 'XRP',
      name: 'XRP',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
      coingeckoId: 'ripple',
    },
    {
      address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
      symbol: 'DOT',
      name: 'Polkadot',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
      coingeckoId: 'polkadot',
    },
  ],
  [arbitrum.id]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      coingeckoId: 'ethereum',
    },
    {
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
      coingeckoId: 'usd-coin',
    },
    {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      coingeckoId: 'tether',
    },
    {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
      coingeckoId: 'dai',
    },
    {
      address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
      coingeckoId: 'wrapped-bitcoin',
    },
    {
      address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
      symbol: 'LINK',
      name: 'Chainlink',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
      coingeckoId: 'chainlink',
    },
    {
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      symbol: 'ARB',
      name: 'Arbitrum',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
      coingeckoId: 'arbitrum',
    },
  ],
  [base.id]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      coingeckoId: 'ethereum',
    },
    {
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
      coingeckoId: 'usd-coin',
    },
    {
      address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
      coingeckoId: 'dai',
    },
  ],
};

// Uniswap V2 Router addresses by chain
export const ROUTER_ADDRESSES: Record<number, `0x${string}`> = {
  [mainnet.id]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [polygon.id]: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
  [bsc.id]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [arbitrum.id]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [base.id]: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
};

export const getTokensByChain = (chainId: number): Token[] => {
  return TOKENS_BY_CHAIN[chainId] || [];
};

export const getRouterAddress = (chainId: number): `0x${string}` | undefined => {
  return ROUTER_ADDRESSES[chainId];
};
