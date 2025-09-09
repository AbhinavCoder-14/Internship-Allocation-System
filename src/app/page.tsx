// src/app/page.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import AIDemo from "@/components/AIDemo";
import CuratedOpportunities from "@/components/CuratedOpportunities";

export default function HomePage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear any session storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem("user");
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              InternAI
            </Link>

            {!user ? (
              <div className="space-x-4">
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <Link href="/dashboard/student">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button onClick={handleSignOut}>
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="px-4">
        <div className="min-h-screen bg-background">
          <HeroSection />
          <ProblemSolutionSection />
          <AIDemo />
          <CuratedOpportunities />
        </div>
      </section>
    </div>
  );
}