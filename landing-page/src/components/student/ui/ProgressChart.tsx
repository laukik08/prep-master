'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ProgressChartProps {
    data: { name: string; value: number; color: string }[];
    title: string;
    centerText?: string;
    centerSubtext?: string;
}

export function ProgressChart({ data, title, centerText, centerSubtext }: ProgressChartProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center relative h-full">
            <h3 className="text-lg font-semibold text-white mb-6 w-full text-left">{title}</h3>
            
            <div className="w-full h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value: any) => [`${value}`, 'Amount']}
                            contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text Overlay */}
                {(centerText || centerSubtext) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        {centerText && <span className="text-2xl font-bold text-white">{centerText}</span>}
                        {centerSubtext && <span className="text-xs text-white/50">{centerSubtext}</span>}
                    </div>
                )}
            </div>
            
            {/* Custom Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
                {data.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-white/70">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
