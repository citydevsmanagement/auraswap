import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import { useSwap } from '@/hooks/useSwap';
import { Token, getTokensByChain } from '@/lib/tokens';
import { formatUnits } from 'viem';

export function SwapCard() {
  const { address, chain } = useAccount();
  const [tokenIn, setTokenIn] = useState<Token | null>(null);
  const [tokenOut, setTokenOut] = useState<Token | null>(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const { executeSwap, approveToken, isSwapping, isApproving } = useSwap();

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
    // Simple 1:1 estimation - in production, you'd call getAmountsOut
    setAmountOut(value);
  };

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
    <Card className="glass card-shadow p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">Swap Tokens</h2>
      
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

        <Button
          className="w-full glow"
          size="lg"
          onClick={handleSwap}
          disabled={!amountIn || !tokenIn || !tokenOut || isSwapping || isApproving}
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
          ) : (
            'Swap'
          )}
        </Button>
      </div>
    </Card>
  );
}
