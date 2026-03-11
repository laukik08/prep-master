'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1.2]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.3, 0.8, 0.4]);
    const mockupY = useTransform(scrollYProgress, [0.2, 0.6], [80, 0]);

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            <motion.div style={{ scale: glowScale, opacity: glowOpacity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-40 bg-gradient-to-t from-transparent via-brand-600/40 to-brand-500 rounded-[100%] blur-[50px]" />
            <div className="container mx-auto px-6 text-center relative z-10 pt-20">
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white max-w-4xl mx-auto drop-shadow-lg">
                    Start Your Placement Preparation Today
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                    Join thousands of students preparing for campus placements with PrepMaster.
                </motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} className="inline-block mb-20">
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="primary" className="h-12 px-8 shadow-[0_0_30px_rgba(124,58,237,0.4)]">Start Practicing Now</Button>
                    </motion.div>
                </motion.div>

                {/* Dashboard Preview — Track Your Placement Progress */}
                <motion.div style={{ y: mockupY }} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative max-w-5xl mx-auto -mb-10 lg:-mb-32">
                    <div className="text-center mb-4">
                        <p className="text-white/40 text-sm font-medium">Track Your Placement Progress</p>
                        <p className="text-white/30 text-xs">Monitor solved problems, aptitude scores, and company readiness in a powerful student dashboard.</p>
                    </div>
                    <div className="bg-[#0a0618] rounded-t-3xl border border-white/10 shadow-[0_0_100px_rgba(124,58,237,0.2)] overflow-hidden hover:shadow-[0_0_140px_rgba(124,58,237,0.3)] transition-shadow duration-700">
                        <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                            <div className="flex gap-2">
                                <motion.div whileHover={{ scale: 1.15 }} className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-xs font-bold cursor-pointer">P</motion.div>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-white/50 space-x-4">
                                {['Dashboard', 'Practice', 'Companies', 'Analytics'].map((item) => (
                                    <motion.span key={item} whileHover={{ color: '#ffffff' }} className="cursor-pointer transition-colors">{item}</motion.span>
                                ))}
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden text-[10px] flex items-center justify-center font-bold">S</div>
                            </div>
                        </div>
                        <div className="flex h-[400px]">
                            <div className="w-64 border-r border-white/10 p-6 flex flex-col gap-4 hidden md:flex">
                                <div className="h-10 rounded-lg bg-white/5 border border-white/10 flex items-center px-4 text-sm text-white/40">🔍 Search problems...</div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Quick Links</div>
                                    {['DSA Problems', 'Aptitude Tests', 'Company Prep'].map((name, i) => (
                                        <motion.div key={name} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }} className={`h-8 rounded flex items-center px-3 text-sm cursor-pointer transition-colors ${i === 0 ? 'text-brand-400 bg-brand-500/10 border border-brand-500/20' : 'text-white/80'}`}>
                                            {name}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-8 bg-gradient-to-br from-[var(--color-background-primary)] to-brand-950/20">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Welcome back, Student!</h3>
                                        <p className="text-sm text-white/50">Here&apos;s your placement preparation overview.</p>
                                    </div>
                                    <Button variant="primary" className="h-9 px-4 text-xs">New Test</Button>
                                </div>
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="grid grid-cols-2 gap-6">
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white/5 border border-white/10 rounded-xl p-6 h-40 hover:border-green-500/30 transition-colors duration-300">
                                        <div className="text-sm text-white/40 mb-2">Problems Solved</div>
                                        <div className="text-3xl font-bold tracking-tight mb-4 text-green-400">142</div>
                                        <div className="h-8 bg-gradient-to-r from-green-500/20 to-transparent rounded-lg" />
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white/5 border border-white/10 rounded-xl p-6 h-40 hover:border-brand-500/30 transition-colors duration-300">
                                        <div className="text-sm text-white/40 mb-2">Aptitude Score</div>
                                        <div className="text-3xl font-bold tracking-tight mb-4">82%</div>
                                        <div className="flex gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite_0.3s]" />
                                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-[pulse_2s_ease-in-out_infinite_0.6s]" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                            <div className="w-56 border-l border-white/10 p-4 bg-[#0a0618]/50 overflow-hidden hidden lg:block">
                                <div className="text-xs font-mono text-white/40 mb-8 border-b border-white/10 pb-4">COMPANY READINESS</div>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <div className="w-1/2 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs">TCS</div>
                                        <div className="w-1/2 h-8 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xs text-green-400">78%</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/2 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs">Infosys</div>
                                        <div className="w-1/2 h-8 rounded-md bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-xs text-yellow-400">65%</div>
                                    </div>
                                    <div className="mt-8 flex gap-2">
                                        <div className="w-full h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs">Accuracy: 82%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-background-primary)] to-transparent z-20 pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
