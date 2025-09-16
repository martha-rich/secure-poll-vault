import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSecurePollVault } from '@/hooks/useContract';
import { Plus, Clock, Hash } from 'lucide-react';

interface CreatePollDialogProps {
  onPollCreated?: () => void;
}

export const CreatePollDialog = ({ onPollCreated }: CreatePollDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(7); // days
  const [optionCount, setOptionCount] = useState(2);
  
  const { createPoll, isLoading } = useSecurePollVault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      return;
    }

    const durationInSeconds = duration * 24 * 60 * 60; // Convert days to seconds
    
    try {
      await createPoll(title, description, durationInSeconds, optionCount);
      setOpen(false);
      setTitle('');
      setDescription('');
      setDuration(7);
      setOptionCount(2);
      onPollCreated?.();
    } catch (error) {
      console.error('Failed to create poll:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Create New Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash size={20} />
            Create Secure Poll
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter poll title..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your poll..."
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-1">
                <Clock size={16} />
                Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="365"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="options">Options Count</Label>
              <Input
                id="options"
                type="number"
                min="2"
                max="10"
                value={optionCount}
                onChange={(e) => setOptionCount(Number(e.target.value))}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
