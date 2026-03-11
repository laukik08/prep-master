'use client';

import React, { useEffect, useState } from 'react';
import { Users, Code, CheckCircle, Target } from 'lucide-react';
import { StatCard } from '@/components/admin/ui/StatCard';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { ChartCard } from '@/components/admin/ui/ChartCard';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid
} from 'recharts';
import { api } from '@/lib/api';

const mockStudentActivity = [
    { id: 1, name: 'Alex Johnson', problems: 145, aptitude: 92, lastActive: '10 mins ago' },
    { id: 2, name: 'Priya Sharma', problems: 210, aptitude: 88, lastActive: '1 hour ago' },
    { id: 3, name: 'Michael Chen', problems: 85, aptitude: 76, lastActive: '3 hours ago' },
    { id: 4, name: 'Sarah Williams', problems: 320, aptitude: 95, lastActive: '5 hours ago' },
    { id: 5, name: 'Rohan Gupta', problems: 45, aptitude: 60, lastActive: '1 day ago' },
];

const mockCodingData = [
    { name: 'Mon', solved: 120 },
    { name: 'Tue', solved: 210 },
    { name: 'Wed', solved: 180 },
    { name: 'Thu', solved: 290 },
    { name: 'Fri', solved: 340 },
    { name: 'Sat', solved: 450 },
    { name: 'Sun', solved: 390 },
];

const mockAptitudeData = [
    { name: 'Week 1', score: 65 },
    { name: 'Week 2', score: 70 },
    { name: 'Week 3', score: 78 },
    { name: 'Week 4', score: 85 },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.getAdminStats().then(setStats).catch(console.error);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-white/50 mt-1">Welcome back. Here is what's happening on PrepMaster today.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats?.total_users ?? '—'}
                    icon={Users}
                    trend={{ value: 'Live', isPositive: true }}
                />
                <StatCard
                    title="Total Coding Problems"
                    value={stats?.total_problems ?? '—'}
                    icon={Code}
                />
                <StatCard
                    title="Total Aptitude Questions"
                    value={stats?.total_aptitude_questions ?? '—'}
                    icon={CheckCircle}
                />
                <StatCard
                    title="Total Submissions"
                    value={stats?.total_submissions ?? '—'}
                    icon={Target}
                    trend={{ value: 'Live', isPositive: true }}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
                <ChartCard title="Coding Problems Solved" subtitle="Daily completion rate across all students">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockCodingData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                            <Bar dataKey="solved" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Average Aptitude Performance" subtitle="Weekly aggregate score improvement">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockAptitudeData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip contentStyle={{ backgroundColor: '#0a0618', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Recent Activity Table */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Recent Student Activity</h2>
                <Table headers={['Student Name', 'Problems Solved', 'Aptitude Score', 'Last Active']}>
                    {mockStudentActivity.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium text-white">{student.name}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                                    {student.problems}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${student.aptitude >= 80 ? 'bg-green-400' : student.aptitude >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                            style={{ width: `${student.aptitude}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white/70">{student.aptitude}%</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-white/50 text-xs">{student.lastActive}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div>
    );
}
