import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, Loader2, RefreshCw } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import { useSwap } from '@/hooks/useSwap';
import { Token, getTokensByChain } from '@/lib/tokens';
import { formatUnits } from 'viem';
import { usePrices } from '@/hooks/usePrices';
import { toast } from 'sonner';

export function SwapCard() {
  const { address, chain } = useAccount();
  const [tokenIn, setTokenIn] = useState<Token | null>(null);
  const [tokenOut, setTokenOut] = useState<Token | null>(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [slippage] = useState(0.5); // 0.5% slippage tolerance
  const { executeSwap, approveToken, isSwapping, isApproving } = useSwap();

  const availableTokens = chain ? getTokensByChain(chain.id) : [];
  const { prices, loading: pricesLoading, error: pricesError, getTokenPrice, refetch } = usePrices(availableTokens);

  const { data: balanceIn } = useBalance({
    address,
    token: tokenIn?.address === '0x0000000000000000000000000000000000000000' 
      ? undefined 
      : tokenIn?.address,
  });

  useEffect(() => {
    if (chain) {
      const tokens = getTokensByChain(chain.id);
      if (tokens.length > 0) {
        setTokenIn(tokens[0]);
        setTokenOut(tokens[1] || tokens[0]);
      }
    }
  }, [chain]);

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
  };

  const handleSwap = async () => {
    if (!tokenIn || !tokenOut || !amountIn || !amountOut) {
      return;
    }

    // Check if approval is needed for non-native tokens
    const isNativeIn = tokenIn.address === '0x0000000000000000000000000000000000000000';
    
    if (!isNativeIn) {
      const approved = await approveToken(
        tokenIn.address,
        BigInt(parseFloat(amountIn) * 10 ** tokenIn.decimals)
      );
      if (!approved) return;
    }

    await executeSwap(
      tokenIn.address,
      tokenOut.address,
      amountIn,
      amountOut,
      tokenIn.decimals,
      tokenOut.decimals
    );
  };

  const handleAmountInChange = (value: string) => {
    setAmountIn(value);
    
    if (!value || !tokenIn || !tokenOut) {
      setAmountOut('');
      return;
    }

    // Calculate output based on real prices
    const priceIn = getTokenPrice(tokenIn.coingeckoId);
    const priceOut = getTokenPrice(tokenOut.coingeckoId);

    if (priceIn && priceOut) {
      const valueInUSD = parseFloat(value) * priceIn;
      const estimatedOut = valueInUSD / priceOut;
      const withSlippage = estimatedOut * (1 - slippage / 100);
      setAmountOut(withSlippage.toFixed(6));
    } else {
      setAmountOut('');
      if (!pricesLoading) {
        toast.error('Price data unavailable');
      }
    }
  };

  const priceImpact = (() => {
    if (!amountIn || !tokenIn || !tokenOut) return 0;
    const priceIn = getTokenPrice(tokenIn.coingeckoId);
    const priceOut = getTokenPrice(tokenOut.coingeckoId);
    if (!priceIn || !priceOut) return 0;
    
    // Simple price impact calculation
    const inputValue = parseFloat(amountIn) * priceIn;
    const outputValue = parseFloat(amountOut) * priceOut;
    return inputValue && outputValue ? ((inputValue - outputValue) / inputValue) * 100 : 0;
  })();

  const minReceived = amountOut ? (parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6) : '0';

  if (!address) {
    return (
      <Card className="glass card-shadow p-8 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to start swapping tokens
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass card-shadow p-4 sm:p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Swap Tokens</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={refetch}
          disabled={pricesLoading}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${pricesLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {pricesError && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {pricesError}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">From</span>
            <span className="text-muted-foreground">
              Balance: {balanceIn ? parseFloat(formatUnits(balanceIn.value, balanceIn.decimals)).toFixed(4) : '0.00'}
            </span>
          </div>
          <div className="glass p-4 rounded-lg space-y-2">
            <Input
              type="number"
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => handleAmountInChange(e.target.value)}
              className="bg-transparent border-0 text-2xl p-0 h-auto focus-visible:ring-0"
            />
            <TokenSelector
              selectedToken={tokenIn}
              onSelect={setTokenIn}
              availableTokens={chain ? getTokensByChain(chain.id) : []}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapTokens}
            className="rounded-full glass"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">To</span>
            <span className="text-muted-foreground">Estimated</span>
          </div>
          <div className="glass p-4 rounded-lg space-y-2">
            <Input
              type="number"
              placeholder="0.0"
              value={amountOut}
              readOnly
              className="bg-transparent border-0 text-2xl p-0 h-auto focus-visible:ring-0"
            />
            <TokenSelector
              selectedToken={tokenOut}
              onSelect={setTokenOut}
              availableTokens={chain ? getTokensByChain(chain.id) : []}
            />
          </div>
        </div>

        {amountIn && amountOut && tokenIn && tokenOut && (
          <div className="glass p-3 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>1 {tokenIn.symbol} ≈ {(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)} {tokenOut.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minimum Received</span>
              <span>{minReceived} {tokenOut.symbol}</span>
            </div>
            {priceImpact > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={priceImpact > 5 ? 'text-destructive' : 'text-primary'}>
                  {priceImpact.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full glow"
          size="lg"
          onClick={handleSwap}
          disabled={!amountIn || !tokenIn || !tokenOut || isSwapping || isApproving || pricesLoading || !amountOut}
        >
          {isApproving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Approving...
            </>
          ) : isSwapping ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : pricesLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Prices...
            </>
          ) : (
            'Swap'
          )}
        </Button>
      </div>
    </Card>
  );
}
