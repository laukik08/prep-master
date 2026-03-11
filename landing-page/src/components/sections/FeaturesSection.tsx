'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const cards = [
    { title: 'Aptitude Practice', desc: 'Practice quantitative, logical reasoning, and verbal aptitude questions with timed tests and instant evaluation.' },
    { title: 'DSA Coding Practice', desc: 'Solve coding problems in a LeetCode-style editor with support for C++, Java, and Python.' },
    { title: 'Company-wise Preparation', desc: 'Target your preparation for TCS, Infosys, Wipro, and more with company-specific question sets.' },
];

const AUTO_PLAY_INTERVAL = 3500;

export function FeaturesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const pausedRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (!pausedRef.current) {
                setActiveIndex((prev) => (prev + 1) % cards.length);
            }
        }, AUTO_PLAY_INTERVAL);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <section id="features" className="py-32 relative overflow-hidden bg-grid-pattern">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 mt-4">
                        All Your Placement Preparation<br className="hidden sm:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-white to-brand-400 pl-2">In One Platform</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        PrepMaster helps students practice aptitude, solve coding challenges, and track their placement readiness.
                    </p>
                </motion.div>
                <div className="relative max-w-4xl mx-auto" onMouseEnter={() => { pausedRef.current = true; }} onMouseLeave={() => { pausedRef.current = false; }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 0.3, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute top-8 -left-12 lg:-left-32 w-2/3 h-full bg-white/5 rounded-3xl border border-white/10 blur-[2px] -z-20 scale-95 origin-right" />
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 0.3, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute top-8 -right-12 lg:-right-32 w-2/3 h-full bg-white/5 rounded-3xl border border-white/10 blur-[2px] -z-20 scale-95 origin-left" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.97 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                            className="bg-[#0a0618] border border-white/10 rounded-3xl p-10 md:p-16 text-center relative z-10 shadow-[0_0_50px_rgba(124,58,237,0.15)] glow-purple"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{cards[activeIndex].title}</h3>
                            <p className="text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">{cards[activeIndex].desc}</p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                <Button variant="primary" className="h-12 px-8">Start Practicing</Button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center items-center gap-2 mt-10">
                        {cards.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-brand-400 w-8' : 'bg-white/20 w-2.5'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
