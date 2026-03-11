'use client';

import React, { useState } from 'react';
import { UserX, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';

// Mock Data
const initialStudents = [
    { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", solved: 145, aptitude: 92, readiness: 85 },
    { id: 2, name: "Priya Patel", email: "priya.p@example.com", solved: 210, aptitude: 88, readiness: 90 },
    { id: 3, name: "Amit Kumar", email: "amit.k@example.com", solved: 45, aptitude: 55, readiness: 40 },
    { id: 4, name: "Neha Gupta", email: "neha.g@example.com", solved: 320, aptitude: 95, readiness: 98 },
    { id: 5, name: "Vikram Singh", email: "vikram.s@example.com", solved: 85, aptitude: 68, readiness: 65 },
    { id: 6, name: "Anjali Desai", email: "anjali.d@example.com", solved: 180, aptitude: 82, readiness: 75 },
];

export default function StudentsManagement() {
    const [students, setStudents] = useState(initialStudents);

    const getCompanyReadinessColor = (readiness: number) => {
        if (readiness >= 85) return 'text-green-400';
        if (readiness >= 65) return 'text-yellow-400';
        return 'text-red-400';
    };

    const handleDeactivate = (id: number, name: string) => {
        if (confirm(`Are you sure you want to deactivate ${name}'s account?`)) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Student Accounts</h1>
                    <p className="text-white/50 mt-1">Manage and monitor all registered students on the platform.</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2 border-white/10 hover:bg-white/5 bg-transparent text-white">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            <Table headers={['Student', 'Progress Metrics', 'Company Readiness', 'Actions']}>
                {students.map((student) => (
                    <TableRow key={student.id}>

                        {/* Student Info */}
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm border border-brand-500/30">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{student.name}</p>
                                    <p className="text-xs text-white/50">{student.email}</p>
                                </div>
                            </div>
                        </TableCell>

                        {/* Metrics */}
                        <TableCell>
                            <div className="space-y-1 text-sm">
                                <p className="text-white/80">Coding: <span className="text-blue-400 font-medium">{student.solved} solved</span></p>
                                <p className="text-white/80">Aptitude: <span className="text-emerald-400 font-medium">{student.aptitude}% avg</span></p>
                            </div>
                        </TableCell>

                        {/* Readiness */}
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${student.readiness >= 85 ? 'bg-green-400' : student.readiness >= 65 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                        style={{ width: `${student.readiness}%` }}
                                    />
                                </div>
                                <span className={`font-bold text-sm ${getCompanyReadinessColor(student.readiness)}`}>
                                    {student.readiness}%
                                </span>
                            </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-400 hover:text-white bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 rounded-md transition-colors">
                                    <ExternalLink className="w-3.5 h-3.5" /> Profile
                                </button>
                                <button
                                    onClick={() => handleDeactivate(student.id, student.name)}
                                    className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"
                                    title="Deactivate Account"
                                >
                                    <UserX className="w-4 h-4" />
                                </button>
                            </div>
                        </TableCell>

                    </TableRow>
                ))}
            </Table>
        </div>
    );
}
