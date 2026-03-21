'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, ArrowRight, ArrowLeft, RefreshCcw } from 'lucide-react';
import { api } from '@/lib/api';

interface Question {
    id: string;
    category: string;
    question: string;
    options: string[];
    correct_answer: number;
    difficulty: string;
}

export default function AptitudePracticePage() {
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [testQuestions, setTestQuestions] = useState<Question[]>([]);
    const [testState, setTestState] = useState<'idle' | 'running' | 'completed'>('idle');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAptitude()
            .then((data: Question[]) => setAllQuestions(data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (testState === 'running' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && testState === 'running') {
            finishTest();
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSelectOption = (optIndex: number) => {
        setAnswers({ ...answers, [currentQuestionIndex]: optIndex });
    };

    const handleNext = () => {
        if (currentQuestionIndex < testQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishTest();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const shuffle = <T,>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const startTest = (category?: string) => {
        let qs = allQuestions;
        if (category) qs = allQuestions.filter(q => q.category === category);
        if (qs.length === 0) qs = allQuestions; // fallback
        setTestQuestions(shuffle(qs).slice(0, 10)); // shuffle + max 10 per test
        setTestState('running');
        setTimeLeft(5 * 60);
        setCurrentQuestionIndex(0);
        setAnswers({});
    };

    const calculateResult = () => {
        let correct = 0;
        testQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correct_answer) correct++;
        });
        return {
            correct,
            total: testQuestions.length,
            accuracy: testQuestions.length > 0 ? Math.round((correct / testQuestions.length) * 100) : 0
        };
    };

    const finishTest = async () => {
        setTestState('completed');
        try {
            const submissions = testQuestions.map((q, idx) => ({
                question_id: q.id,
                selected_option: answers[idx] !== undefined ? answers[idx] : -1,
                is_correct: answers[idx] === q.correct_answer
            })).filter(sub => sub.selected_option !== -1); // only submit answered questions

            if (submissions.length > 0) {
                await api.submitAptitude(submissions);
            }
        } catch (error) {
            console.error('Failed to submit aptitude test:', error);
        }
    };

    // Count per category
    const categoryCounts: Record<string, number> = {};
    allQuestions.forEach(q => {
        categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    });

    // Loading state
    if (loading) {
        return <div className="text-center py-20 text-white/50 animate-in fade-in">Loading questions from database...</div>;
    }

    // View State: Welcome / Category Selection
    if (testState === 'idle') {
        const categories = [
            { name: 'Quantitative', color: 'text-blue-400 bg-blue-500/10' },
            { name: 'Logical', color: 'text-purple-400 bg-purple-500/10' },
            { name: 'Verbal', color: 'text-green-400 bg-green-500/10' },
        ];

        return (
            <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Aptitude Practice Tests</h1>
                    <p className="text-white/60 max-w-lg mx-auto">Enhance your problem-solving speed and logical thinking with category-wise tests from the database ({allQuestions.length} questions available).</p>
                    {allQuestions.length === 0 && (
                        <p className="text-brand-400 text-sm mt-2">No problems seeded in the database. Please contact an admin.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col items-center text-center group cursor-pointer border-t-4 hover:border-t-brand-400 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${cat.color}`}>
                                <PlayCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                            <div className="flex gap-4 text-sm font-medium text-white/50 mb-8">
                                <span>{categoryCounts[cat.name] || 0} Qs</span>
                            </div>
                            <button 
                                onClick={() => startTest(cat.name)} 
                                className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-xl transition-colors font-medium relative z-10"
                            >
                                Start Test
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const currentQ = testQuestions[currentQuestionIndex];
    const { correct, total, accuracy } = calculateResult();

    // View State: Test Results
    if (testState === 'completed') {
        return (
            <div className="max-w-3xl mx-auto py-12 animate-in slide-in-from-bottom-8 duration-500">
                <div className="bg-[#0a0618] border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <div>
                            <div className="w-24 h-24 mx-auto bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/20">
                                <AwardIcon className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Test Completed!</h2>
                            <p className="text-white/60">Here is your performance summary for this test.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <p className="text-sm text-white/50 mb-1">Score</p>
                                <p className="text-3xl font-bold text-brand-400">{correct}<span className="text-xl text-white/30">/{total}</span></p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <p className="text-sm text-white/50 mb-1">Accuracy</p>
                                <p className="text-3xl font-bold text-green-400">{accuracy}%</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <p className="text-sm text-white/50 mb-1">Time Taken</p>
                                <p className="text-3xl font-bold text-amber-400">{formatTime(300 - timeLeft)}</p>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4 justify-center">
                            <button 
                                onClick={() => setTestState('idle')}
                                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-2"
                            >
                                <RefreshCcw className="w-4 h-4" /> Try Another Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQ) return null;

    // View State: Test Running
    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto animate-in fade-in">
            <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-lg shrink-0 mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-white font-bold">{currentQ.category}</span>
                    <span className="text-white/40 text-sm">Question {currentQuestionIndex + 1} of {testQuestions.length}</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm font-bold ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-brand-500/20 text-brand-400'}`}>
                    <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full bg-[#0a0618] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl space-y-8 relative">
                <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                    {currentQ.question}
                </p>
                <div className="space-y-4 pt-4">
                    {(currentQ.options || []).map((opt: string, idx: number) => {
                        const isSelected = answers[currentQuestionIndex] === idx;
                        return (
                            <div 
                                key={idx}
                                onClick={() => handleSelectOption(idx)}
                                className={`w-full p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-200
                                    ${isSelected 
                                        ? 'bg-brand-500/10 border-brand-500 shadow-[inset_0_0_20px_rgba(124,58,237,0.1)]' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                                    }
                                `}
                            >
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors
                                    ${isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-white/30'}
                                `}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <span className={`text-lg ${isSelected ? 'text-white' : 'text-white/80'}`}>{opt}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between shrink-0 mt-6 pb-8">
                <button 
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex gap-2">
                    {testQuestions.map((_: Question, i: number) => (
                        <div 
                            key={i} 
                            onClick={() => setCurrentQuestionIndex(i)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all border font-medium text-sm
                                ${currentQuestionIndex === i 
                                    ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' 
                                    : answers[i] !== undefined 
                                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                        : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                                }
                            `}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                <button 
                    onClick={currentQuestionIndex === testQuestions.length - 1 ? finishTest : handleNext}
                    className={`px-6 py-3 rounded-xl text-white font-medium transition-colors flex items-center gap-2
                        ${currentQuestionIndex === testQuestions.length - 1 ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-500 hover:bg-brand-400'}
                    `}
                >
                    {currentQuestionIndex === testQuestions.length - 1 ? 'Finish Test' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function AwardIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
    )
}
