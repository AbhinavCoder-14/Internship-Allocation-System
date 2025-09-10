// src/app/profile/complete/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import axios from 'axios';
import { 
  User, 
  BookOpen, 
  Code, 
  Heart, 
  Briefcase, 
  MapPin, 
  Clock, 
  FileText,
  Upload,
  X,
  Plus,
  ArrowLeft,
  Save
} from "lucide-react";

import { auth } from '@/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

// Course options
const COURSES = [
  "B.Tech CSE", "B.Tech ECE", "B.Tech ME", "B.Tech EE", "B.Tech CE",
  "B.Sc Computer Science", "B.Com", "BBA", "MBA", "M.Tech", "M.Sc",
  "B.Des", "B.Arch", "Other"
];

// Skill suggestions
const SKILL_SUGGESTIONS = [
  "Python", "JavaScript", "Java", "C++", "React", "Node.js", "HTML/CSS",
  "Machine Learning", "Data Analysis", "SQL", "MongoDB", "Git",
  "Embedded C", "RTOS", "Arduino", "STM32", "Circuit Design",
  "AutoCAD", "SolidWorks", "MATLAB", "Photoshop", "Figma"
];

// Interest categories
const INTEREST_CATEGORIES = [
  "Electronics", "Software Development", "Data Science", "AI/ML",
  "Web Development", "Mobile Apps", "IoT", "Robotics", "Gaming",
  "Design", "Marketing", "Finance", "Consulting", "Automotive"
];

// Domain options
const DOMAINS = [
  "Technology", "Automotive", "Electronics", "Healthcare", "Finance",
  "E-commerce", "Education", "Gaming", "Media", "Consulting",
  "Manufacturing", "Energy", "Telecommunications", "Aerospace"
];

// Location options
const LOCATIONS = [
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune",
  "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Remote", "Other"
];

interface ProfileFormData {
  full_name: string;
  age: number | "";
  course: string;
  semester: number | "";
  skills: string[];
  interests: string[];
  projects: string[];
  experience_months: number | "";
  preferred_sector_domains: string[];
  preferred_location: string;
  availability_months: number | "";
  resume_text: string;
  filters: {
    remote_only: boolean;
    min_stipend_k: number | null;
  };
  top_k: number;
}

export default function CompleteProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: "",
    age: "",
    course: "",
    semester: "",
    skills: [],
    interests: [],
    projects: [""],
    experience_months: "",
    preferred_sector_domains: [],
    preferred_location: "",
    availability_months: "",
    resume_text: "",
    filters: {
      remote_only: false,
      min_stipend_k: null
    },
    top_k: 5
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleInputChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterChange = (filterKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterKey]: value
      }
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const addDomain = (domain: string) => {
    if (!formData.preferred_sector_domains.includes(domain)) {
      setFormData(prev => ({
        ...prev,
        preferred_sector_domains: [...prev.preferred_sector_domains, domain]
      }));
    }
  };

  const removeDomain = (domainToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_sector_domains: prev.preferred_sector_domains.filter(domain => domain !== domainToRemove)
    }));
  };

  const updateProject = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => i === index ? value : project)
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, ""]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      // Here you would typically send the file to your OCR system
      // For now, we'll just set a placeholder
      setFormData(prev => ({
        ...prev,
        resume_text: "Resume content will be extracted by OCR system..."
      }));
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data according to your API format
      const apiData = {
        profile_id: user.uid,
        full_name: formData.full_name,
        age: Number(formData.age),
        course: formData.course,
        semester: Number(formData.semester),
        skills: formData.skills,
        interests: formData.interests.length > 0 ? formData.interests : undefined,
        projects: formData.projects.filter(p => p.trim() !== "").length > 0 
          ? formData.projects.filter(p => p.trim() !== "") : undefined,
        experience_months: formData.experience_months ? Number(formData.experience_months) : undefined,
        preferred_sector_domains: formData.preferred_sector_domains.length > 0 
          ? formData.preferred_sector_domains : undefined,
        preferred_location: formData.preferred_location || undefined,
        availability_months: formData.availability_months ? Number(formData.availability_months) : undefined,
        resume_text: formData.resume_text || undefined,
        filters: {
          remote_only: formData.filters.remote_only,
          min_stipend_k: formData.filters.min_stipend_k
        },
        top_k: formData.top_k
      };

      console.log("Submitting profile data:", apiData);
      
      // Here you would send the data to your API
      // await submitProfile(apiData);
      // *
      // For now, simulate API call

      const response = await fetch("/api/profile",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({apiData})
      })
      const data = await response.json();

      console.log("API Response:", data);
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }
      // await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Profile completed successfully!");
      router.push("/dashboard/student");
      
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Error submitting profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
            <p className="text-gray-600">Help us find the perfect internships for you</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Age *</label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter your age"
                    min="18"
                    max="35"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange("course", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select your course</option>
                    {COURSES.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Semester *</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => handleInputChange("semester", Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select semester</option>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills *
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(newSkill);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(newSkill)}
                  disabled={!newSkill}
                >
                  Add
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {SKILL_SUGGESTIONS.filter(skill => !formData.skills.includes(skill)).map(skill => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => addSkill(skill)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Interests (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest(newInterest);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addInterest(newInterest)}
                  disabled={!newInterest}
                >
                  Add
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_CATEGORIES.filter(interest => !formData.interests.includes(interest)).map(interest => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => addInterest(interest)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Projects (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.projects.map((project, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={project}
                    onChange={(e) => updateProject(index, e.target.value)}
                    placeholder="Describe your project"
                  />
                  {formData.projects.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeProject(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addProject}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Project
              </Button>
            </CardContent>
          </Card>

          {/* Experience and Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Experience & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Experience (months)</label>
                  <Input
                    type="number"
                    value={formData.experience_months}
                    onChange={(e) => handleInputChange("experience_months", e.target.value ? Number(e.target.value) : "")}
                    placeholder="Total work experience in months"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Availability (months)</label>
                  <Input
                    type="number"
                    value={formData.availability_months}
                    onChange={(e) => handleInputChange("availability_months", e.target.value ? Number(e.target.value) : "")}
                    placeholder="How long can you intern?"
                    min="1"
                    max="12"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Location</label>
                <select
                  value={formData.preferred_location}
                  onChange={(e) => handleInputChange("preferred_location", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select preferred location</option>
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Domains</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.preferred_sector_domains.map(domain => (
                    <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                      {domain}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeDomain(domain)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {DOMAINS.filter(domain => !formData.preferred_sector_domains.includes(domain)).map(domain => (
                    <Badge
                      key={domain}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => addDomain(domain)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload your resume (PDF only)</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
              </div>
              {resumeFile && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">{resumeFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setResumeFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remote-only"
                  checked={formData.filters.remote_only}
                  onChange={(e) => handleFilterChange("remote_only", e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="remote-only" className="text-sm font-medium">
                  Remote work only
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Stipend (₹K per month)</label>
                <Input
                  type="number"
                  value={formData.filters.min_stipend_k || ""}
                  onChange={(e) => handleFilterChange("min_stipend_k", e.target.value ? Number(e.target.value) : null)}
                  placeholder="Enter minimum stipend in thousands"
                  min="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.full_name || !formData.age || !formData.course || !formData.semester || formData.skills.length === 0}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving Profile...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Complete Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}