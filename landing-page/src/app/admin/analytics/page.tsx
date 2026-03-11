'use client';

import React from 'react';
import { ChartCard } from '@/components/admin/ui/ChartCard';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

// Mock Data
const topicPerformanceData = [
    { topic: 'Arrays', accuracy: 85 },
    { topic: 'Strings', accuracy: 78 },
    { topic: 'Linked Lists', accuracy: 65 },
    { topic: 'Trees', accuracy: 55 },
    { topic: 'Dynamic Prog', accuracy: 40 },
    { topic: 'Graphs', accuracy: 45 },
];

const aptitudeCategoryData = [
    { name: 'Quantitative', value: 45 },
    { name: 'Logical', value: 35 },
    { name: 'Verbal', value: 20 },
];

const aptitudeTrendData = [
    { month: 'Jan', quant: 65, logical: 70, verbal: 60 },
    { month: 'Feb', quant: 70, logical: 72, verbal: 65 },
    { month: 'Mar', quant: 75, logical: 78, verbal: 68 },
    { month: 'Apr', quant: 82, logical: 85, verbal: 75 },
    { month: 'May', quant: 88, logical: 90, verbal: 82 },
];

const companyDistributionData = [
    { name: 'TCS (Mass)', count: 450 },
    { name: 'Infosys', count: 320 },
    { name: 'Wipro', count: 280 },
    { name: 'Capgemini', count: 150 },
    { name: 'Product Based', count: 50 },
];

const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Platform Analytics</h1>
                <p className="text-white/50 mt-1">Deep dive into student performance and platform usage metrics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Topic Wise Performance */}
                <ChartCard title="Coding Topic Accuracy %" subtitle="Average student success rate per topic">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart layout="vertical" data={topicPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis dataKey="topic" type="category" stroke="rgba(255,255,255,0.7)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="accuracy" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                                {topicPerformanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.accuracy >= 70 ? '#10b981' : entry.accuracy >= 50 ? '#f59e0b' : '#ef4444'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Aptitude Question Distribution */}
                <ChartCard title="Aptitude Practice Focus" subtitle="Question attempts by category">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={aptitudeCategoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="rgba(255,255,255,0.05)"
                            >
                                {aptitudeCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Aptitude Trends Over Time */}
                <ChartCard title="Aptitude Score Trends" subtitle="Average monthly performance (out of 100)">
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={aptitudeTrendData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Line type="stepAfter" dataKey="quant" name="Quantitative" stroke="#7c3aed" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            <Line type="stepAfter" dataKey="logical" name="Logical" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            <Line type="stepAfter" dataKey="verbal" name="Verbal" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Target Company Readiness */}
                <ChartCard title="Target Company Readiness" subtitle="Students meeting threshold per company category">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={companyDistributionData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} interval={0} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40}>
                                {companyDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

            </div>
        </div>
    );
}
