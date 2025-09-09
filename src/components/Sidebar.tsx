'use client';
import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Settings, BarChart3, Users, Briefcase, Target, Menu, X } from 'lucide-react';

import { UserType, StudentTab, RecruiterTab, NavItem } from '@/lib/types';



interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<any>>;
  userType: UserType;
}

export default function Sidebar({ activeTab, setActiveTab, userType }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const studentItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'matches', label: 'My Matches', icon: Target },
        { id: 'applications', label: 'Applications', icon: Briefcase },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const recruiterItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'internships', label: 'My Internships', icon: Briefcase },
        { id: 'candidates', label: 'Candidates', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const items = userType === 'student' ? studentItems : recruiterItems;

    return (
        <>
            <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50 bg-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200">
                        <Link href="/" className="text-xl font-bold text-blue-600">InternAI</Link>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                                    <Icon className="w-5 h-5" /><span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
        </>
    );
};
