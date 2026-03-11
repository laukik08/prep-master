import React from 'react';

export function StatCard({
    title,
    value,
    trend,
    icon: Icon
}: {
    title: string;
    value: string | number;
    trend?: { value: string; isPositive: boolean };
    icon: React.ElementType;
}) {
    return (
        <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-brand-400">
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${trend.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {trend.isPositive ? '+' : '-'}{trend.value}
                    </div>
                )}
            </div>
            <div>
                <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
            </div>
        </div>
    );
}
