'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export function StudentNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [progress, setProgress] = useState<{ xp: number; level: number }>({ xp: 0, level: 1 });

    useEffect(() => {
        if (user) {
            api.getStudentProgress().then(data => {
                if (data && data.xp !== undefined) {
                    setProgress({ xp: data.xp, level: data.level });
                }
            }).catch(console.error);
        }
    }, [user]);
    return (
        <nav className="h-16 border-b border-white/10 bg-[#0a0618] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] shrink-0">
                        P
                    </div>
                    <span className="font-bold text-lg hidden sm:block">PREPMASTER</span>
                </div>
            </div>

            {/* Global Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                    type="text"
                    placeholder="Search problems, companies, or concepts..."
                    className="w-full h-9 bg-white/5 border border-white/10 rounded-full pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden lg:flex w-9 h-9 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <Search className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <Bell className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-white/10 relative">
                    <div className="text-right hidden sm:block">
                         <p className="text-sm font-medium">{user?.name || 'Student User'}</p>
                         <p className="text-xs text-white/50">Level {progress.level} • {progress.xp} xp</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="w-9 h-9 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 hover:text-white hover:bg-brand-500 transition-colors font-bold cursor-pointer relative"
                    >
                        {user?.name?.charAt(0).toUpperCase() || 'S'}
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute top-12 right-0 w-48 bg-[#0a0618] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                            <Link href="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-white/5 text-sm transition-colors text-white/80 hover:text-white">
                                Profile
                            </Link>
                            <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-white/5 text-sm transition-colors text-white/80 hover:text-white">
                                Settings
                            </Link>
                            <div className="h-[1px] bg-white/10 my-1 rounded-full mx-2" />
                            <div onClick={() => { setIsProfileOpen(false); logout(); }} className="block px-4 py-2 hover:bg-red-500/10 text-sm transition-colors text-red-400 cursor-pointer">
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
