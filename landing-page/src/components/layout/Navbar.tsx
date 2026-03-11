'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const navLinks = [
    { href: '#main', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#companies', label: 'Companies' },
    { href: '#practice', label: 'Practice' },
    { href: '#pricing', label: 'Pricing' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                initial="visible"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled
                    ? 'bg-[var(--color-background-primary)]/80 backdrop-blur-xl border-b border-white/10 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-shadow"
                        >
                            P
                        </motion.div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block group-hover:text-brand-300 transition-colors">
                            PrepMaster
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative text-white/70 hover:text-white transition-colors text-sm font-medium group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-400 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/login" className="relative text-white/70 hover:text-white transition-all duration-300 text-sm font-medium hidden sm:block hover:tracking-wider group">
                                Login
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-400 to-brand-600 group-hover:w-full transition-all duration-300 rounded-full" />
                                <span className="absolute inset-0 rounded-lg bg-brand-500/0 group-hover:bg-brand-500/10 transition-all duration-300 -m-2" />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 12 }}
                            whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(124,58,237,0.6)' }}
                            whileTap={{ scale: 0.92 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400 rounded-full opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                            <Link href="/register">
                                <Button variant="primary" className="relative h-9 px-5 text-xs font-semibold overflow-hidden">
                                    <span className="relative z-10">Get Started</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Mobile hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2"
                        >
                            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} className="w-5 h-0.5 bg-white rounded-full block" />
                            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-5 h-0.5 bg-white rounded-full block" />
                            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} className="w-5 h-0.5 bg-white rounded-full block" />
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-16 left-0 w-full z-40 bg-[var(--color-background-primary)]/95 backdrop-blur-xl border-b border-white/10 md:hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-white/70 hover:text-white transition-colors text-lg font-medium block py-2"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
