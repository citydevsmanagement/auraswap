import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatUnits } from 'viem';

export function WalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="glass glow">
            <Wallet className="mr-2 h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="text-xs">{chain?.name}</span>
              <span className="font-mono text-sm">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass">
          <DropdownMenuItem disabled>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Balance</span>
              <span className="font-mono">
                {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}` : '0.00'}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => disconnect()}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="glow">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {connectors.map((connector) => (
          <DropdownMenuItem
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
