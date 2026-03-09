'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const columnVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Footer() {
    return (
        <footer className="w-full bg-[var(--color-background-primary)] border-t border-white/10 pt-16 pb-8 border-t-brand-900/50 relative overflow-hidden">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50 origin-center" />
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[var(--color-background-primary)] font-bold text-sm">C</motion.div>
                            <span className="font-bold text-lg group-hover:text-brand-300 transition-colors">CREATFLYCODE</span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">A native development environment for front-end designers and developers.</p>
                        <div className="flex items-center gap-4">
                            {['in', 'tw', 'ig'].map((icon) => (
                                <motion.div key={icon} whileHover={{ scale: 1.15, y: -3, borderColor: 'rgba(139,92,246,0.5)' }} whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10">{icon}</motion.div>
                            ))}
                        </div>
                    </motion.div>
                    {[
                        { title: 'About us', links: ['About', 'Careers', 'Blog', 'Legal'] },
                        { title: 'Services', links: ['Browser extension', 'Themes', 'UI assistant', 'Screen shield'] },
                        { title: 'Use cases', links: ['Designing', 'Guest posts', 'Sales demos', 'Market levels'] },
                    ].map((col) => (
                        <motion.div key={col.title} variants={itemVariants}>
                            <h4 className="font-semibold text-white mb-6">{col.title}</h4>
                            <ul className="space-y-4">
                                {col.links.map((link) => (
                                    <motion.li key={link} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">{link}</Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="pt-8 border-t border-white/10 text-center">
                    <p className="text-white/30 text-xs">© 2024 Creatfly.xyz, Inc. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
}
