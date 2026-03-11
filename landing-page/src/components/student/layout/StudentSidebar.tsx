'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Code2,
    HelpCircle,
    Building2,
    LineChart,
    FileText,
    User,
    LogOut,
    X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'DSA Practice', href: '/dashboard/practice', icon: Code2 },
    { name: 'Aptitude Practice', href: '/dashboard/aptitude', icon: HelpCircle },
    { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
    { name: 'Progress', href: '/dashboard/progress', icon: LineChart },
    { name: 'Mock Tests', href: '/dashboard/mock-tests', icon: FileText },
];

export function StudentSidebar({ isOpen, onClose, isDesktopExpanded = true }: { isOpen?: boolean; onClose?: () => void; isDesktopExpanded?: boolean }) {
    const pathname = usePathname();

    const SidebarContent = (
        <aside className={`${isDesktopExpanded ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#0a0618] border-r border-white/10 flex flex-col h-[calc(100vh-4rem)]`}>
            <div className="flex-1 py-6 px-4 overflow-y-auto nice-scrollbar">
                {/* Mobile Close Button */}
                <div className="md:hidden flex justify-end mb-4">
                    <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center ${isDesktopExpanded ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-lg text-sm sm:text-[15px] transition-all duration-200 ${isActive
                                    ? 'bg-gradient-to-r from-brand-500/20 to-transparent text-white font-semibold border-l-2 border-brand-400'
                                    : 'text-white/60 hover:text-white hover:bg-white/5 font-medium tracking-wide'
                                    }`}
                                title={!isDesktopExpanded ? item.name : undefined}
                            >
                                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-400' : 'text-white/40 group-hover:text-white/70'}`} />
                                {isDesktopExpanded && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className={`p-4 border-t border-white/10 space-y-1 ${!isDesktopExpanded ? 'flex flex-col items-center px-2' : ''}`}>
                <Link
                    href="/dashboard/profile"
                    className={`flex items-center rounded-lg text-sm hover:bg-white/5 transition-colors ${isDesktopExpanded ? 'gap-3 px-3 py-2.5 text-white/60 hover:text-white' : 'justify-center p-3 text-white/50 hover:text-white/80'}`}
                    title={!isDesktopExpanded ? "Profile" : undefined}
                >
                    <User className={`w-4 h-4 ${isDesktopExpanded ? 'text-white/40' : ''}`} />
                    {isDesktopExpanded && <span>Profile</span>}
                </Link>
                <Link
                    href="/"
                    className={`flex items-center rounded-lg text-sm hover:bg-red-500/10 transition-colors ${isDesktopExpanded ? 'gap-3 px-3 py-2.5 text-red-400/80 hover:text-red-400' : 'justify-center p-3 text-red-500/60 hover:text-red-400'}`}
                    title={!isDesktopExpanded ? "Logout" : undefined}
                >
                    <LogOut className={`w-4 h-4 ${isDesktopExpanded ? 'opacity-80' : ''}`} />
                    {isDesktopExpanded && <span>Logout</span>}
                </Link>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block sticky top-16 z-40">
                {SidebarContent}
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-[#030014]/80 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 md:hidden shadow-[10px_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {SidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
