'use client';

import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';

export function StudentNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
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
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">Student User</p>
                        <p className="text-xs text-white/50">Level 4 • 2400 xp</p>
                    </div>
                    <Link href="/dashboard/profile">
                        <div className="w-9 h-9 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 hover:text-white hover:bg-brand-500 transition-colors font-bold cursor-pointer">
                            S
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
