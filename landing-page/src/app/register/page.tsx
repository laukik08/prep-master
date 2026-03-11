'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Simulate register
        console.log('Registering user', { name, email, password });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5], x: [0, 150, 0], y: [0, -100, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] bg-brand-500/40 blur-[140px] rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5], x: [0, -120, 0], y: [0, 120, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-[10%] -right-[10%] w-[800px] h-[800px] bg-blue-500/40 blur-[130px] rounded-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/20 blur-[150px] rounded-full animate-glow-pulse" />
            </div>

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10 w-full max-w-md bg-[#0a0618]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] glow-purple overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none"
            >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

                <div className="text-center mb-8 relative z-20">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-shadow"
                        >
                            P
                        </motion.div>
                    </Link>
                    <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
                    <p className="text-white/50 text-sm">Join PrepMaster to start your placement journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                        />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                        <Button variant="primary" className="w-full h-12 text-sm">
                            Create Account
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-white/50">
                        Already have an account?{' '}
                        <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* Back to Home floating link */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute top-6 left-6"
            >
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                    ← Back to home
                </Link>
            </motion.div>
        </div>
    );
}
