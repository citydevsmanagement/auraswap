import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { getRouterAddress } from '@/lib/tokens';
import { toast } from 'sonner';

const ERC20_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

const ROUTER_ABI = [
  {
    name: 'swapExactTokensForTokens',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
  },
  {
    name: 'swapExactETHForTokens',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
  },
  {
    name: 'swapExactTokensForETH',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
  },
] as const;

export function useSwap() {
  const { address, chain } = useAccount();
  const { writeContract: writeApprove, data: approveHash, isPending: isApprovePending } = useWriteContract();
  const { writeContract: writeSwap, data: swapHash, isPending: isSwapPending } = useWriteContract();
  const { isLoading: isApproveConfirming } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isSwapConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: swapHash });

  const approveToken = (tokenAddress: `0x${string}`, amount: bigint) => {
    if (!chain || !address) {
      toast.error('Please connect your wallet');
      return false;
    }

    const routerAddress = getRouterAddress(chain.id);
    if (!routerAddress) {
      toast.error('Router not supported on this network');
      return false;
    }

    try {
      writeApprove({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [routerAddress, amount],
      } as any);
      
      toast.success('Token approval initiated');
      return true;
    } catch (error: any) {
      console.error('Approval error:', error);
      toast.error(error?.message || 'Failed to approve token');
      return false;
    }
  };

  const executeSwap = (
    tokenInAddress: `0x${string}`,
    tokenOutAddress: `0x${string}`,
    amountIn: string,
    amountOutMin: string,
    tokenInDecimals: number,
    tokenOutDecimals: number
  ) => {
    if (!address || !chain) {
      toast.error('Please connect your wallet');
      return;
    }

    const routerAddress = getRouterAddress(chain.id);
    if (!routerAddress) {
      toast.error('Router not supported on this network');
      return;
    }

    try {
      const amountInWei = parseUnits(amountIn, tokenInDecimals);
      const amountOutMinWei = parseUnits(amountOutMin, tokenOutDecimals);
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
      const path = [tokenInAddress, tokenOutAddress];

      const isNativeIn = tokenInAddress === '0x0000000000000000000000000000000000000000';
      const isNativeOut = tokenOutAddress === '0x0000000000000000000000000000000000000000';

      if (isNativeIn) {
        writeSwap({
          address: routerAddress,
          abi: ROUTER_ABI,
          functionName: 'swapExactETHForTokens',
          args: [amountOutMinWei, path, address, deadline],
          value: amountInWei,
        } as any);
      } else if (isNativeOut) {
        writeSwap({
          address: routerAddress,
          abi: ROUTER_ABI,
          functionName: 'swapExactTokensForETH',
          args: [amountInWei, amountOutMinWei, path, address, deadline],
        } as any);
      } else {
        writeSwap({
          address: routerAddress,
          abi: ROUTER_ABI,
          functionName: 'swapExactTokensForTokens',
          args: [amountInWei, amountOutMinWei, path, address, deadline],
        } as any);
      }

      toast.success('Swap initiated!');
    } catch (error: any) {
      console.error('Swap error:', error);
      toast.error(error?.message || 'Failed to execute swap');
    }
  };

  return {
    executeSwap,
    approveToken,
    isSwapping: isSwapPending || isSwapConfirming,
    isApproving: isApprovePending || isApproveConfirming,
    isSuccess,
    hash: swapHash,
  };
}
