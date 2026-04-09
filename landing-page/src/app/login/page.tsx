'use client';
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle OAuth callback
    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');
        const oauthError = searchParams.get('error');

        
                
        if (oauthError) {
            setError(oauthError);
            // Clean URL
          if (typeof window !== "undefined") {
              window.history.replaceState({}, '', '/login');
                }
            return;
        }

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                window.history.replaceState({}, '', '/login');
                // Redirect based on role
                if (user.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }
            } catch (err) {
                setError('OAuth login failed. Please try again.');
                window.history.replaceState({}, '', '/login');
            }
        }
    }, [searchParams, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = (provider: 'google' | 'github') => {
        window.location.href = `${API_BASE}/auth/oauth/${provider}`;
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
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-white/50 text-sm">Please sign in to your PrepMaster account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6 relative z-20">
                    <button
                        onClick={() => handleOAuth('google')}
                        className="w-full h-12 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium text-sm transition-all duration-200"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </button>
                    <button
                        onClick={() => handleOAuth('github')}
                        className="w-full h-12 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium text-sm transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="px-4 text-xs text-white/40 uppercase tracking-wider">or continue with email</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link href="#" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="primary" className="w-full h-12 text-sm" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-white/50">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
                            Sign up for free
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
