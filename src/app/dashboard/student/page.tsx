"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Bell, Sparkles, Briefcase, MapPin, Clock } from "lucide-react";
import {
  mockUser,
  mockInternships,
  mockApplications,
  Internship,
} from "@/lib/types";



import Sidebar from "@/components/Sidebar"; // We will create this


import { auth } from '@/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';


// Reusable Internship Card (local to this file or move to /components)


export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType="student"
      />
      <main className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {}!
              </h1>
              <p className="text-gray-600">{mockUser.university}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
          </div>
        </header>
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Strength</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3.8"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3.8"
                        strokeDasharray={`${
                          mockUser.profileStrength * 0.999
                        }, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">
                        {mockUser.profileStrength}%
                      </span>
                    </div>
                  </div>
                  <Button className="w-full">Complete Your Profile</Button>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span>✨ Top Matches For You</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex overflow-x-auto space-x-4 pb-4 -mx-6 px-6">
                    {/* {mockInternships.map((internship) => (
                      <InternshipCard
                        key={internship.id}
                        internship={internship}
                      />
                    ))} */}
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Application Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApplications.map((app, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {app.company}
                          </TableCell>
                          <TableCell>{app.role}</TableCell>
                          <TableCell>{app.dateApplied}</TableCell>
                          <TableCell>
                            <Badge className={app.statusColor}>
                              {app.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Add content for other tabs here */}
          {activeTab === "matches" && <div>My Matches Page Content</div>}
          {activeTab === "applications" && (
            <div>My Applications Page Content</div>
          )}
          {activeTab === "profile" && <div>My Profile Page Content</div>}
          {activeTab === "settings" && <div>Settings Page Content</div>}
        </div>
      </main>
    </div>
  );
}
