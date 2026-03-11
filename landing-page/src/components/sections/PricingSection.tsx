'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function PricingSection() {
    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            period: '',
            description: 'Get started with basic placement preparation',
            buttonVariant: 'secondary' as const,
            buttonText: 'Start Learning',
            features: ['Access to aptitude practice', 'Limited coding problems', 'Basic progress tracking'],
            isPopular: false,
        },
        {
            name: 'Pro Plan',
            price: '₹199',
            period: '/ month',
            description: 'Full access for serious preparation',
            buttonVariant: 'primary' as const,
            buttonText: 'Upgrade Now',
            features: ['Full coding problem library', 'Company-wise preparation', 'Mock placement tests', 'Detailed analytics'],
            isPopular: true,
        },
        {
            name: 'Premium Plan',
            price: '₹399',
            period: '/ month',
            description: 'Complete placement readiness package',
            buttonVariant: 'secondary' as const,
            buttonText: 'Get Premium',
            features: ['All coding problems', 'All aptitude modules', 'Company readiness analytics', 'Priority support'],
            isPopular: false,
        },
    ];

    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-600/10 blur-[160px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <span className="text-sm font-medium text-white/80">★ Pricing</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Plans for Every Student</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">Choose a plan and start preparing for placements with structured practice.</p>
                </motion.div>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <motion.div key={plan.name} variants={cardVariants} whileHover={{ y: plan.isPopular ? -8 : -6, transition: { duration: 0.3 } }} className={`relative bg-[#0a0618] rounded-3xl p-8 border ${plan.isPopular ? 'border-brand-500 shadow-[0_0_50px_rgba(124,58,237,0.15)] md:-translate-y-4' : 'border-white/10 hover:border-white/20'} flex flex-col transition-colors duration-300`}>
                            {plan.isPopular && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute top-0 right-8 -translate-y-1/2 flex gap-1">
                                    <span className="text-yellow-400 text-xl animate-float">✨</span>
                                    <span className="text-yellow-400 text-xl animate-float" style={{ animationDelay: '0.5s' }}>✨</span>
                                </motion.div>
                            )}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-xl">{plan.name}</h3>
                                    {plan.isPopular && <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full font-bold">Popular</span>}
                                </div>
                                <p className="text-white/50 text-sm">{plan.description}</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-end gap-1">
                                    <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: 'spring', stiffness: 200 }} className="text-4xl font-bold">{plan.price}</motion.span>
                                    {plan.period && <span className="text-white/50 text-sm mb-1">{plan.period}</span>}
                                </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button variant={plan.buttonVariant} className="w-full mb-8 py-3">{plan.buttonText}</Button>
                            </motion.div>
                            <div className="mt-auto">
                                <p className="text-white text-xs font-semibold mb-4 uppercase tracking-wider">Included Features</p>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }} className="flex items-start gap-3">
                                            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.isPopular ? 'text-brand-400' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span className="text-white/70 text-sm leading-tight">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
