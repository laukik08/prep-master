'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Send, ChevronLeft, Settings, RefreshCw, AlertTriangle, Layers, BookOpen, Clock } from 'lucide-react';
import { CodeEditor } from '@/components/student/ui/CodeEditor';

const problemData = {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Apple'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' },
        { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: '' },
    ],
    constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
    ]
};

const initialCodeSnippets: Record<string, string> = {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
};

export default function ProblemSolvingPage({ params }: { params: { id: string } }) {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(initialCodeSnippets['javascript']);
    const [isRunning, setIsRunning] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<{ status: string, time?: string, memory?: string } | null>(null);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(initialCodeSnippets[newLang]);
    };

    const handleRunCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            setConsoleOutput({ status: 'Accepted', time: '52ms', memory: '41.2 MB' });
            setIsRunning(false);
        }, 1200);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-4 p-4 lg:p-0">
            {/* Left Panel: Problem Context */}
            <div className="w-full md:w-1/2 flex flex-col bg-[#0a0618] border border-white/10 rounded-xl overflow-hidden shadow-2xl shrink-0">
                <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/practice" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                        <h1 className="text-xl font-bold text-white">{problemData.id}. {problemData.title}</h1>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 nice-scrollbar space-y-8">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                            {problemData.difficulty}
                        </span>
                        <div className="h-4 w-px bg-white/20" />
                        <div className="flex gap-2">
                            {problemData.topics.map(t => (
                                <span key={t} className="text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                                    <Layers className="w-3 h-3" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert max-w-none text-white/80">
                        {problemData.description.split('\\n\\n').map((paragraph, index) => (
                            <p key={index} className="leading-relaxed whitespace-pre-line">{paragraph}</p>
                        ))}
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-brand-400" /> Examples
                        </h3>
                        {problemData.examples.map((ex, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                                <div className="text-white/90"><strong>Input:</strong> <span className="font-mono text-sm text-brand-300">{ex.input}</span></div>
                                <div className="text-white/90"><strong>Output:</strong> <span className="font-mono text-sm text-green-300">{ex.output}</span></div>
                                {ex.explanation && (
                                    <div className="text-white/60 text-sm mt-2 border-t border-white/10 pt-2">
                                        <strong>Explanation:</strong> {ex.explanation}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Constraints */}
                    <div className="space-y-4 pb-8">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-400" /> Constraints
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-white/80">
                            {problemData.constraints.map((c, i) => (
                                <li key={i} className="font-mono text-sm bg-white/5 inline-block px-2 py-1 rounded border border-white/5 ml-4">{c}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Panel: Editor & Console */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 min-h-[500px]">
                {/* Editor Section */}
                <div className="flex-1 flex flex-col bg-[#0a0618] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="h-14 border-b border-white/10 bg-[#1e1e1e] flex items-center justify-between px-4 shrink-0">
                        <select 
                            value={language}
                            onChange={handleLanguageChange}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-500 font-medium"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python 3</option>
                            <option value="cpp">C++</option>
                        </select>
                        <div className="flex items-center gap-4 text-white/50">
                            <button className="hover:text-white transition-colors" title="Settings"><Settings className="w-4 h-4" /></button>
                            <button className="hover:text-white transition-colors" onClick={() => setCode(initialCodeSnippets[language])} title="Reset"><RefreshCw className="w-4 h-4" /></button>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                        <CodeEditor 
                            language={language}
                            code={code}
                            onChange={(val) => setCode(val || '')}
                        />
                    </div>
                </div>

                {/* Console / Verdict Section */}
                <div className="h-48 shrink-0 bg-[#0a0618] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col relative group">
                    <div className="h-10 border-b border-white/10 bg-white/[0.02] flex items-center justify-between px-4">
                        <span className="text-sm font-semibold text-white/80">Console</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {!consoleOutput && !isRunning && (
                            <div className="h-full flex flex-col items-center justify-center text-white/30 text-sm">
                                <Clock className="w-6 h-6 mb-2 opacity-50" />
                                Run your code to see output here.
                            </div>
                        )}
                        {isRunning && (
                            <div className="h-full flex items-center justify-center text-brand-400 text-sm font-medium animate-pulse">
                                Executing Code...
                            </div>
                        )}
                        {consoleOutput && !isRunning && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                <h3 className={`text-xl font-bold ${consoleOutput.status === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>
                                    {consoleOutput.status}
                                </h3>
                                <div className="flex items-center gap-6">
                                    {consoleOutput.time && (
                                        <div className="text-sm text-white/70">
                                            <span className="text-white/40">Runtime:</span> <span className="font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{consoleOutput.time}</span>
                                        </div>
                                    )}
                                    {consoleOutput.memory && (
                                        <div className="text-sm text-white/70">
                                            <span className="text-white/40">Memory:</span> <span className="font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{consoleOutput.memory}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Action Bar (Absolute bottom of right panel) */}
                    <div className="absolute top-1 right-2 flex justify-end gap-3 z-10 p-4">
                        <button 
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                        >
                            <Play className="w-4 h-4" /> Run
                        </button>
                        <button 
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="bg-brand-500 hover:bg-brand-400 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] disabled:opacity-50 disabled:cursor-not-allowed border border-brand-500/50"
                        >
                            <Send className="w-4 h-4" /> Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
