import React from 'react';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
    return (
        <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col h-full">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
            </div>
            <div className="flex-1 min-h-[300px] w-full">
                {children}
            </div>
        </div>
    );
}
