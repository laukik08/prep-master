'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Target, TrendingUp, Award, Activity } from 'lucide-react';
import { StatCard } from '@/components/admin/ui/StatCard';
import { api } from '@/lib/api';

const activityData = [
    { name: 'Mon', problems: 4, hours: 2, aptitude: 15 },
    { name: 'Tue', problems: 7, hours: 3.5, aptitude: 20 },
    { name: 'Wed', problems: 5, hours: 2.5, aptitude: 10 },
    { name: 'Thu', problems: 10, hours: 5, aptitude: 35 },
    { name: 'Fri', problems: 2, hours: 1, aptitude: 5 },
    { name: 'Sat', problems: 12, hours: 6, aptitude: 40 },
    { name: 'Sun', problems: 15, hours: 7, aptitude: 50 },
];

const topicRadarData = [
    { subject: 'Arrays & Strings', A: 85, fullMark: 100 },
    { subject: 'Dynamic Programming', A: 45, fullMark: 100 },
    { subject: 'Graphs', A: 60, fullMark: 100 },
    { subject: 'Trees', A: 75, fullMark: 100 },
    { subject: 'Math & Geo', A: 90, fullMark: 100 },
    { subject: 'Linked Lists', A: 80, fullMark: 100 },
];

const mockTestsProgress = [
    { name: 'Mock 1', score: 65 },
    { name: 'Mock 2', score: 72 },
    { name: 'Mock 3', score: 70 },
    { name: 'Mock 4', score: 85 },
    { name: 'Mock 5', score: 82 },
];

export default function ProgressPage() {
    const [progress, setProgress] = useState<any>(null);

    useEffect(() => {
        api.getStudentProgress().then(setProgress).catch(console.error);
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Activity className="w-8 h-8 text-brand-400" />
                    Progress Analytics
                </h1>
                <p className="text-white/50 mt-2">Track your learning curve, identify weak areas, and monitor your consistency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Problems Solved" 
                    value={progress?.problems_solved ?? '—'} 
                    icon={TrendingUp} 
                />
                <StatCard 
                    title="Total Submissions" 
                    value={progress?.total_submissions ?? '—'} 
                    icon={Target} 
                />
                <StatCard 
                    title="Aptitude Accuracy" 
                    value={`${progress?.aptitude_accuracy ?? '—'}%`} 
                    icon={Award} 
                />
                <StatCard 
                    title="Company Readiness" 
                    value={`${progress?.company_readiness ?? '—'}%`} 
                    icon={Activity} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Graph */}
                <div className="bg-[#0a0618] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Weekly Activity</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorAptitude" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0a0618', borderColor: '#ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Area type="monotone" name="Coding Problems" dataKey="problems" stroke="#7c3aed" fillOpacity={1} fill="url(#colorProblems)" />
                                <Area type="monotone" name="Aptitude Qs" dataKey="aptitude" stroke="#ec4899" fillOpacity={1} fill="url(#colorAptitude)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Mock Test Performance */}
                <div className="bg-[#0a0618] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Mock Test Scores</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockTestsProgress} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                <Tooltip 
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#0a0618', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#brand-400' }}
                                />
                                <Bar dataKey="score" fill="#7c3aed" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Topic Mastery breakdown */}
            <div className="bg-[#0a0618] border border-white/10 p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Topic Mastery (DSA)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {topicRadarData.map((topic, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 relative flex items-center justify-center mb-3">
                                {/* SVG Circle Progress */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle className="text-brand-500 stroke-current" strokeWidth="4" cx="32" cy="32" r="28" fill="transparent" strokeDasharray={`${(topic.A / 100) * 175} 175`}></circle>
                                </svg>
                                <span className="text-white font-bold">{topic.A}%</span>
                            </div>
                            <p className="text-xs font-medium text-white/70">{topic.subject}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
