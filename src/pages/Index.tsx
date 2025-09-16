import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PollsSection from "@/components/PollsSection";
import PrivacySection from "@/components/PrivacySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PollsSection />
        <PrivacySection />
      </main>
      
      <footer className="bg-[hsl(var(--democratic-blue))] text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">
            &copy; 2024 VoteSecure. Protecting democracy through privacy.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
