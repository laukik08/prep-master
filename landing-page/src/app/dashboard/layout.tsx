'use client';

import React, { useState } from 'react';
import { StudentNavbar } from '@/components/student/layout/StudentNavbar';
import { StudentSidebar } from '@/components/student/layout/StudentSidebar';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuExpanded, setIsDesktopMenuExpanded] = useState(true);

    const handleMenuClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        } else {
            setIsDesktopMenuExpanded(!isDesktopMenuExpanded);
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-[var(--color-background-primary)] text-white flex flex-col">
            <div className="z-50 shrink-0">
                <StudentNavbar onMenuClick={handleMenuClick} />
            </div>
            <div className="flex flex-1 overflow-hidden relative">
                <StudentSidebar 
                    isOpen={isMobileMenuOpen} 
                    onClose={() => setIsMobileMenuOpen(false)} 
                    isDesktopExpanded={isDesktopMenuExpanded}
                />
                <main className="flex-1 overflow-y-auto bg-[#030014] p-4 sm:p-6 md:p-8">
                    <div className="max-w-[1400px] mx-auto min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
