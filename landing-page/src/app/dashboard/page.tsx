'use client';

import React from 'react';
import { StatCard } from '@/components/admin/ui/StatCard';
import { CheckCircle2, Target, Award, Clock, ArrowUpRight, Flame, Code2, HelpCircle, Building2 } from 'lucide-react';
import { QuestionCard } from '@/components/student/ui/QuestionCard';
import { ProgressChart } from '@/components/student/ui/ProgressChart';
import Link from 'next/link';

export default function StudentDashboard() {
    // Mock Data
    const mockTopicsChartData = [
        { name: 'Arrays & Strings', value: 45, color: '#10B981' }, // green-500
        { name: 'Trees & Graphs', value: 25, color: '#F59E0B' },   // yellow-500
        { name: 'Dynamic Prog.', value: 15, color: '#EF4444' },    // red-500
        { name: 'Linked Lists', value: 15, color: '#3B82F6' },     // blue-500
    ];

    const recommendedProblems = [
        { id: 1, title: "Longest Increasing Subsequence", category: "Dynamic Programming", difficulty: "Medium" },
        { id: 2, title: "Binary Tree Level Order Traversal", category: "Trees", difficulty: "Medium" },
        { id: 3, title: "Merge k Sorted Lists", category: "Linked Lists", difficulty: "Hard" },
    ];

    const recentActivity = [
        { id: 1, action: 'Solved', item: 'Two Sum', time: '2 hours ago', type: 'coding' },
        { id: 2, action: 'Completed Test', item: 'Quantitative Aptitude Vol. 1', time: 'Yesterday', type: 'aptitude', score: '85%' },
        { id: 3, action: 'Solved', item: 'Binary Search', time: '2 days ago', type: 'coding' },
        { id: 4, action: 'Viewed', item: 'TCS Placement Criteria', time: '3 days ago', type: 'company' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, Student!</h1>
                        <span className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-bold border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                            <Flame className="w-4 h-4" /> 12 Day Streak
                        </span>
                    </div>
                    <p className="text-white/50">Your placement readiness is improving. Keep up the momentum!</p>
                </div>
                <Link href="/dashboard/practice">
                    <button className="bg-brand-500 hover:bg-brand-400 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-brand-500/25 flex items-center gap-2">
                        Resume Practice <ArrowUpRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Problems Solved" value="142" icon={CheckCircle2} trend={{ value: 12, isPositive: true }} subtitle="/ 500 Target" />
                <StatCard title="Aptitude Accuracy" value="78%" icon={Target} trend={{ value: 4, isPositive: true }} subtitle="Last 30 days" />
                <StatCard title="Company Readiness" value="65%" icon={Award} trend={{ value: 8, isPositive: true }} subtitle="Average across 10 companies" />
                <StatCard title="Practice Time" value="48h" icon={Clock} subtitle="This month" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Activity & Charts */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Recommended Practice */}
                    <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
                            <Link href="/dashboard/practice" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View All Problems</Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                            {recommendedProblems.map((prob) => (
                                <QuestionCard 
                                    key={prob.id}
                                    title={prob.title}
                                    category={prob.category}
                                    difficulty={prob.difficulty}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[350px]">
                            <ProgressChart 
                                title="Problems by Topic" 
                                data={mockTopicsChartData} 
                                centerText="142" 
                                centerSubtext="Total Solved" 
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Weak Areas Identified</h3>
                            <div className="space-y-5">
                                {[
                                    { topic: "Dynamic Programming", score: "42%", tasks: "24 problems left" },
                                    { topic: "Graph Algorithms", score: "55%", tasks: "18 problems left" },
                                    { topic: "Logical Reasoning", score: "60%", tasks: "5 tests left" },
                                ].map((wk, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-end">
                                            <span className="font-medium text-white/80">{wk.topic}</span>
                                            <span className="text-xs text-white/40">{wk.tasks}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-400 rounded-full" style={{ width: wk.score }} />
                                            </div>
                                            <span className="text-sm font-bold text-red-400 w-10 text-right">{wk.score}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-sm transition-colors border border-white/10">
                                    Generate Practice Set
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Recent Activity */}
                <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                    
                    <div className="flex-1 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[15px] top-2 bottom-4 w-px bg-white/10" />
                        
                        <div className="space-y-6">
                            {recentActivity.map((act) => (
                                <div key={act.id} className="relative pl-10">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 z-10">
                                        {act.type === 'coding' && <Code2 className="w-4 h-4 text-brand-400" />}
                                        {act.type === 'aptitude' && <HelpCircle className="w-4 h-4 text-purple-400" />}
                                        {act.type === 'company' && <Building2 className="w-4 h-4 text-blue-400" />}
                                    </div>
                                    
                                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-brand-400">{act.action}</span>
                                            <span className="font-semibold text-white/90">{act.item}</span>
                                            {act.score && (
                                                <span className="text-sm text-green-400 font-medium my-1">Score: {act.score}</span>
                                            )}
                                            <span className="text-xs text-white/40 mt-1">{act.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                        View Full History
                    </button>
                </div>
            </div>

        </div>
    );
}
