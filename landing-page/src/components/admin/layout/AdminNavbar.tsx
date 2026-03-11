'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    return (
        <nav className="h-16 border-b border-white/10 bg-[#0a0618] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors mr-1"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                    P
                </div>
                <span className="font-bold text-lg hidden sm:block">PREPMASTER <span className="text-white/40 font-normal ml-2 hidden lg:inline">| Admin</span></span>
            </div>

            <div className="flex items-center gap-4">
                <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <Bell className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-white/10 relative">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-white/50">{user?.email || 'admin@prepmaster.com'}</p>
                    </div>
                    <button 
                         onClick={() => setIsProfileOpen(!isProfileOpen)}
                         className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white hover:bg-brand-500 transition-colors relative"
                    >
                        <User className="w-4 h-4" />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute top-12 right-0 w-48 bg-[#0a0618] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                            <Link href="/admin/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-white/5 text-sm transition-colors text-white/80 hover:text-white">
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
