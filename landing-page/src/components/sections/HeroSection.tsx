'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const codeLines = [
    { indent: 0, tokens: [{ text: 'import ', cls: 'text-pink-400' }, { text: "React, { useState } ", cls: 'text-brand-300' }, { text: 'from ', cls: 'text-pink-400' }, { text: "'react'", cls: 'text-green-300' }, { text: ';', cls: 'text-brand-300' }] },
    null,
    { indent: 0, tokens: [{ text: 'export default function ', cls: 'text-pink-400' }, { text: 'App', cls: 'text-blue-300' }, { text: '() {', cls: 'text-brand-300' }] },
    { indent: 1, tokens: [{ text: 'const ', cls: 'text-pink-400' }, { text: '[count, setCount] = ', cls: 'text-brand-300' }, { text: 'useState', cls: 'text-blue-300' }, { text: '(', cls: 'text-brand-300' }, { text: '0', cls: 'text-purple-400' }, { text: ');', cls: 'text-brand-300' }] },
    null,
    { indent: 1, tokens: [{ text: 'return ', cls: 'text-pink-400' }, { text: '(', cls: 'text-brand-300' }] },
    { indent: 2, tokens: [{ text: '<div className="', cls: 'text-white' }, { text: 'app-container min-h-screen', cls: 'text-green-300' }, { text: '">', cls: 'text-white' }] },
    { indent: 3, tokens: [{ text: '<h1>', cls: 'text-white' }, { text: 'Welcome to PrepMaster', cls: 'text-white' }, { text: '</h1>', cls: 'text-white' }] },
    { indent: 3, tokens: [{ text: '<p>', cls: 'text-white' }, { text: 'Practice smarter, get placed faster.', cls: 'text-white' }, { text: '</p>', cls: 'text-white' }] },
    { indent: 3, tokens: [{ text: '<button onClick={', cls: 'text-white' }, { text: '() => ', cls: 'text-pink-400' }, { text: 'setCount(count + 1)', cls: 'text-brand-300' }, { text: '}>', cls: 'text-white' }] },
    { indent: 4, tokens: [{ text: 'Solved {count} problems', cls: 'text-white' }] },
    { indent: 3, tokens: [{ text: '</button>', cls: 'text-white' }] },
    { indent: 2, tokens: [{ text: '</div>', cls: 'text-white' }] },
    { indent: 1, tokens: [{ text: ');', cls: 'text-brand-300' }] },
    { indent: 0, tokens: [{ text: '}', cls: 'text-brand-300' }] },
];

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const editorScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section ref={sectionRef} id="main" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 bg-grid-pattern">
            {/* Animated background glow */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-0 left-1/2 w-[900px] h-[600px] bg-brand-600/20 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"
            />

            {/* Content */}
            <motion.div
                initial="hidden"
                animate="visible"
                className="z-10 max-w-4xl mx-auto flex flex-col items-center"
            >
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-[pulse_2s_ease-in-out_infinite]" />
                    <span className="text-sm font-medium text-white/80">PrepMaster – Placement Preparation Platform</span>
                </motion.div>

                <motion.h1
                    custom={1}
                    variants={fadeUp}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                >
                    Prepare for Placements<br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-white to-brand-400">
                        Smarter
                    </span>
                </motion.h1>

                <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                    Practice aptitude questions, solve DSA coding problems, and prepare company-wise for campus placements — all in one platform.
                </motion.p>

                <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Button variant="primary" className="h-12 px-8 text-base">Get Started</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Button variant="secondary" className="h-12 px-8 text-base">Explore Features</Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Editor Mockup — Interactive Coding Environment */}
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ scale: editorScale }}
                className="w-full max-w-5xl mx-auto mt-20 relative z-10"
            >
                <p className="text-white/40 text-sm font-medium text-center mb-4">Interactive Coding Environment</p>
                <div className="relative rounded-2xl bg-[#0a0618] border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.25)] overflow-hidden hover:shadow-[0_0_120px_rgba(124,58,237,0.35)] transition-shadow duration-700">
                    <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex space-x-1">
                                <div className="px-4 py-1 text-xs text-white/80 bg-white/10 rounded-t-lg">solution.js</div>
                                <div className="px-4 py-1 text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer">test.js</div>
                                <div className="px-4 py-1 text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer">style.css</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-left relative min-h-[320px]">
                        <div className="w-48 border-r border-white/10 p-4 hidden md:block">
                            <div className="text-xs font-mono text-brand-400 mb-2">EXPLORER</div>
                            <div className="text-sm text-white/70 space-y-2 font-mono">
                                <div className="flex items-center gap-2"><span className="text-blue-400">▾</span> src</div>
                                <div className="pl-4 flex items-center gap-2"><span className="text-yellow-400">⚡</span> problems</div>
                                <div className="pl-4 flex items-center gap-2 text-white bg-white/5 rounded px-1"><span className="text-blue-500">📄</span> solution.js</div>
                                <div className="pl-4 flex items-center gap-2"><span className="text-orange-400">📄</span> test.js</div>
                                <div className="pl-4 flex items-center gap-2"><span className="text-cyan-400">#️⃣</span> style.css</div>
                                <div className="flex items-center gap-2 mt-4"><span className="text-gray-400">▸</span> tests</div>
                                <div className="flex items-center gap-2"><span className="text-gray-400">▸</span> utils</div>
                            </div>
                        </div>
                        <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                            {codeLines.map((line, i) =>
                                line === null ? (
                                    <br key={i} />
                                ) : (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.8 + i * 0.06, ease: 'easeOut' }}
                                        style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                                    >
                                        {line.tokens.map((tok, j) => (
                                            <span key={j} className={tok.cls}>{tok.text}</span>
                                        ))}
                                    </motion.div>
                                ),
                            )}
                            <span className="inline-block w-2 h-5 bg-brand-400 animate-blink ml-1 mt-1 align-middle rounded-sm" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0a0618] to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </section>
    );
}
