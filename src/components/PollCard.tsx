import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { VoteDialog } from "./VoteDialog";
import { usePollData } from "@/hooks/useContract";

interface PollOption {
  id: string;
  text: string;
  percentage?: number;
}

interface PollCardProps {
  pollId: number;
  question: string;
  options: PollOption[];
  showResults?: boolean;
  totalVotes?: number;
  isActive?: boolean;
  endTime?: number;
}

const PollCard = ({ pollId, question, options, showResults = false, totalVotes = 0, isActive = true, endTime }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { pollInfo, hasVoted, isLoading } = usePollData(pollId);

  const isExpired = endTime ? Date.now() / 1000 > endTime : false;
  const canVote = isActive && !isExpired && !hasVoted;

  return (
    <Card className="poll-card">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{question}</h3>
            <div className="flex items-center gap-2 mt-1">
              {isActive && !isExpired ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={14} />
                  <span className="text-xs">Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} />
                  <span className="text-xs">Ended</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-blue-600">
                <Lock size={14} />
                <span className="text-xs">Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {canVote ? (
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Your vote will be encrypted using FHE technology and stored securely on the blockchain.
              </p>
            </div>
            
            <VoteDialog
              pollId={pollId}
              pollTitle={question}
              options={options.map(opt => opt.text)}
              hasVoted={!!hasVoted}
              onVoteCast={() => window.location.reload()}
            />
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