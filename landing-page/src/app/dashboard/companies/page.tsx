'use client';

import React, { useState, useEffect } from 'react';
import { Search, Building2, Flame, Award, Filter, Map } from 'lucide-react';
import { CompanyCard } from '@/components/student/ui/CompanyCard';
import { api } from '@/lib/api';

export default function CompaniesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getCompanies()
            .then(data => setCompanies(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-8">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-brand-400" />
                        Company-Specific Preparation
                    </h1>
                    <p className="text-white/50 mt-2 max-w-2xl">Target exactly what each company asks. We analyze past interview experiences to provide you with the most relevant aptitude and coding topics.</p>
                </div>
                
                <div className="flex bg-[#0a0618] border border-white/10 p-4 rounded-2xl gap-6 items-center shadow-lg">
                    <div className="text-center px-4 border-r border-white/10">
                        <p className="text-2xl font-bold text-white mb-0.5">24</p>
                        <p className="text-xs text-white/50 font-medium">Companies<br/>Available</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-2xl font-bold text-brand-400 mb-0.5">180+</p>
                        <p className="text-xs text-white/50 font-medium">Curated<br/>Topics</p>
                    </div>
                </div>
            </div>

            {/* Top Recommended Roadmaps Banner */}
            <div className="bg-gradient-to-r from-brand-600/20 via-purple-600/20 to-[#0a0618] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] -z-10" />
                <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-brand-300">
                        <Flame className="w-4 h-4 text-orange-400" /> Trending This Week
                    </span>
                    <h2 className="text-2xl font-bold text-white">MAANG Complete Roadmap 2024</h2>
                    <p className="text-white/70 max-w-xl">Follow our structured path to crack top product-based companies. Includes system design, advanced DSA, and behavioral prep.</p>
                </div>
                <button className="whitespace-nowrap px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center gap-2">
                    <Map className="w-5 h-5" /> Start Journey
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search for a company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500 focus:bg-white/[0.07] transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20 text-white/50">Loading companies...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map(company => (
                        <div key={company.id} className="relative group perspective">
                            <CompanyCard 
                                name={company.name}
                                aptitudeScore={company.aptitude_question_count || 0}
                                codingScore={company.coding_problem_count || 0}
                                overallReadiness={Math.min(100, (company.aptitude_question_count || 0) + (company.coding_problem_count || 0))}
                                colorClasses="from-brand-500 to-purple-500"
                            />
                        </div>
                    ))}
                </div>
            )}

            {filteredCompanies.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No companies found</h3>
                    <p className="text-white/50">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    );
}
