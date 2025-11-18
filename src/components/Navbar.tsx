import { Link } from 'react-router-dom';
import { WalletButton } from './wallet/WalletButton';
import { NetworkSwitcher } from './wallet/NetworkSwitcher';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-border/50 glass">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AuraSwap
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/swap" className="text-foreground hover:text-primary transition-colors">
              Swap
            </Link>
            <Link to="/withdraw" className="text-foreground hover:text-primary transition-colors">
              Withdraw
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <NetworkSwitcher />
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
