

'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Divide, Target, Users } from 'lucide-react';


import  {useRouter}  from 'next/navigation';

import { auth } from '@/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';



import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import AIDemo from "@/components/AIDemo";
import CuratedOpportunities from "@/components/CuratedOpportunities";



export default function  HomePage() {

  const [user] = useAuthState(auth)
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  console.log({user})


  if(!user){

    router.push("/login")
  }






  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">InternAI</Link>

            {!user ? (<div className="space-x-4">
              <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
              <Link href="/register"><Button>Get Started</Button></Link>
            </div>):(

              <div className="signOut">
                <Button onClick={()=>{
                  signOut(auth)
                  sessionStorage.removeItem('user')
                }}>Log Out</Button>
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