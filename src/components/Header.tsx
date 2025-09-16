import { Vote, Lock, Users } from "lucide-react";
import WalletConnect from "./WalletConnect";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Vote className="h-8 w-8 text-primary" />
                <Lock className="h-4 w-4 text-blue-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-primary">SecurePoll</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('polls')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Active Polls
            </button>
            <button 
              onClick={() => scrollToSection('results')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Results
            </button>
            <button 
              onClick={() => scrollToSection('privacy')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </nav>

          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;