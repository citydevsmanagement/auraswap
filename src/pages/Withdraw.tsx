import { WithdrawCard } from '@/components/withdraw/WithdrawCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Withdraw() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <WithdrawCard />
      </main>

      <Footer />
    </div>
  );
}
