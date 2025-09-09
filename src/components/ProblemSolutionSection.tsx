import { CheckCircle, XCircle, Target, Shield, Eye, TrendingUp } from "lucide-react";

const ProblemSolutionSection = () => {
  const oldWayItems = [
    {
      icon: XCircle,
      title: "Keyword Chaos",
      description: "Endless scrolling through irrelevant job listings"
    },
    {
      icon: XCircle,
      title: "The Application Black Box",
      description: "Submit and hope, with no visibility into the process"
    },
    {
      icon: XCircle,
      title: "Potential for Bias",
      description: "Decisions based on incomplete information"
    },
    {
      icon: XCircle,
      title: "No Feedback or Guidance",
      description: "Lost in the application process without direction"
    }
  ];

  const internaiWayItems = [
    {
      icon: Target,
      title: "Semantic Matching",
      description: "Our AI understands the real meaning of your skills",
      highlight: true
    },
    {
      icon: Eye,
      title: "Transparent Tracking",
      description: "See your application status in real-time",
      highlight: true
    },
    {
      icon: Shield,
      title: "Fairness First",
      description: "Your skills are the primary factor, always",
      highlight: true
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Insights",
      description: "Discover what to learn for your dream roles",
      highlight: true
    }
  ];

  return (
    <section className="py-24 bg-background-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
            The Internship Hunt, <span className="text-gradient">Reimagined</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            See how InternAI transforms the traditional internship search into an intelligent, 
            personalized experience that actually works for you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* The Old Way */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">The Old Way</h3>
              <p className="text-foreground-muted">Frustrating and inefficient</p>
            </div>
            
            <div className="space-y-4">
              {oldWayItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-background border border-card-border rounded-lg">
                  <item.icon className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground-muted text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* The InternAI Way */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-2">The InternAI Way</h3>
              <p className="text-foreground-muted">Smart, transparent, and effective</p>
            </div>
            
            <div className="space-y-4">
              {internaiWayItems.map((item, index) => (
                <div key={index} className={`flex items-start gap-4 p-6 rounded-lg transition-smooth hover:shadow-lg ${
                  item.highlight 
                    ? "bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20" 
                    : "bg-background border border-card-border"
                }`}>
                  <item.icon className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground-muted text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;