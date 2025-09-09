import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Target, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">InternAI</Link>
            <div className="space-x-4">
              <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
              <Link href="/register"><Button>Get Started</Button></Link>
            </div>
          </div>
        </div>
      </header>
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Intelligent Internship Matching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">India's Future</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Connect talented students with India's top companies through AI-powered matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/student">
              <Button size="lg" className="px-8 py-4 text-lg w-full sm:w-auto">
                <Target className="w-6 h-6 mr-2" />Find My Internship
              </Button>
            </Link>
            <Link href="/dashboard/recruiter">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto">
                <Users className="w-6 h-6 mr-2" />Hire Top Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}