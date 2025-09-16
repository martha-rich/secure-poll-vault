import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES, SECURE_POLL_VAULT_ABI, isContractDeployed } from '@/lib/contracts';
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

    if (!isContractDeployed()) {
      toast.error('Contract not deployed yet. This is a demo mode.');
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
      toast.error('Failed to create poll. Please check your wallet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const vote = async (pollId: number, choice: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isContractDeployed()) {
      toast.error('Contract not deployed yet. This is a demo mode.');
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
      toast.error('Failed to cast vote. Please check your wallet connection.');
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
  const { address } = useAccount();
  
  const { data: pollInfo, isLoading: isLoadingInfo, error: pollInfoError } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'getPollInfo',
    args: [BigInt(pollId)],
    query: {
      enabled: isContractDeployed() && pollId > 0,
    },
  });

  const { data: pollResults, isLoading: isLoadingResults, error: pollResultsError } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'getPollResults',
    args: [BigInt(pollId)],
    query: {
      enabled: isContractDeployed() && pollId > 0,
    },
  });

  const { data: hasVoted, error: hasVotedError } = useReadContract({
    address: CONTRACT_ADDRESSES.SECURE_POLL_VAULT,
    abi: SECURE_POLL_VAULT_ABI,
    functionName: 'hasVoted',
    args: [BigInt(pollId), address],
    query: {
      enabled: !!address && isContractDeployed() && pollId > 0,
    },
  });

  return {
    pollInfo,
    pollResults,
    hasVoted: hasVoted || false,
    isLoading: isLoadingInfo || isLoadingResults,
    error: pollInfoError || pollResultsError || hasVotedError,
  };
};
