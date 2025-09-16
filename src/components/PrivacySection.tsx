import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Database } from "lucide-react";

const PrivacySection = () => {
  const privacyFeatures = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your individual responses are encrypted before transmission and remain private throughout the entire process."
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Architecture",
      description: "We can verify poll participation without ever seeing your actual responses or personal data."
    },
    {
      icon: Eye,
      title: "Anonymous Aggregation",
      description: "Results are compiled using cryptographic techniques that preserve individual privacy while revealing collective insights."
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "All data is stored with military-grade encryption and automatically purged after analysis completion."
    }
  ];

  return (
    <section id="privacy" className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Privacy First Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is not just protected—it's mathematically guaranteed. 
            Our cryptographic approach ensures individual responses remain confidential 
            while enabling meaningful democratic insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {privacyFeatures.map((feature, index) => (
            <Card key={index} className="poll-card text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--democratic-blue))] to-[hsl(var(--privacy-accent))] rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--privacy-accent))] text-white px-6 py-3 rounded-full font-semibold">
            <Shield size={20} />
            <span>Cryptographically Verified Privacy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;