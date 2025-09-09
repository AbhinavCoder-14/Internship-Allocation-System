import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Code, Database, Globe, Zap } from "lucide-react";

const AIDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const resetDemo = () => {
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
            See Our AI <span className="text-gradient">in Action</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Watch how our advanced AI understands and analyzes your resume to extract 
            meaningful skills and insights that traditional keyword matching misses.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                How Our AI Understands Your Resume
              </h3>
              
              <div className="bg-background-subtle border border-card-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Code className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground-muted">Resume Extract</span>
                </div>
                
                <div className="bg-background border border-card-border rounded-md p-4 font-mono text-sm">
                  <p className="text-foreground">
                    "…developed a full-stack e-commerce web application using{" "}
                    <span className="text-brand-primary font-semibold">Flask</span> and{" "}
                    <span className="text-brand-primary font-semibold">SQL</span> to manage 
                    product inventory and user orders."
                  </p>
                </div>
              </div>

              <Button 
                onClick={showResults ? resetDemo : handleAnalyze}
                variant={showResults ? "outline" : "hero"}
                size="lg"
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-5 h-5 animate-pulse" />
                    AI Analyzing...
                  </>
                ) : showResults ? (
                  <>Reset Demo</>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Let Our AI Analyze
                  </>
                )}
              </Button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                AI Analysis Results
              </h3>
              
              <div className={`transition-smooth ${
                showResults ? "opacity-100 transform translate-y-0" : "opacity-30 transform translate-y-4"
              }`}>
                {/* Extracted Skills */}
                <div className="bg-background-subtle border border-card-border rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-sm font-medium text-foreground-muted">Extracted Skills</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Flask", "SQL"].map((skill, index) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full transition-smooth ${
                          showResults ? "opacity-100 transform scale-100" : "opacity-0 transform scale-95"
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inferred Concepts */}
                <div className="bg-background-subtle border border-card-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground-muted">Inferred Concepts</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "Backend Development", icon: Database },
                      { text: "API Design", icon: Globe },
                      { text: "Database Management", icon: Database },
                      { text: "E-commerce Systems", icon: Globe }
                    ].map((concept, index) => (
                      <span 
                        key={concept.text}
                        className={`inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-medium rounded-full transition-smooth ${
                          showResults ? "opacity-100 transform scale-100" : "opacity-0 transform scale-95"
                        }`}
                        style={{ transitionDelay: `${(index + 3) * 200}ms` }}
                      >
                        <concept.icon className="w-3 h-3" />
                        {concept.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;