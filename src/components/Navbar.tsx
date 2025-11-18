import { Link } from 'react-router-dom';
import { useState } from 'react';
import { WalletButton } from './wallet/WalletButton';
import { NetworkSwitcher } from './wallet/NetworkSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border/50 glass sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AuraSwap
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/swap" className="text-foreground hover:text-primary transition-colors font-medium">
              Swap
            </Link>
            <Link to="/withdraw" className="text-foreground hover:text-primary transition-colors font-medium">
              Withdraw
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            <NetworkSwitcher />
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/swap" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Swap
              </Link>
              <Link 
                to="/withdraw" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Withdraw
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-border/50">
              <ThemeToggle />
              <NetworkSwitcher />
              <WalletButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
