'use client';

import React from 'react';

interface CompanyCardProps {
    name: string;
    aptitudeScore: number;
    codingScore: number;
    overallReadiness: number;
    colorClasses: string;
    onClick?: () => void;
}

export function CompanyCard({ name, aptitudeScore, codingScore, overallReadiness, colorClasses, onClick }: CompanyCardProps) {
    const getReadinessColor = (val: number) => {
        if (val >= 85) return 'text-green-400 bg-green-500/20';
        if (val >= 65) return 'text-yellow-400 bg-yellow-500/20';
        return 'text-red-400 bg-red-500/20';
    };

    const getProgressColor = (val: number) => {
        if (val >= 85) return 'bg-green-400';
        if (val >= 65) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    return (
        <div 
            onClick={onClick}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative isolate overflow-hidden"
        >
            {/* Background Glow */}
            <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl -z-10 bg-gradient-to-br ${colorClasses}`} />
            
            <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br ${colorClasses} shadow-lg`}>
                    {name.charAt(0)}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getReadinessColor(overallReadiness)}`}>
                    {overallReadiness}% Ready
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 group-hover:text-brand-300 transition-colors">{name}</h3>

            <div className="space-y-4">
                {/* Aptitude Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/60">Aptitude Progress</span>
                        <span className="text-white font-medium">{aptitudeScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${getProgressColor(aptitudeScore)}`} 
                            style={{ width: `${Math.min(100, Math.max(0, aptitudeScore))}%` }} 
                        />
                    </div>
                </div>

                {/* Coding Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/60">Coding Progress</span>
                        <span className="text-white font-medium">{codingScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${getProgressColor(codingScore)}`} 
                            style={{ width: `${Math.min(100, Math.max(0, codingScore))}%` }} 
                        />
                    </div>
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="text-white/50">Click to view role requirements</span>
                <span className="text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">&rarr;</span>
            </div>
        </div>
    );
}
