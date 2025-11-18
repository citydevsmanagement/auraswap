import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Token } from '@/lib/tokens';
import { TokenSelectorModal } from './TokenSelectorModal';

interface TokenSelectorProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  availableTokens: Token[];
}

export function TokenSelector({ selectedToken, onSelect, availableTokens }: TokenSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        className="glass w-full justify-between"
        onClick={() => setOpen(true)}
      >
        {selectedToken ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedToken.logoURI}
              alt={selectedToken.symbol}
              className="w-5 h-5 rounded-full"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/20?text=' + selectedToken.symbol.charAt(0);
              }}
            />
            <span className="font-semibold">{selectedToken.symbol}</span>
          </div>
        ) : (
          <span>Select Token</span>
        )}
        <ChevronDown className="h-4 w-4" />
      </Button>

      <TokenSelectorModal
        open={open}
        onOpenChange={setOpen}
        onSelect={onSelect}
        tokens={availableTokens}
        selectedToken={selectedToken}
      />
    </>
  );
}
