'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Send, ChevronLeft, Settings, RefreshCw, AlertTriangle, Layers, BookOpen, Clock } from 'lucide-react';
import { CodeEditor } from '@/components/student/ui/CodeEditor';
import { api } from '@/lib/api';

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

export default function ProblemSolvingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [problem, setProblem] = useState<any>(null);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(initialCodeSnippets['javascript']);
    const [isRunning, setIsRunning] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<any>(null);
    const [activeTestCase, setActiveTestCase] = useState(0);
    const router = useRouter();

    useEffect(() => {
        api.getProblem(id)
            .then(data => setProblem(data))
            .catch(err => {
                console.error('Failed to load problem:', err);
                router.push('/dashboard/practice');
            });
    }, [id, router]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(initialCodeSnippets[newLang]);
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setConsoleOutput(null);
        try {
            const result = await api.runCode({ language, code });
            setConsoleOutput({ 
                mode: 'run',
                status: result.status === 'Success' ? 'Execution Successful' : 'Runtime Error',
                stdout: result.stdout || '',
                stderr: result.stderr || '',
                time: result.executionTime
            });
        } catch (error: any) {
            setConsoleOutput({ mode: 'run', status: 'Execution Failed', stderr: error?.error || 'Connection error.', time: '-' });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmitCode = async () => {
        setIsRunning(true);
        setConsoleOutput(null);
        setActiveTestCase(0);
        try {
            const result = await api.submitCode({ language, code, problem_id: id });
            setConsoleOutput({
                mode: 'submit',
                verdict: result.verdict,
                total_tests: result.total_tests,
                tests_passed: result.tests_passed,
                total_time: result.total_time,
                test_results: result.test_results
            });
        } catch (error: any) {
            setConsoleOutput({ mode: 'run', status: 'Submission Failed', stderr: error?.error || 'Connection error.', time: '-' });
        } finally {
            setIsRunning(false);
        }
    };

    if (!problem) {
        return <div className="h-[calc(100vh-4rem)] flex items-center justify-center text-white/50 animate-in fade-in">Loading problem details...</div>;
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-4 p-4 lg:p-0">
            {/* Left Panel: Problem Context */}
            <div className="w-full md:w-1/2 flex flex-col bg-[#0a0618] border border-white/10 rounded-xl overflow-hidden shadow-2xl shrink-0">
                <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/practice" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                        <h1 className="text-xl font-bold text-white shrink truncate">{problem.title}</h1>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 nice-scrollbar space-y-8">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            problem.difficulty === 'Easy' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                            problem.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                            'text-red-400 bg-red-500/10 border-red-500/20'
                        }`}>
                            {problem.difficulty}
                        </span>
                        <div className="h-4 w-px bg-white/20" />
                        <div className="flex gap-2">
                            {(problem.topics || []).map((t: string) => (
                                <span key={t} className="text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                                    <Layers className="w-3 h-3" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert max-w-none text-white/80">
                        {String(problem.description || '').split('\\n\\n').map((paragraph: string, index: number) => (
                            <p key={index} className="leading-relaxed whitespace-pre-line">{paragraph}</p>
                        ))}
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-brand-400" /> Examples
                        </h3>
                        {problem.example_input || problem.example_output ? (
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                                <div className="text-white/90"><strong>Input:</strong> <span className="font-mono text-sm text-brand-300">{problem.example_input || '-'}</span></div>
                                <div className="text-white/90"><strong>Output:</strong> <span className="font-mono text-sm text-green-300">{problem.example_output || '-'}</span></div>
                            </div>
                        ) : (
                            <div className="text-white/40 italic">No examples provided for this problem.</div>
                        )}
                    </div>

                    {/* Constraints */}
                    <div className="space-y-4 pb-8">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-400" /> Constraints
                        </h3>
                        {problem.constraints ? (
                            <ul className="list-disc list-inside space-y-2 text-white/80">
                                {String(problem.constraints).split('\\n').map((c: string, i: number) => (
                                    <li key={i} className="font-mono text-sm bg-white/5 inline-block px-2 py-1 rounded border border-white/5 ml-4">{c}</li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-white/40 italic">No constraints provided for this problem.</div>
                        )}
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
                <div className="h-72 shrink-0 bg-[#0a0618] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col relative group">
                    <div className="h-10 border-b border-white/10 bg-white/[0.02] flex items-center justify-between px-4">
                        <span className="text-sm font-semibold text-white/80">Console</span>
                        {consoleOutput?.time && <span className="text-xs text-white/40 font-mono">Runtime: {consoleOutput.time}</span>}
                        {consoleOutput?.total_time && <span className="text-xs text-white/40 font-mono">Total: {consoleOutput.total_time}</span>}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto nice-scrollbar">
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

                        {/* RUN mode output */}
                        {consoleOutput && !isRunning && consoleOutput.mode === 'run' && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                <div className={`text-sm font-bold px-3 py-1.5 rounded-lg inline-block ${
                                    consoleOutput.status === 'Execution Successful'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>{consoleOutput.status}</div>
                                {consoleOutput.stdout && (
                                    <div>
                                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">stdout</span>
                                        <pre className="mt-1 bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-green-300 font-mono whitespace-pre-wrap">{consoleOutput.stdout}</pre>
                                    </div>
                                )}
                                {consoleOutput.stderr && (
                                    <div>
                                        <span className="text-xs font-semibold text-red-400/70 uppercase tracking-wider">stderr</span>
                                        <pre className="mt-1 bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-sm text-red-300 font-mono whitespace-pre-wrap">{consoleOutput.stderr}</pre>
                                    </div>
                                )}
                                {!consoleOutput.stdout && !consoleOutput.stderr && (
                                    <div className="text-sm text-white/40 italic">No output produced.</div>
                                )}
                            </div>
                        )}

                        {/* SUBMIT mode output — LeetCode-style test case results */}
                        {consoleOutput && !isRunning && consoleOutput.mode === 'submit' && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                {/* Verdict Header */}
                                <div className="flex items-center gap-3">
                                    <div className={`text-lg font-bold px-4 py-1.5 rounded-lg inline-block ${
                                        consoleOutput.verdict === 'Accepted'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>{consoleOutput.verdict}</div>
                                    <span className="text-sm text-white/50">
                                        {consoleOutput.tests_passed}/{consoleOutput.total_tests} test cases passed
                                    </span>
                                </div>

                                {/* Test Case Tabs */}
                                <div className="flex gap-2 flex-wrap">
                                    {consoleOutput.test_results?.map((tc: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveTestCase(i)}
                                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                                                activeTestCase === i 
                                                    ? 'bg-white/10 border-white/20 text-white'
                                                    : 'bg-white/[0.02] border-white/5 text-white/40 hover:text-white/60'
                                            }`}
                                        >
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${tc.passed ? 'bg-green-400' : 'bg-red-400'}`} />
                                            Case {tc.test_case}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Test Case Detail */}
                                {consoleOutput.test_results?.[activeTestCase] && (() => {
                                    const tc = consoleOutput.test_results[activeTestCase];
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Input</span>
                                                <pre className="mt-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-blue-300 font-mono whitespace-pre-wrap min-h-[40px]">{tc.input || '(none)'}</pre>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Expected</span>
                                                <pre className="mt-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-green-300 font-mono whitespace-pre-wrap min-h-[40px]">{tc.expected_output}</pre>
                                            </div>
                                            <div>
                                                <span className={`text-xs font-semibold uppercase tracking-wider ${tc.passed ? 'text-green-400/70' : 'text-red-400/70'}`}>Your Output</span>
                                                <pre className={`mt-1 border rounded-lg p-2.5 text-xs font-mono whitespace-pre-wrap min-h-[40px] ${
                                                    tc.passed ? 'bg-green-500/5 border-green-500/10 text-green-300' : 'bg-red-500/5 border-red-500/10 text-red-300'
                                                }`}>{tc.actual_output || tc.stderr || '(no output)'}</pre>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                    
                    {/* Action Bar */}
                    <div className="absolute top-1 right-2 flex justify-end gap-3 z-10 p-4">
                        <button 
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                        >
                            <Play className="w-4 h-4" /> Run
                        </button>
                        <button 
                            onClick={handleSubmitCode}
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
