'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { api } from '@/lib/api';

export default function PracticePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [problems, setProblems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getProblems()
            .then(data => setProblems(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredProblems = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (p.topics || []).some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    const getDifficultyClass = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">DSA Practice</h1>
                <p className="text-white/50 mt-1">Master coding interview patterns and data structures.</p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search problems or topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 bg-[#0a0618] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500 focus:bg-white/5 transition-colors"
                        />
                    </div>
                    <button className="h-10 px-4 rounded-xl bg-[#0a0618] border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-sm shrink-0">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>
                
                <div className="flex bg-[#0a0618] border border-white/10 rounded-xl p-1 w-full sm:w-auto">
                    {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                        <button
                            key={diff}
                            onClick={() => setDifficultyFilter(diff)}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                difficultyFilter === diff 
                                ? 'bg-white/10 text-white' 
                                : 'text-white/50 hover:text-white/80'
                            }`}
                        >
                            {diff}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problems Table */}
            {loading ? (
                <div className="text-center py-20 text-white/50">Loading problems...</div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                    <Table
                        headers={[
                            <span key="status">Status</span>,
                            <span key="title">Title</span>,
                            <span key="difficulty" className="text-center block">Difficulty</span>,
                            <span key="topics" className="hidden md:inline">Topics</span>,
                            <span key="companies" className="hidden lg:inline">Companies</span>,
                            <span key="action"></span>
                        ]}
                    >
                        {filteredProblems.map((problem) => (
                            <TableRow key={problem.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {problem.status === 'Solved' ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
                                    )}
                                </td>
                                <TableCell>
                                    <Link href={`/dashboard/practice/${problem.id}`} className="font-semibold text-white/90 group-hover:text-brand-300 transition-colors">
                                        {problem.title}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold border ${getDifficultyClass(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex flex-wrap gap-1.5">
                                        {(problem.topics || []).slice(0, 3).map((topic: string, i: number) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/60">
                                                {topic}
                                            </span>
                                        ))}
                                        {(problem.topics || []).length > 3 && (
                                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/40">
                                                +{problem.topics.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <div className="flex flex-wrap gap-1.5">
                                        {(problem.companies || []).slice(0, 2).map((tag: string, i: number) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/practice/${problem.id}`}>
                                        <div className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-brand-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-500/20 translate-x-2 group-hover:translate-x-0">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredProblems.length === 0 && (
                            <TableRow>
                                <td className="px-6 py-4 whitespace-nowrap h-32 text-center text-white/40" colSpan={6}>
                                    No problems found matching your criteria.
                                </td>
                            </TableRow>
                        )}
                    </Table>

                    <div className="p-4 border-t border-white/5 text-center sm:text-left flex justify-between items-center bg-[#0a0618]/50">
                        <span className="text-sm text-white/50">Showing {filteredProblems.length} problems</span>
                    </div>
                </div>
            )}
        </div>
    );
}
