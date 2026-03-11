'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCcw } from 'lucide-react';

const mockQuestions = [
    {
        id: 1,
        category: 'Quantitative Aptitude',
        text: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both the pipes are used together, then how long will it take to fill the tank?',
        options: ['10 mins', '12 mins', '15 mins', '25 mins'],
        correctAnswer: 1 // index 1 is '12 mins'
    },
    {
        id: 2,
        category: 'Logical Reasoning',
        text: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
        options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
        correctAnswer: 1 // index 1 is '(1/8)'
    },
    {
        id: 3,
        category: 'Verbal Ability',
        text: 'Find the correctly spelt word.',
        options: ['Ommission', 'Omision', 'Omission', 'Ommision'],
        correctAnswer: 2 // index 2 is 'Omission'
    }
];

export default function AptitudePracticePage() {
    const [testState, setTestState] = useState<'idle' | 'running' | 'completed'>('idle');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (testState === 'running' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && testState === 'running') {
            setTestState('completed');
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSelectOption = (optIndex: number) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: optIndex
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setTestState('completed');
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateResult = () => {
        let correct = 0;
        mockQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) correct++;
        });
        return {
            correct,
            total: mockQuestions.length,
            accuracy: Math.round((correct / mockQuestions.length) * 100)
        };
    };

    // View State: Welcome / Category Selection
    if (testState === 'idle') {
        const categories = [
            { name: 'Quantitative Aptitude', questions: 45, time: '60 mins', color: 'text-blue-400 bg-blue-500/10' },
            { name: 'Logical Reasoning', questions: 30, time: '45 mins', color: 'text-purple-400 bg-purple-500/10' },
            { name: 'Verbal Ability', questions: 40, time: '40 mins', color: 'text-green-400 bg-green-500/10' },
        ];

        return (
            <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Aptitude Practice Tests</h1>
                    <p className="text-white/60 max-w-lg mx-auto">Enhance your problem-solving speed and logical thinking with our curated category-wise tests tailored for company placements.</p>
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
                                <span>{cat.questions} Qs</span>
                                <span>•</span>
                                <span>{cat.time}</span>
                            </div>
                            <button 
                                onClick={() => {
                                    setTestState('running');
                                    setTimeLeft(5 * 60); // Reset for demo
                                    setCurrentQuestionIndex(0);
                                    setAnswers({});
                                }} 
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

    const currentQ = mockQuestions[currentQuestionIndex];
    const { correct, total, accuracy } = calculateResult();

    // View State: Test Results
    if (testState === 'completed') {
        return (
            <div className="max-w-3xl mx-auto py-12 animate-in slide-in-from-bottom-8 duration-500">
                <div className="bg-[#0a0618] border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-8">
                        <div>
                            <div className="w-24 h-24 mx-auto bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/20">
                                <AwardIcon className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Test Completed!</h2>
                            <p className="text-white/60">Here is your performance summary for this mock test.</p>
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
                            <button className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-medium transition-colors shadow-lg shadow-brand-500/25">
                                Review Answers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // View State: Test Running
    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto animate-in fade-in">
            {/* Header */}
            <div className="bg-[#0a0618] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-lg shrink-0 mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-white font-bold">{currentQ.category}</span>
                    <span className="text-white/40 text-sm">Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm font-bold ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-brand-500/20 text-brand-400'}`}>
                    <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </div>
            </div>

            {/* Question Body */}
            <div className="flex-1 overflow-y-auto w-full bg-[#0a0618] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl space-y-8 relative">
                <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                    {currentQ.text}
                </p>

                <div className="space-y-4 pt-4">
                    {currentQ.options.map((opt, idx) => {
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

            {/* Footer Navigation */}
            <div className="flex items-center justify-between shrink-0 mt-6 pb-8">
                <button 
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                    {mockQuestions.map((_, i) => (
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
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20 font-medium transition-colors flex items-center gap-2"
                >
                    {currentQuestionIndex === mockQuestions.length - 1 ? 'Submit Test' : 'Next Question'} 
                    {currentQuestionIndex < mockQuestions.length - 1 && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}

// Inline Award Icon since lucide might conflict heavily today with basic 'Award'
function AwardIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
    )
}
