'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Key, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function StudentSettingsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('notifications');

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters long.');
            return;
        }

        setIsUpdating(true);
        try {
            const res = await api.changePassword({ currentPassword, newPassword });
            alert(res.message || 'Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            console.error('Password update failed:', err);
            // Validation errors are in err.errors array, generic errors in err.error
            if (err.errors && err.errors.length > 0) {
                alert(err.errors[0].msg);
            } else {
                alert(err.error || err.message || 'Password update failed');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-white/50 mt-1">Manage preferences for {user?.name || 'your account'}.</p>
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
                    
                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
                                <p className="text-sm text-white/50 mt-1">Choose what updates you want to receive at {user?.email}.</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { title: "Weekly Progress Report", desc: "Receive an email summary of your performance." },
                                    { title: "New Companies Available", desc: "Get notified when new company roadmaps are added." },
                                    { title: "Platform Announcements", desc: "Updates about new features and maintenance." },
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
                                    <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2" onClick={(e) => { e.preventDefault(); alert("Preferences saved!"); }}>
                                        <Save className="w-4 h-4" /> Save Preferences
                                    </button>
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

                            <form className="space-y-4 max-w-md" onSubmit={handlePasswordUpdate}>
                                <div className="pb-4 mb-4 border-b border-white/10 space-y-2">
                                    <label className="text-sm font-medium text-white/70">Current Password</label>
                                    <input type="password" placeholder="••••••••" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">New Password</label>
                                    <input type="password" placeholder="••••••••" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                
                                <div className="pt-4">
                                    <button type="submit" disabled={isUpdating} className={`px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-all flex items-center gap-2 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <Key className="w-4 h-4" /> {isUpdating ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
