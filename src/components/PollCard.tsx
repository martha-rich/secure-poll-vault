import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock, Users, TrendingUp } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  percentage?: number;
}

interface PollCardProps {
  question: string;
  options: PollOption[];
  showResults?: boolean;
  totalVotes?: number;
}

const PollCard = ({ question, options, showResults = false, totalVotes = 0 }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
    }
  };

  return (
    <Card className="poll-card">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-foreground">{question}</h3>
          <div className="privacy-badge">
            <Lock size={14} />
          </div>
        </div>

        {!hasVoted && !showResults ? (
          <div className="space-y-4">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-base cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              onClick={handleVote}
              disabled={!selectedOption}
              className="btn-democratic w-full"
            >
              Submit Vote
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{option.text}</span>
                  <span className="text-sm text-muted-foreground">
                    {option.percentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="results-gradient h-2 rounded-full transition-all duration-500"
                    style={{ width: `${option.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{totalVotes.toLocaleString()} votes</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span>Live Results</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PollCard;