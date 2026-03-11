'use client';

import React, { useState } from 'react';
import { PlayCircle, Clock, Award, Shield, CheckCircle2, FileText, BarChart3 } from 'lucide-react';

const mockTestsData = [
    {
        id: 'mt1',
        title: 'TCS NQT National Mock 1',
        description: 'Full length mock test simulating the exact TCS NQT pattern. Includes Aptitude, Logical Reasoning, and Coding.',
        duration: '120 mins',
        questions: 65,
        marks: 100,
        participants: '12.4k',
        status: 'completed', // 'upcoming', 'active', 'completed'
        score: 82
    },
    {
        id: 'mt2',
        title: 'Cognizant GenC Elevate Mock',
        description: 'Advanced aptitude and coding test focused on algorithm design and data structures.',
        duration: '180 mins',
        questions: 40,
        marks: 100,
        participants: '8.2k',
        status: 'active',
        score: null
    },
    {
        id: 'mt3',
        title: 'Wipro Elite National Talent Mock',
        description: 'Comprehensive assessment including English, Logical Reasoning, Quantitative Aptitude & Automata.',
        duration: '140 mins',
        questions: 80,
        marks: 100,
        participants: '15.1k',
        status: 'upcoming',
        date: 'Oct 15, 2024 • 10:00 AM',
        score: null
    },
    {
        id: 'mt4',
        title: 'Product Based Companies - Graph & DP Mock',
        description: 'Hard level coding assessment strictly focusing on Dynamic Programming and Advanced Graph algorithms.',
        duration: '90 mins',
        questions: 3,
        marks: 300,
        participants: '3.4k',
        status: 'active',
        score: null
    }
];

export default function MockTestsPage() {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all');

    const filteredTests = mockTestsData.filter(test => filter === 'all' || test.status === filter);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-8">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-brand-400" />
                        Full-Length Mock Tests
                    </h1>
                    <p className="text-white/50 mt-2 max-w-2xl">Simulate the real testing environment. Benchmark yourself against thousands of other students preparing for the same roles.</p>
                </div>
                
                <div className="flex gap-4 items-center">
                    <div className="bg-[#0a0618] border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-white/50 font-medium">National Rank</p>
                            <p className="text-xl font-bold text-white">#4,208</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex bg-[#0a0618] border border-white/10 rounded-xl p-1 w-full sm:w-auto overflow-x-auto nice-scrollbar">
                {[
                    { id: 'all', label: 'All Tests' },
                    { id: 'active', label: 'Active Now' },
                    { id: 'upcoming', label: 'Upcoming' },
                    { id: 'completed', label: 'Completed' }
                ].map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id as any)}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            filter === f.id 
                            ? 'bg-brand-500/10 text-brand-400' 
                            : 'text-white/50 hover:text-white/80'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Test Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTests.map((test) => (
                    <div key={test.id} className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group flex flex-col relative overflow-hidden">
                        {/* Background subtle glow for active tests */}
                        {test.status === 'active' && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-brand-500/10 transition-colors" />
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">{test.title}</h3>
                                    {test.status === 'active' && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse">
                                            LIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-white/50 leading-relaxed max-w-sm">{test.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Clock className="w-4 h-4 text-brand-400" /> {test.duration}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <FileText className="w-4 h-4 text-blue-400" /> {test.questions} Qs
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Award className="w-4 h-4 text-orange-400" /> {test.marks} Marks
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="text-sm font-medium text-white/40 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-white/10 border border-[#0a0618] flex items-center justify-center text-[10px]">&nbsp;</div>
                                    ))}
                                </div>
                                {test.participants} taking this
                            </div>

                            {test.status === 'completed' && (
                                <div className="flex gap-3">
                                    <div className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 font-bold flex items-center gap-2 border border-green-500/20">
                                        <CheckCircle2 className="w-4 h-4" /> Score: {test.score}
                                    </div>
                                    <button className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4" /> Analysis
                                    </button>
                                </div>
                            )}

                            {test.status === 'active' && (
                                <button className="px-6 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-medium transition-colors shadow-lg shadow-brand-500/20 flex items-center gap-2">
                                    <PlayCircle className="w-4 h-4" /> Start Now
                                </button>
                            )}

                            {test.status === 'upcoming' && (
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-white/40 mb-1">Starts</span>
                                    <span className="text-sm font-semibold text-white/80">{test.date}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredTests.length === 0 && (
                <div className="py-20 text-center bg-[#0a0618] border border-white/10 rounded-2xl">
                    <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No tests found</h3>
                    <p className="text-white/50">There are no {filter} mock tests available at the moment.</p>
                </div>
            )}
        </div>
    );
}
