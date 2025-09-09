import { MapPin, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InternshipCardProps {
  company: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  logo: string;
  rating: number;
  applicants: number;
  skills: string[];
  aiInsight?: {
    studentName: string;
    reasoning: string;
  };
  featured?: boolean;
}

const InternshipCard = ({ 
  company, 
  role, 
  location, 
  duration, 
  type, 
  logo, 
  rating, 
  applicants, 
  skills,
  aiInsight,
  featured = false
}: InternshipCardProps) => {
  return (
    <div className={`relative bg-card border rounded-xl p-6 transition-smooth hover:shadow-lg ${
      featured ? "border-brand-primary/20 shadow-md" : "border-card-border"
    }`}>
      {featured && (
        <div className="absolute -top-3 left-6">
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
            AI Matched
          </span>
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-background-subtle rounded-lg flex items-center justify-center font-bold text-brand-primary">
            {logo}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{role}</h3>
            <p className="text-foreground-muted font-medium">{company}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-4 text-sm text-foreground-muted">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {applicants} applied
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span 
              key={skill}
              className="px-2 py-1 bg-background-subtle text-foreground-muted text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-background-subtle text-foreground-muted text-xs rounded-md">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* AI Insight */}
      {aiInsight && (
        <div className="mb-4 p-4 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-brand-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-brand-primary" />
            </div>
            <span className="text-sm font-semibold text-brand-primary">
              AI Insight for {aiInsight.studentName}
            </span>
          </div>
          <p className="text-sm text-foreground-muted">
            "{aiInsight.reasoning}"
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1">
          Apply Now
        </Button>
        <Button variant="outline" size="default">
          Save
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;