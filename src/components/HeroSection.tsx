import { Button } from "@/components/ui/button";
import { Shield, Lock, Users, TrendingUp } from "lucide-react";
import civicHero from "@/assets/civic-hero.jpg";

const HeroSection = () => {
  const scrollToPolls = () => {
    document.getElementById('polls')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResults = () => {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--democratic-blue))] via-[hsl(var(--democratic-blue-light))] to-[hsl(var(--privacy-accent))] opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="privacy-badge inline-flex">
                <Shield size={16} />
                <span>End-to-End Encrypted</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Opinion Counts,
                <span className="block text-transparent bg-gradient-to-r from-[hsl(var(--democratic-blue))] to-[hsl(var(--privacy-accent))] bg-clip-text">
                  Data Private
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Participate in confidential political polling where your individual responses stay encrypted, 
                but your voice shapes the democratic conversation through secure aggregate data.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToPolls}
                className="btn-democratic text-lg px-8 py-4"
              >
                Start Polling
              </Button>
              <Button 
                onClick={scrollToResults}
                className="btn-civic-secondary text-lg px-8 py-4"
              >
                View Results
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Private</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">Real-time</div>
                <div className="text-sm text-muted-foreground">Results</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--democratic-blue))] to-[hsl(var(--privacy-accent))] rounded-2xl transform rotate-3 opacity-20" />
            <img 
              src={civicHero} 
              alt="Secure Democratic Polling Platform"
              className="relative z-10 w-full rounded-2xl shadow-[var(--shadow-civic)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;