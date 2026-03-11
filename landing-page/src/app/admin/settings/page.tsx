'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Key, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormInput, FormSelect } from '@/components/admin/ui/FormComponents';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-white/50 mt-1">Manage your admin preferences and platform configurations.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar / Tabs */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-brand-500/20 text-brand-300 shadow-[inset_0_0_10px_rgba(124,58,237,0.1)] border border-brand-500/20'
                                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-white/40'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Settings Content Area */}
                <div className="flex-1 bg-[#0a0618] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    
                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                                <p className="text-sm text-white/50 mt-1">Update your personal details and public profile.</p>
                            </div>
                            
                            <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-[#0a0618] ring-2 ring-brand-500/20">
                                    AU
                                </div>
                                <div>
                                    <Button variant="outline" className="text-sm border-white/10 hover:bg-white/5 bg-transparent text-white">
                                        Change Avatar
                                    </Button>
                                    <p className="text-xs text-white/40 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>

                            <form className="space-y-4 pt-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput label="First Name" id="firstName" defaultValue="Admin" />
                                    <FormInput label="Last Name" id="lastName" defaultValue="User" />
                                </div>
                                <FormInput label="Email Address" id="email" type="email" defaultValue="admin@prepmaster.com" />
                                <FormInput label="Role Title" id="role" defaultValue="Super Administrator" disabled className="bg-white/5 opacity-70 cursor-not-allowed" />
                                
                                <div className="pt-4">
                                    <Button variant="primary" className="flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
                                <p className="text-sm text-white/50 mt-1">Choose what updates you want to receive.</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { title: "New Student Registrations", desc: "Receive email when a new student joins the platform." },
                                    { title: "Platform Alerts", desc: "Get notified about system maintenance and downtime." },
                                    { title: "Weekly Reports", desc: "Receive weekly summary reports of platform activity." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                        <div>
                                            <p className="font-medium text-white">{item.title}</p>
                                            <p className="text-sm text-white/50">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                        </label>
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <Button variant="primary" className="flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save Preferences
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Security Settings</h3>
                                <p className="text-sm text-white/50 mt-1">Manage your password and authentication methods.</p>
                            </div>

                            <form className="space-y-4 max-w-md">
                                <div className="pb-4 mb-4 border-b border-white/10">
                                    <FormInput label="Current Password" id="currentPassword" type="password" />
                                </div>
                                <FormInput label="New Password" id="newPassword" type="password" />
                                <FormInput label="Confirm New Password" id="confirmPassword" type="password" />
                                
                                <div className="pt-4">
                                    <Button variant="primary" className="flex items-center gap-2">
                                        <Key className="w-4 h-4" /> Update Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
