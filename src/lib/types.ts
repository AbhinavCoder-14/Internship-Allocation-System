import { LucideIcon } from "lucide-react";

// --- TYPE DEFINITIONS ---
export type UserProfile = {
  name: string;
  email: string;
  university: string;
  profileStrength: number;
};

export type Internship = {
  id: number;
  company: string;
  role: string;
  location: string;
  matchScore: number;
  logo: string;
  duration: string;
};

export type Application = {
  company: string;
  role: string;
  dateApplied: string;
  status: 'Shortlisted' | 'Offer Extended' | 'Under Review' | 'Recommended';
  statusColor: string;
};

export type Candidate = {
  name: string;
  university: string;
  matchScore: number;
  skills: string;
};

export type UserType = 'student' | 'recruiter';
export type StudentTab = 'dashboard' | 'matches' | 'applications' | 'profile' | 'settings';
export type RecruiterTab = 'dashboard' | 'internships' | 'candidates' | 'settings';
export interface NavItem {
    id: StudentTab | RecruiterTab;
    label: string;
    icon: LucideIcon;
}


// --- MOCK DATA ---
export const mockUser: UserProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@university.edu",
  university: "IIT Delhi",
  profileStrength: 85
};

export const mockInternships: Internship[] = [
  { id: 1, company: "Microsoft", role: "Software Development Intern", location: "Bangalore", matchScore: 95, logo: "🏢", duration: "6 months" },
  { id: 2, company: "Flipkart", role: "Product Management Intern", location: "Bangalore", matchScore: 88, logo: "🛒", duration: "4 months" },
  { id: 3, company: "Zomato", role: "Data Science Intern", location: "Gurgaon", matchScore: 92, logo: "🍽️", duration: "6 months" },
  { id: 4, company: "Paytm", role: "Full Stack Developer", location: "Noida", matchScore: 87, logo: "💳", duration: "5 months" }
];

export const mockApplications: Application[] = [
  { company: "Microsoft", role: "SDE Intern", dateApplied: "2025-08-15", status: "Shortlisted", statusColor: "bg-yellow-100 text-yellow-800" },
  { company: "Google", role: "PM Intern", dateApplied: "2025-08-12", status: "Offer Extended", statusColor: "bg-green-100 text-green-800" },
  { company: "Amazon", role: "Data Analyst", dateApplied: "2025-08-10", status: "Under Review", statusColor: "bg-blue-100 text-blue-800" },
  { company: "Flipkart", role: "UX Designer", dateApplied: "2025-08-08", status: "Recommended", statusColor: "bg-purple-100 text-purple-800" }
];

export const mockCandidates: Candidate[] = [
  { name: "Arjun Patel", university: "IIT Bombay", matchScore: 94, skills: "React, Node.js" },
  { name: "Sneha Kumar", university: "BITS Pilani", matchScore: 91, skills: "Python, ML" },
  { name: "Rohit Singh", university: "NIT Trichy", matchScore: 89, skills: "Java, Spring" },
  { name: "Ananya Reddy", university: "IIIT Hyderabad", matchScore: 87, skills: "Flutter, Dart" }
];