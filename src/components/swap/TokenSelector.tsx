import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Token } from '@/lib/tokens';

interface TokenSelectorProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  availableTokens: Token[];
}

export function TokenSelector({ selectedToken, onSelect, availableTokens }: TokenSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass">
          {selectedToken ? (
            <>
              <span className="font-semibold">{selectedToken.symbol}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Select Token
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {availableTokens.map((token) => (
          <DropdownMenuItem
            key={token.address}
            onClick={() => onSelect(token)}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{token.symbol}</span>
              <span className="text-xs text-muted-foreground">{token.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
