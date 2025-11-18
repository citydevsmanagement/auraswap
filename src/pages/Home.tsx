import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Coins } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Swap Tokens
              </span>
              <br />
              <span className="text-foreground">
                Across Multiple Chains
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience seamless token swapping on Ethereum, Polygon, BSC, Arbitrum, and Base.
              Fast, secure, and completely decentralized.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/swap">
              <Button size="lg" className="glow">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/withdraw">
              <Button size="lg" variant="outline" className="glass">
                Withdraw Tokens
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="glass card-shadow p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Execute swaps in seconds with optimized smart contracts
              </p>
            </div>

            <div className="glass card-shadow p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Safe</h3>
              <p className="text-muted-foreground">
                Non-custodial with battle-tested smart contracts
              </p>
            </div>

            <div className="glass card-shadow p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Coins className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Multi-Chain</h3>
              <p className="text-muted-foreground">
                Support for 5+ major blockchain networks
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
