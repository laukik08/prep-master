'use client';

import React, { useState } from 'react';
import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { Sidebar } from '@/components/admin/layout/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background-primary)] text-white flex flex-col">
            <AdminNavbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0618] to-brand-950/20 p-4 sm:p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
