import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines"; // 1. Import the new component
import Link from "next/link";

import "../app/index.css"
import "../app/globals.css"

const HeroSection = () => {
  return (
    // 2. Use BackgroundLines as the main container for the section
    <BackgroundLines className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* The content now sits inside BackgroundLines and is automatically centered */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-subtle border border-card-border rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-foreground-muted">
              Powered by Advanced AI Technology
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight text-foreground">
            The Right Internship{" "}
            <span className="text-gradient">Finds You</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl lg:text-xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Tired of endlessly scrolling through irrelevant listings? Our intelligent engine 
            analyzes your unique skills and projects to bring you a shortlist of opportunities 
            where you'll actually thrive.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard/student">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-auto min-w-[280px] bg-brand-primary hover:bg-brand-primary/90 text-white bg-blue-500"
              >
                Find My Perfect Internship
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/dashboard/recruiter">
               <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto min-w-[240px]"
              >
                Hire Verified Talent
              </Button>
            </Link>
          </div>
          
          {/* Trust Signal */}
          <div className="text-foreground-subtle">
            <p className="text-sm font-medium">
              Trusted by students from IITs, NITs, and 300+ top universities across India
            </p>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default HeroSection;