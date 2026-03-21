'use client';

import React, { useEffect, useState } from 'react';
import { StatCard } from '@/components/admin/ui/StatCard';
import { CheckCircle2, Target, Award, Clock, ArrowUpRight, Flame, Code2, HelpCircle, Building2 } from 'lucide-react';
import { QuestionCard } from '@/components/student/ui/QuestionCard';
import { ProgressChart } from '@/components/student/ui/ProgressChart';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [progress, setProgress] = useState<any>(null);
    const [problems, setProblems] = useState<any[]>([]);

    useEffect(() => {
        api.getStudentProgress().then(setProgress).catch(console.error);
        api.getProblems().then(data => setProblems(data.slice(0, 3))).catch(console.error);
    }, []);

    // Dynamic Data for charts
    const topicsChartData = (progress?.topic_stats || [])
        .filter((t: any) => t.solved > 0)
        .sort((a: any, b: any) => b.solved - a.solved)
        .slice(0, 5)
        .map((t: any, i: number) => ({
            name: t.topic,
            value: t.solved,
            color: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5]
        }));

    const weakAreas = (progress?.topic_stats || [])
        .filter((t: any) => t.total > 0)
        .map((t: any) => ({
            topic: t.topic,
            percentage: Math.round((t.solved / t.total) * 100),
            left: t.total - t.solved
        }))
        .filter((t: any) => t.percentage < 100)
        .sort((a: any, b: any) => a.percentage - b.percentage)
        .slice(0, 3)
        .map((t: any) => ({
            topic: t.topic,
            score: `${t.percentage}%`,
            tasks: `${t.left} problems left`
        }));

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
                        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user?.name || 'Student'}!</h1>
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
                <StatCard title="Problems Solved" value={progress?.problems_solved ?? '—'} icon={CheckCircle2} subtitle={`/ ${progress?.total_problems ?? '—'} Total`} />
                <StatCard title="Aptitude Accuracy" value={`${progress?.aptitude_accuracy ?? '—'}%`} icon={Target} subtitle="Last 30 days" />
                <StatCard title="Company Readiness" value={`${progress?.company_readiness ?? '—'}%`} icon={Award} subtitle="Average across companies" />
                <StatCard title="Total Submissions" value={progress?.total_submissions ?? '—'} icon={Clock} subtitle="All time" />
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
                            {problems.map((prob) => (
                                <QuestionCard 
                                    key={prob.id}
                                    title={prob.title}
                                    category={(prob.topics || []).join(', ') || 'General'}
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
                                data={topicsChartData.length > 0 ? topicsChartData : [{ name: 'No Data', value: 1, color: '#333' }]} 
                                centerText={progress?.problems_solved?.toString() || "0"} 
                                centerSubtext="Total Solved" 
                            />
                        </div>
                        <div className="h-[350px] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-6">Weak Areas Identified</h3>
                            <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-2 nice-scrollbar">
                                {weakAreas.length > 0 ? weakAreas.map((wk: any, i: number) => (
                                    <div key={i} className="flex flex-col gap-2 shrink-0">
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
                                )) : (
                                    <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
                                        Solve problems to unlock weak area insights.
                                    </div>
                                )}
                            </div>
                            <button className="w-full mt-auto pt-4 shrink-0">
                                <div className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-sm transition-colors border border-white/10">
                                    Generate Practice Set
                                </div>
                            </button>
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
