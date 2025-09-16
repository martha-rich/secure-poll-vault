import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSecurePollVault } from '@/hooks/useContract';
import { Vote, Lock } from 'lucide-react';

interface VoteDialogProps {
  pollId: number;
  pollTitle: string;
  options: string[];
  hasVoted: boolean;
  onVoteCast?: () => void;
}

export const VoteDialog = ({ pollId, pollTitle, options, hasVoted, onVoteCast }: VoteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const { vote, isLoading } = useSecurePollVault();

  const handleVote = async () => {
    if (selectedOption === null) return;
    
    try {
      await vote(pollId, selectedOption);
      setOpen(false);
      setSelectedOption(null);
      onVoteCast?.();
    } catch (error) {
      console.error('Failed to cast vote:', error);
    }
  };

  if (hasVoted) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Vote size={16} />
        Already Voted
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Vote size={16} />
          Vote Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock size={20} />
            Cast Your Vote
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h3 className="font-semibold">{pollTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your vote will be encrypted and stored securely on the blockchain
            </p>
          </div>
          
          <div className="space-y-3">
            <Label>Select your choice:</Label>
            <RadioGroup value={selectedOption?.toString()} onValueChange={(value) => setSelectedOption(Number(value))}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleVote} 
              disabled={isLoading || selectedOption === null}
              className="flex items-center gap-2"
            >
              {isLoading ? 'Casting Vote...' : 'Cast Vote'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
