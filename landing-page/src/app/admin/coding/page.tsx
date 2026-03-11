'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { Modal } from '@/components/admin/ui/Modal';
import { FormInput, FormSelect, FormTextarea } from '@/components/admin/ui/FormComponents';

// Mock Data
const initialProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays & Hashing" },
    { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window" },
    { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search" },
    { id: 4, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack" },
    { id: 5, title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Linked List, Heap" },
];

export default function CodingProblemsManagement() {
    const [problems, setProblems] = useState(initialProblems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Add Problem Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Medium',
        topic: '',
        constraints: '',
        exampleInput: '',
        exampleOutput: '',
        visibleTestCases: '',
        hiddenTestCases: ''
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSaveProblem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setProblems(problems.map(p => 
                p.id === editingId ? { ...p, title: formData.title, difficulty: formData.difficulty, topic: formData.topic || 'General' } : p
            ));
        } else {
            const newProblem = {
                id: Date.now(),
                title: formData.title,
                difficulty: formData.difficulty,
                topic: formData.topic || 'General',
            };
            setProblems([newProblem, ...problems]);
        }
        closeModal();
    };

    const openEditModal = (problemObj: any) => {
        setEditingId(problemObj.id);
        setFormData({ 
            title: problemObj.title, 
            description: '', // Mocked detail
            difficulty: problemObj.difficulty, 
            topic: problemObj.topic, 
            constraints: '', 
            exampleInput: '', 
            exampleOutput: '', 
            visibleTestCases: '', 
            hiddenTestCases: '' 
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', exampleInput: '', exampleOutput: '', visibleTestCases: '', hiddenTestCases: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditingId(null);
            setFormData({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', exampleInput: '', exampleOutput: '', visibleTestCases: '', hiddenTestCases: '' });
        }, 200);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Coding Problems</h1>
                    <p className="text-white/50 mt-1">Manage DSA challenges and programming test cases.</p>
                </div>
                <Button variant="primary" className="flex items-center gap-2" onClick={openAddModal}>
                    <Plus className="w-4 h-4" />
                    Add Problem
                </Button>
            </div>

            <Table headers={['Problem Title', 'Difficulty', 'Topic', 'Actions']}>
                {problems.map((p) => (
                    <TableRow key={p.id}>
                        <TableCell className="font-medium text-white">{p.title}</TableCell>
                        <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(p.difficulty)}`}>
                                {p.difficulty}
                            </span>
                        </TableCell>
                        <TableCell className="text-white/70">{p.topic}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => openEditModal(p)}
                                    className="p-1.5 text-white/50 hover:text-brand-400 hover:bg-white/5 rounded-md transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setProblems(problems.filter(item => item.id !== p.id))}
                                    className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingId ? "Edit Coding Problem" : "Add Coding Problem"}
                footer={
                    <>
                        <Button variant="outline" className="text-sm px-4 py-2 h-auto" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" className="text-sm px-4 py-2 h-auto" onClick={handleSaveProblem}>
                            {editingId ? "Save Changes" : "Save Problem"}
                        </Button>
                    </>
                }
            >
                <form id="add-problem-form" onSubmit={handleSaveProblem} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">Basic Details</h3>
                        <FormInput label="Problem Title" id="title" placeholder="e.g. Two Sum" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormSelect
                                label="Difficulty" id="difficulty" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                options={[{ value: 'Easy', label: 'Easy' }, { value: 'Medium', label: 'Medium' }, { value: 'Hard', label: 'Hard' }]}
                            />
                            <FormInput label="Topic Tags (comma separated)" id="topic" placeholder="Arrays, Hash Table" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
                        </div>
                        <FormTextarea label="Problem Description" id="description" placeholder="Describe the problem, input format, output format..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">Constraints & Examples</h3>
                        <FormTextarea label="Constraints" id="constraints" placeholder="2 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9" value={formData.constraints} onChange={(e) => setFormData({ ...formData, constraints: e.target.value })} className="font-mono text-sm" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormTextarea label="Example Input" id="exampleInput" placeholder="nums = [2,7,11,15], target = 9" value={formData.exampleInput} onChange={(e) => setFormData({ ...formData, exampleInput: e.target.value })} className="font-mono text-sm" />
                            <FormTextarea label="Example Output" id="exampleOutput" placeholder="[0,1]" value={formData.exampleOutput} onChange={(e) => setFormData({ ...formData, exampleOutput: e.target.value })} className="font-mono text-sm" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">Test Cases</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormTextarea label="Visible Test Cases (JSON)" id="visibleTestCases" placeholder="[{ input: '...', output: '...' }]" value={formData.visibleTestCases} onChange={(e) => setFormData({ ...formData, visibleTestCases: e.target.value })} className="font-mono text-sm text-brand-300" />
                            <FormTextarea label="Hidden Test Cases (JSON)" id="hiddenTestCases" placeholder="[{ input: '...', output: '...' }]" value={formData.hiddenTestCases} onChange={(e) => setFormData({ ...formData, hiddenTestCases: e.target.value })} className="font-mono text-sm text-brand-300" />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
