'use client';

import React, { useState } from 'react';
import { User, Mail, Link as LinkIcon, Camera, Save, FileText, Lock } from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'security'>('personal');

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Profile Settings</h1>
                <p className="text-white/50 mt-2">Manage your personal information, academic details, and account security.</p>
            </div>

            {/* Main Content Area */}
            <div className="mt-8 bg-[#0a0618] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-white/[0.02] border-r border-white/10 p-6 md:min-h-[600px] shrink-0">
                    <div className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('personal')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                ${activeTab === 'personal' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <User className="w-5 h-5" /> Personal Info
                        </button>
                        <button 
                            onClick={() => setActiveTab('academic')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                ${activeTab === 'academic' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <FileText className="w-5 h-5" /> Academic & Resume
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                ${activeTab === 'security' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <Lock className="w-5 h-5" /> Security
                        </button>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="flex-1 p-6 md:p-10">
                    
                    {activeTab === 'personal' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                        JD
                                    </div>
                                    <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Profile Picture</h3>
                                    <p className="text-sm text-white/50 mb-3">Upload a professional photo for your profile.</p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">Change</button>
                                        <button className="px-4 py-2 hover:bg-red-500/10 text-red-400 text-sm font-medium rounded-lg transition-colors">Remove</button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-white/10" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="text" defaultValue="John" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left md:col-span-2">
                                    <label className="text-sm font-medium text-white/70">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="email" defaultValue="john.doe@university.edu" disabled className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white/50 cursor-not-allowed" />
                                    </div>
                                    <p className="text-xs text-white/40">Email cannot be changed directly. Contact support if needed.</p>
                                </div>
                                <div className="space-y-2 text-left md:col-span-2">
                                    <label className="text-sm font-medium text-white/70">Phone Number</label>
                                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'academic' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">University/College</label>
                                    <input type="text" defaultValue="State Institute of Technology" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Degree & Branch</label>
                                    <input type="text" defaultValue="B.Tech Computer Science" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Graduation Year</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none">
                                        <option value="2024">2024</option>
                                        <option value="2025" selected>2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Current CGPA</label>
                                    <input type="text" defaultValue="8.75" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                            </div>

                            <hr className="border-white/10" />

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Links & Resume</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="url" placeholder="LinkedIn Profile URL" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    </div>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="url" placeholder="GitHub Profile URL" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    </div>
                                </div>

                                <div className="border border-dashed border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                                    <FileText className="w-10 h-10 text-brand-400 mx-auto mb-4" />
                                    <p className="text-white font-medium mb-1">Click to upload your resume</p>
                                    <p className="text-sm text-white/40">PDF only. Max 5MB.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in max-w-md">
                            <div className="space-y-4">
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    <p className="text-xs text-white/40">Must be at least 8 characters long.</p>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Common Save Button Box */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
                        <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
