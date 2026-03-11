'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Table, TableRow, TableCell } from '@/components/admin/ui/Table';
import { Modal } from '@/components/admin/ui/Modal';
import { FormInput, FormSelect } from '@/components/admin/ui/FormComponents';

// Mock Data
const initialQuestions = [
    { id: 1, question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", category: "Quantitative", difficulty: "Medium" },
    { id: 2, question: "Find the missing number in the series: 2, 5, 10, 17, 26, ?", category: "Logical", difficulty: "Easy" },
    { id: 3, question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:", category: "Quantitative", difficulty: "Hard" },
    { id: 4, question: "Choose the word which is the exact OPPOSITE of the word ENORMOUS.", category: "Verbal", difficulty: "Easy" },
    { id: 5, question: "If 'A' means 'add', 'B' means 'subtract', 'C' means 'multiply' and 'D' means 'divide', what is 10 C 4 A 4 C 4 B 6?", category: "Logical", difficulty: "Medium" },
];

export default function AptitudeManagement() {
    const [questions, setQuestions] = useState(initialQuestions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        category: 'Quantitative',
        difficulty: 'Medium',
    });

    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        const newQuestion = {
            id: Date.now(),
            question: formData.question,
            category: formData.category,
            difficulty: formData.difficulty,
        };
        setQuestions([newQuestion, ...questions]);
        setIsModalOpen(false);
        // Reset Form
        setFormData({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', category: 'Quantitative', difficulty: 'Medium' });
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
                <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Question
                </Button>
            </div>

            <Table headers={['Question', 'Category', 'Difficulty', 'Actions']}>
                {questions.map((q) => (
                    <TableRow key={q.id}>
                        <TableCell className="font-medium text-white max-w-md truncate" title={q.question}>
                            {q.question}
                        </TableCell>
                        <TableCell>{q.category}</TableCell>
                        <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(q.difficulty)}`}>
                                {q.difficulty}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-white/50 hover:text-brand-400 hover:bg-white/5 rounded-md transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setQuestions(questions.filter(item => item.id !== q.id))}
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
                onClose={() => setIsModalOpen(false)}
                title="Add Aptitude Question"
                footer={
                    <>
                        <Button variant="outline" className="text-sm px-4 py-2 h-auto" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" className="text-sm px-4 py-2 h-auto" onClick={handleAddQuestion}>Save Question</Button>
                    </>
                }
            >
                <form id="add-question-form" onSubmit={handleAddQuestion} className="space-y-4">
                    <FormInput
                        label="Question Text"
                        id="question"
                        placeholder="Type the question here..."
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Option A" id="optionA" value={formData.optionA} onChange={(e) => setFormData({ ...formData, optionA: e.target.value })} required />
                        <FormInput label="Option B" id="optionB" value={formData.optionB} onChange={(e) => setFormData({ ...formData, optionB: e.target.value })} required />
                        <FormInput label="Option C" id="optionC" value={formData.optionC} onChange={(e) => setFormData({ ...formData, optionC: e.target.value })} required />
                        <FormInput label="Option D" id="optionD" value={formData.optionD} onChange={(e) => setFormData({ ...formData, optionD: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormSelect
                            label="Correct Answer"
                            id="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                            options={[
                                { value: 'A', label: 'Option A' }, { value: 'B', label: 'Option B' },
                                { value: 'C', label: 'Option C' }, { value: 'D', label: 'Option D' }
                            ]}
                        />
                        <FormSelect
                            label="Category"
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            options={[
                                { value: 'Quantitative', label: 'Quantitative' },
                                { value: 'Logical', label: 'Logical' },
                                { value: 'Verbal', label: 'Verbal' }
                            ]}
                        />
                        <FormSelect
                            label="Difficulty"
                            id="difficulty"
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            options={[
                                { value: 'Easy', label: 'Easy' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Hard', label: 'Hard' }
                            ]}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
