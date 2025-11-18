import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { TokenSelector } from '../swap/TokenSelector';
import { useWithdraw } from '@/hooks/useWithdraw';
import { Token, getTokensByChain } from '@/lib/tokens';
import { formatUnits, isAddress } from 'viem';
import { toast } from 'sonner';

export function WithdrawCard() {
  const { address, chain } = useAccount();
  const [token, setToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { withdrawToken, isWithdrawing } = useWithdraw();

  const { data: balance } = useBalance({
    address,
    token: token?.address === '0x0000000000000000000000000000000000000000' 
      ? undefined 
      : token?.address,
  });

  useEffect(() => {
    if (chain) {
      const tokens = getTokensByChain(chain.id);
      if (tokens.length > 0) {
        setToken(tokens[0]);
      }
    }
  }, [chain]);

  const handleWithdraw = async () => {
    if (!token || !amount || !recipient) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isAddress(recipient)) {
      toast.error('Invalid recipient address');
      return;
    }

    if (token.address === '0x0000000000000000000000000000000000000000') {
      toast.error('Cannot withdraw native token using this method. Use your wallet directly.');
      return;
    }

    await withdrawToken(token.address, recipient as `0x${string}`, amount, token.decimals);
    
    // Reset form on success
    setAmount('');
    setRecipient('');
  };

  const handleMaxClick = () => {
    if (balance) {
      const maxAmount = formatUnits(balance.value, balance.decimals);
      setAmount(maxAmount);
    }
  };

  if (!address) {
    return (
      <Card className="glass card-shadow p-8 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to withdraw tokens
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass card-shadow p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">Withdraw Tokens</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Token</Label>
          <TokenSelector
            selectedToken={token}
            onSelect={setToken}
            availableTokens={chain ? getTokensByChain(chain.id).filter(t => t.address !== '0x0000000000000000000000000000000000000000') : []}
          />
          <div className="text-sm text-muted-foreground">
            Balance: {balance ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4) : '0.00'} {token?.symbol}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass pr-16"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMaxClick}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2"
            >
              MAX
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Recipient Address</Label>
          <Input
            type="text"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="glass font-mono"
          />
        </div>

        <Button
          className="w-full glow"
          size="lg"
          onClick={handleWithdraw}
          disabled={!amount || !recipient || !token || isWithdrawing}
        >
          {isWithdrawing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Tokens
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
