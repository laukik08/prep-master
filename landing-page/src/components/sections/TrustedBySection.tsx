'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function TrustedBySection() {
    const logos = [
        { name: 'slack', text: 'slack' },
        { name: 'coinbase', text: 'coinbase' },
        { name: 'webflow', text: 'webflow' },
        { name: 'dropbox', text: 'Dropbox' },
        { name: '500apps', text: '500APPS' },
        { name: 'zoom', text: 'zoom' },
        { name: 'shopify', text: 'Shopify' },
        { name: 'atlassian', text: 'Atlassian' },
    ];

    return (
        <section className="py-16 border-y border-white/5 bg-white/[0.02] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 text-center"
            >
                <p className="text-white/40 text-sm font-medium mb-10">
                    Trusted by businesses of all sizes worldwide.
                </p>
            </motion.div>
            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />
                <div className="flex animate-marquee w-max">
                    {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="flex items-center gap-2.5 text-lg font-bold tracking-tight px-8 opacity-50 hover:opacity-100 transition-opacity duration-300 shrink-0"
                        >
                            <div className="w-7 h-7 rounded-full border-2 border-current opacity-70 flex items-center justify-center text-[11px] font-semibold">
                                {logo.name[0].toUpperCase()}
                            </div>
                            {logo.text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
