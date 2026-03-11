'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { Modal } from '@/components/admin/ui/Modal';
import { FormInput, FormSelect } from '@/components/admin/ui/FormComponents';
import { api } from '@/lib/api';

export default function AptitudeManagement() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '0',
        category: 'Quantitative',
        difficulty: 'Medium',
    });

    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await api.getAptitude();
            setQuestions(data);
        } catch (err) {
            console.error('Failed to fetch questions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveQuestion = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const payload = {
            question: formData.question,
            options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
            correct_answer: parseInt(formData.correctAnswer),
            category: formData.category,
            difficulty: formData.difficulty,
        };
        try {
            if (editingId) {
                await api.updateAptitude(editingId, payload);
            } else {
                await api.createAptitude(payload);
            }
            await fetchQuestions();
            closeModal();
        } catch (err: any) {
            console.error('Failed to save question:', err);
            alert(err.error || err.message || 'Failed to save question');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteAptitude(id);
            setQuestions(questions.filter(q => q.id !== id));
        } catch (err: any) {
            console.error('Failed to delete question:', err);
            alert(err.error || err.message || 'Failed to delete question');
        }
    };

    const openEditModal = (questionObj: any) => {
        setEditingId(questionObj.id);
        const opts = questionObj.options || [];
        setFormData({
            question: questionObj.question,
            optionA: opts[0] || '', optionB: opts[1] || '',
            optionC: opts[2] || '', optionD: opts[3] || '',
            correctAnswer: String(questionObj.correct_answer ?? 0),
            category: questionObj.category,
            difficulty: questionObj.difficulty,
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '0', category: 'Quantitative', difficulty: 'Medium' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditingId(null);
            setFormData({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '0', category: 'Quantitative', difficulty: 'Medium' });
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
                    <h1 className="text-3xl font-bold text-white tracking-tight">Aptitude Questions</h1>
                    <p className="text-white/50 mt-1">Manage all multiple-choice aptitude questions.</p>
                </div>
                <Button variant="primary" className="flex items-center gap-2" onClick={openAddModal}>
                    <Plus className="w-4 h-4" />
                    Add Question
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-white/50">Loading questions...</div>
            ) : (
                <Table headers={['Question', 'Category', 'Difficulty', 'Actions']}>
                    {questions.map((q) => (
                        <TableRow key={q.id}>
                            <TableCell className="font-medium text-white max-w-md truncate">
                                <span title={q.question}>{q.question}</span>
                            </TableCell>
                            <TableCell>{q.category}</TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(q.difficulty)}`}>
                                    {q.difficulty}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => openEditModal(q)} className="p-1.5 text-white/50 hover:text-brand-400 hover:bg-white/5 rounded-md transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(q.id)} className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingId ? "Edit Question" : "Add Aptitude Question"}
                footer={
                    <>
                        <Button variant="outline" className="text-sm px-4 py-2 h-auto" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" className="text-sm px-4 py-2 h-auto" onClick={handleSaveQuestion}>
                            {editingId ? "Save Changes" : "Save Question"}
                        </Button>
                    </>
                }
            >
                <form id="add-question-form" onSubmit={handleSaveQuestion} className="space-y-4">
                    <FormInput label="Question Text" id="question" placeholder="Type the question here..." value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Option A" id="optionA" value={formData.optionA} onChange={(e) => setFormData({ ...formData, optionA: e.target.value })} required />
                        <FormInput label="Option B" id="optionB" value={formData.optionB} onChange={(e) => setFormData({ ...formData, optionB: e.target.value })} required />
                        <FormInput label="Option C" id="optionC" value={formData.optionC} onChange={(e) => setFormData({ ...formData, optionC: e.target.value })} required />
                        <FormInput label="Option D" id="optionD" value={formData.optionD} onChange={(e) => setFormData({ ...formData, optionD: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormSelect label="Correct Answer" id="correctAnswer" value={formData.correctAnswer} onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                            options={[{ value: '0', label: 'Option A' }, { value: '1', label: 'Option B' }, { value: '2', label: 'Option C' }, { value: '3', label: 'Option D' }]}
                        />
                        <FormSelect label="Category" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            options={[{ value: 'Quantitative', label: 'Quantitative' }, { value: 'Logical', label: 'Logical' }, { value: 'Verbal', label: 'Verbal' }]}
                        />
                        <FormSelect label="Difficulty" id="difficulty" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            options={[{ value: 'Easy', label: 'Easy' }, { value: 'Medium', label: 'Medium' }, { value: 'Hard', label: 'Hard' }]}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
