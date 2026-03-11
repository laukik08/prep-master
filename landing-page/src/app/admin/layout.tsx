'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { Sidebar } from '@/components/admin/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuExpanded, setIsDesktopMenuExpanded] = useState(true);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/dashboard');
        }
    }, [user, isLoading, router]);

    const handleMenuClick = () => {
        if (window.innerWidth < 768) { // md breakpoint
            setIsMobileMenuOpen(!isMobileMenuOpen);
        } else {
            setIsDesktopMenuExpanded(!isDesktopMenuExpanded);
        }
    };

    if (isLoading || !user || user.role !== 'admin') {
        return <div className="h-screen flex items-center justify-center bg-[#0a0618] text-white">Loading...</div>;
    }

    return (
        <div className="h-screen overflow-hidden bg-[var(--color-background-primary)] text-white flex flex-col">
            <div className="z-50 shrink-0">
                <AdminNavbar onMenuClick={handleMenuClick} />
            </div>
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar 
                    isOpen={isMobileMenuOpen} 
                    onClose={() => setIsMobileMenuOpen(false)} 
                    isDesktopExpanded={isDesktopMenuExpanded}
                />
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0618] to-brand-950/20 p-4 sm:p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
