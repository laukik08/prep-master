import React from 'react';

interface QuestionCardProps {
    title: string;
    category: string;
    difficulty: string;
    completed?: boolean;
    onClick?: () => void;
}

export function QuestionCard({ title, category, difficulty, completed = false, onClick }: QuestionCardProps) {
    const getDifficultyColor = (diff: string) => {
        switch (diff.toLowerCase()) {
            case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div 
            onClick={onClick}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden isolate"
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-gradient-to-br from-brand-500/5 to-transparent`} />
            
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h3 className={`font-semibold text-lg ${completed ? 'text-white/60 line-through' : 'text-white group-hover:text-brand-300'} transition-colors line-clamp-2`}>
                        {title}
                    </h3>
                    <p className="text-sm text-white/50">{category}</p>
                </div>
                {completed && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                </span>
                
                <span className="text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Solve <span aria-hidden="true">&rarr;</span>
                </span>
            </div>
        </div>
    );
}
