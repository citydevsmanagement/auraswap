import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Network } from 'lucide-react';
import { SUPPORTED_CHAINS } from '@/lib/config';

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass">
          <Network className="mr-2 h-4 w-4" />
          {chain?.name || 'Select Network'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {SUPPORTED_CHAINS.map((supportedChain) => (
          <DropdownMenuItem
            key={supportedChain.id}
            onClick={() => switchChain({ chainId: supportedChain.id })}
            disabled={chain?.id === supportedChain.id}
          >
            {supportedChain.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
