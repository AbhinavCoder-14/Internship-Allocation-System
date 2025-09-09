import InternshipCard from "./InternshipCard";

const CuratedOpportunities = () => {
  const internships = [
    {
      company: "Zomato",
      role: "Data Science Intern",
      location: "Bangalore",
      duration: "6 months",
      type: "Full-time",
      logo: "Z",
      rating: 4.8,
      applicants: 234,
      skills: ["Python", "Machine Learning", "SQL", "Pandas", "Data Analysis"],
      aiInsight: {
        studentName: "Priya Sharma",
        reasoning: "Priya's project on 'sentiment analysis of user reviews' and her proficiency in Python's Pandas library make her a top-tier candidate for this Data Science role, which focuses on analyzing customer feedback."
      },
      featured: true
    },
    {
      company: "Flipkart",
      role: "Software Engineering Intern",
      location: "Bangalore",
      duration: "4 months",
      type: "Full-time",
      logo: "F",
      rating: 4.7,
      applicants: 456,
      skills: ["Java", "Spring Boot", "Microservices", "React", "AWS"]
    },
    {
      company: "Paytm",
      role: "Product Management Intern",
      location: "Noida",
      duration: "6 months",
      type: "Full-time",
      logo: "P",
      rating: 4.6,
      applicants: 189,
      skills: ["Product Strategy", "Analytics", "User Research", "Agile", "SQL"]
    },
    {
      company: "Swiggy",
      role: "Backend Developer Intern",
      location: "Bangalore",
      duration: "5 months",
      type: "Full-time",
      logo: "S",
      rating: 4.9,
      applicants: 312,
      skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"]
    },
    {
      company: "Razorpay",
      role: "Frontend Developer Intern",
      location: "Bangalore",
      duration: "4 months",
      type: "Full-time",
      logo: "R",
      rating: 4.8,
      applicants: 278,
      skills: ["React", "TypeScript", "Next.js", "CSS", "JavaScript"]
    }
  ];

  return (
    <section className="py-24 bg-background-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
            Your Future, <span className="text-gradient">Curated by AI</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            See how our AI matches you with opportunities that align perfectly with your skills, 
            projects, and career aspirations. Each recommendation comes with detailed reasoning.
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {internships.map((internship, index) => (
                <div key={index} className="w-[400px] flex-shrink-0">
                  <InternshipCard {...internship} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Fade */}
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background-subtle to-transparent pointer-events-none" />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-foreground-muted mb-6">
            Ready to discover opportunities tailored specifically for you?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary-dark transition-smooth">
              Get My AI-Curated Matches
            </button>
            <button className="px-8 py-3 border border-card-border text-foreground rounded-lg font-semibold hover:bg-background-subtle transition-smooth">
              Learn More About Our AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedOpportunities;