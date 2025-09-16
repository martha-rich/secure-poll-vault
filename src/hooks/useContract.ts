import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES, SECURE_POLL_VAULT_ABI } from '@/lib/contracts';
import { useState } from 'react';
import { toast } from 'sonner';

export const useSecurePollVault = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  const createPoll = async (title: string, description: string, duration: number, optionCount: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
        abi: SECURE_POLL_VAULT_ABI,
        functionName: 'createPoll',
        args: [title, description, duration, optionCount],
      });
      
      toast.success('Poll created successfully!');
      return hash;
    } catch (err) {
      console.error('Error creating poll:', err);
      toast.error('Failed to create poll');
    } finally {
      setIsLoading(false);
    }
  };

  const vote = async (pollId: number, choice: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // In a real FHE implementation, the choice would be encrypted
      // For now, we'll simulate the encrypted vote
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
        abi: SECURE_POLL_VAULT_ABI,
        functionName: 'vote',
        args: [BigInt(pollId), choice],
      });
      
      toast.success('Vote cast successfully!');
      return hash;
    } catch (err) {
      console.error('Error voting:', err);
      toast.error('Failed to cast vote');
    } finally {
      setIsLoading(false);
    }
  };

  const endPoll = async (pollId: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
        abi: SECURE_POLL_VAULT_ABI,
        functionName: 'endPoll',
        args: [BigInt(pollId)],
      });
      
      toast.success('Poll ended successfully!');
      return hash;
    } catch (err) {
      console.error('Error ending poll:', err);
      toast.error('Failed to end poll');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPoll,
    vote,
    endPoll,
    isLoading: isLoading || isPending,
    error,
  };
};

export const usePollData = (pollId: number) => {
  const { data: pollInfo, isLoading: isLoadingInfo } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'getPollInfo',
    args: [BigInt(pollId)],
  });

  const { data: pollResults, isLoading: isLoadingResults } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'getPollResults',
    args: [BigInt(pollId)],
  });

  const { data: hasVoted } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'hasVoted',
    args: [BigInt(pollId), address],
  });

  return {
    pollInfo,
    pollResults,
    hasVoted,
    isLoading: isLoadingInfo || isLoadingResults,
  };
};
