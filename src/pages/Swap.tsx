import { SwapCard } from '@/components/swap/SwapCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Swap() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <SwapCard />
      </main>

      <Footer />
    </div>
  );
}
