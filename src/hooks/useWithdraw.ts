import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { toast } from 'sonner';

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export function useWithdraw() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const withdrawToken = (
    tokenAddress: `0x${string}`,
    recipientAddress: `0x${string}`,
    amount: string,
    decimals: number
  ) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      const amountWei = parseUnits(amount, decimals);

      writeContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipientAddress, amountWei],
      } as any);

      toast.success('Withdrawal initiated!');
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      toast.error(error?.message || 'Failed to withdraw token');
    }
  };

  return {
    withdrawToken,
    isWithdrawing: isPending || isConfirming,
    isSuccess,
    hash,
  };
}
