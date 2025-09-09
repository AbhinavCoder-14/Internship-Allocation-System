import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      Background
      <div className="absolute inset-0">
        <img 
          src={heroImage.src}
          alt="AI Technology Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>
      
      {/* Content */}
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
          <h1 className="text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            The Right Internship{" "}
            <span className="text-gradient">Finds You</span>
            <br />
            <span className="text-2xl lg:text-4xl font-semibold text-foreground-muted">
              Powered by AI
            </span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl lg:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Tired of endlessly scrolling through irrelevant listings? Our intelligent engine 
            analyzes your unique skills and projects to bring you a shortlist of opportunities 
            where you'll actually thrive.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              
              size="lg" 
              className="text-lg px-8 py-4 h-auto min-w-[280px]"
            >
              Find My Perfect Internship
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto min-w-[240px]"
            >
              Hire Verified Talent
            </Button>
          </div>
          
          {/* Trust Signal */}
          <div className="text-foreground-subtle">
            <p className="text-sm font-medium">
              Trusted by students from IITs, NITs, and 300+ top universities across India
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-brand-primary/20 rounded-full blur-xl float-animation" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-brand-accent/20 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
};

export default HeroSection;