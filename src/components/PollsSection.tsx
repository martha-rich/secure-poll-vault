import PollCard from "./PollCard";

const PollsSection = () => {
  const samplePolls = [
    {
      question: "Which policy area should be the top priority for the next administration?",
      options: [
        { id: "economy", text: "Economic Recovery & Job Creation" },
        { id: "healthcare", text: "Healthcare Reform" },
        { id: "climate", text: "Climate Change & Environment" },
        { id: "education", text: "Education & Student Debt" },
      ]
    },
    {
      question: "How do you rate the current state of democratic institutions?",
      options: [
        { id: "excellent", text: "Excellent - Working very well" },
        { id: "good", text: "Good - Some room for improvement" },
        { id: "fair", text: "Fair - Significant issues to address" },
        { id: "poor", text: "Poor - Major reforms needed" },
      ]
    }
  ];

  const sampleResults = {
    question: "What is your primary concern about voting security?",
    options: [
      { id: "privacy", text: "Voter Privacy Protection", percentage: 35 },
      { id: "verification", text: "Vote Verification Systems", percentage: 28 },
      { id: "access", text: "Equal Voting Access", percentage: 22 },
      { id: "transparency", text: "Result Transparency", percentage: 15 },
    ],
    totalVotes: 12847
  };

  return (
    <section id="polls" className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Active Polls
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your voice on critical issues. All responses are encrypted and anonymized 
            before being included in aggregate results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {samplePolls.map((poll, index) => (
            <PollCard
              key={index}
              question={poll.question}
              options={poll.options}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div id="results" className="scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Live Results
            </h3>
            <PollCard
            question={sampleResults.question}
            options={sampleResults.options}
            showResults={true}
            totalVotes={sampleResults.totalVotes}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PollsSection;