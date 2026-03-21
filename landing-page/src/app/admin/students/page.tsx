'use client';

import React, { useState, useEffect } from 'react';
import { UserX, ExternalLink, Download, X, Code, Brain, TrendingUp, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { Modal } from '@/components/admin/ui/Modal';
import { api } from '@/lib/api';

export default function StudentsManagement() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await api.getAdminUsers();
            setStudents(data);
        } catch (err) {
            console.error('Failed to fetch students:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCompanyReadinessColor = (readiness: number) => {
        if (readiness >= 85) return 'text-green-400';
        if (readiness >= 65) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getReadinessBg = (readiness: number) => {
        if (readiness >= 85) return 'bg-green-400';
        if (readiness >= 65) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    const handleDeactivate = (id: number, name: string) => {
        if (confirm(`Are you sure you want to deactivate ${name}'s account?`)) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
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

            {loading ? (
                <div className="text-center py-20 text-white/50">Loading users...</div>
            ) : (
                <Table headers={['Student', 'Progress Metrics', 'Company Readiness', 'Actions']}>
                    {students.map((student) => (
                        <TableRow key={student.id}>

                        {/* Student Info */}
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm border border-brand-500/30">
                                    {student.name ? student.name.split(' ').map((n: string) => n[0]).join('') : '?'}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{student.name || 'Unknown User'}</p>
                                    <p className="text-xs text-white/50">{student.email}</p>
                                </div>
                            </div>
                        </TableCell>

                        {/* Metrics */}
                        <TableCell>
                            <div className="space-y-1 text-sm">
                                <p className="text-white/80">Coding: <span className="text-blue-400 font-medium">{student.solved} solved</span></p>
                                <p className="text-white/80">Aptitude: <span className="text-emerald-400 font-medium">{student.aptitude}% accuracy</span></p>
                            </div>
                        </TableCell>

                        {/* Readiness */}
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getReadinessBg(student.readiness || 0)}`}
                                        style={{ width: `${student.readiness || 0}%` }}
                                    />
                                </div>
                                <span className={`font-bold text-sm ${getCompanyReadinessColor(student.readiness || 0)}`}>
                                    {student.readiness || 0}%
                                </span>
                            </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setSelectedStudent(student)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-400 hover:text-white bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 rounded-md transition-colors"
                                >
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
            )}

            {/* Student Profile Modal */}
            <Modal
                isOpen={!!selectedStudent}
                onClose={() => setSelectedStudent(null)}
                title={`${selectedStudent?.name || 'Student'} — Profile`}
                footer={
                    <Button variant="outline" className="text-sm px-4 py-2 h-auto" onClick={() => setSelectedStudent(null)}>Close</Button>
                }
            >
                {selectedStudent && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                                {selectedStudent.name ? selectedStudent.name.split(' ').map((n: string) => n[0]).join('') : '?'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{selectedStudent.name || 'Unknown'}</h3>
                                <p className="text-white/50 flex items-center gap-1.5 text-sm"><Mail className="w-3.5 h-3.5" /> {selectedStudent.email}</p>
                                <p className="text-white/40 flex items-center gap-1.5 text-xs mt-1"><Calendar className="w-3 h-3" /> Joined {formatDate(selectedStudent.created_at)}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <Code className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{selectedStudent.solved}</p>
                                <p className="text-xs text-white/50">Problems Solved</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <Brain className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{selectedStudent.aptitude}%</p>
                                <p className="text-xs text-white/50">Aptitude Accuracy</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <TrendingUp className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{selectedStudent.readiness || 0}%</p>
                                <p className="text-xs text-white/50">Readiness Score</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{selectedStudent.total_submissions}</p>
                                <p className="text-xs text-white/50">Total Submissions</p>
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">Detailed Breakdown</h4>
                            
                            {/* Coding Progress */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/70">Coding Progress</span>
                                    <span className="text-sm font-bold text-blue-400">{selectedStudent.solved} problems</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${Math.min((selectedStudent.solved / 10) * 100, 100)}%` }} />
                                </div>
                                <p className="text-xs text-white/40 mt-1">{selectedStudent.total_submissions} total code submissions</p>
                            </div>
                            
                            {/* Aptitude Performance */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/70">Aptitude Performance</span>
                                    <span className="text-sm font-bold text-emerald-400">{selectedStudent.aptitude}% accuracy</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${selectedStudent.aptitude}%` }} />
                                </div>
                                <p className="text-xs text-white/40 mt-1">{selectedStudent.aptitude_correct || 0} correct out of {selectedStudent.aptitude_total || 0} aptitude questions attempted</p>
                            </div>

                            {/* Company Readiness */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/70">Company Readiness</span>
                                    <span className={`text-sm font-bold ${getCompanyReadinessColor(selectedStudent.readiness || 0)}`}>{selectedStudent.readiness || 0}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${getReadinessBg(selectedStudent.readiness || 0)}`} style={{ width: `${selectedStudent.readiness || 0}%` }} />
                                </div>
                                <p className="text-xs text-white/40 mt-1">Based on 50% coding progress + 50% aptitude accuracy</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
