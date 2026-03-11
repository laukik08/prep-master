import Link from 'next/link';
import { Bell, User, Menu } from 'lucide-react';

export function AdminNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
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
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-white/50">admin@prepmaster.com</p>
                    </div>
                    <button className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                        <User className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
