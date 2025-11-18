import { useState, useEffect, useCallback } from 'react';
import { Token } from '@/lib/tokens';

interface PriceData {
  [coingeckoId: string]: {
    usd: number;
  };
}

export function usePrices(tokens: Token[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    const coingeckoIds = tokens
      .filter(t => t.coingeckoId)
      .map(t => t.coingeckoId)
      .filter((id): id is string => !!id);

    if (coingeckoIds.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const ids = coingeckoIds.join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }

      const data: PriceData = await response.json();
      
      const priceMap: Record<string, number> = {};
      Object.entries(data).forEach(([id, priceInfo]) => {
        priceMap[id] = priceInfo.usd;
      });

      setPrices(priceMap);
    } catch (err) {
      setError('Failed to fetch token prices');
      console.error('Price fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [tokens]);

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 15 seconds
    const interval = setInterval(fetchPrices, 15000);
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const getTokenPrice = useCallback((coingeckoId?: string): number => {
    if (!coingeckoId) return 0;
    return prices[coingeckoId] || 0;
  }, [prices]);

  return { prices, loading, error, getTokenPrice, refetch: fetchPrices };
}
