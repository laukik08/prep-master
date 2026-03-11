import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: string | number;
        isPositive: boolean;
    };
    icon: LucideIcon | React.ElementType;
    subtitle?: string;
}

export function StatCard({ title, value, trend, icon: Icon, subtitle }: StatCardProps) {
    return (
        <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden group">
            <div className="absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl -z-10 bg-gradient-to-br from-brand-500/20 to-purple-500/0" />
            
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-brand-400 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${trend.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {trend.isPositive ? '+' : '-'}{trend.value}%
                    </div>
                )}
            </div>
            <div>
                <div className="flex justify-between items-end mb-1">
                    <p className="text-white/50 text-sm font-medium">{title}</p>
                    {subtitle && <p className="text-white/30 text-xs font-medium">{subtitle}</p>}
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
            </div>
        </div>
    );
}
