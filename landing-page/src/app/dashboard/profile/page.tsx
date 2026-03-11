'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Link as LinkIcon, Camera, Save, FileText, Lock, Loader2, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
    const { user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'security'>('personal');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    // Personal Info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Academic
    const [college, setCollege] = useState('');
    const [branch, setBranch] = useState('');
    const [graduationYear, setGraduationYear] = useState('2025');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');

    // Security
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        api.getProfile()
            .then(data => {
                setName(data.name || '');
                setEmail(data.email || '');
                setCollege(data.college || '');
                setBranch(data.branch || '');
                setGraduationYear(data.graduation_year?.toString() || '2025');
                setLinkedin(data.linkedin || '');
                setGithub(data.github || '');
            })
            .catch(err => console.error('Failed to load profile:', err))
            .finally(() => setLoading(false));
    }, []);

    const getInitials = () => {
        if (!name) return '??';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        setSaveMsg('');
        try {
            await api.updateProfile({
                name,
                college,
                branch,
                graduation_year: parseInt(graduationYear) || 2025,
                linkedin,
                github,
            });
            setSaveMsg('Profile saved successfully!');
            setTimeout(() => setSaveMsg(''), 3000);
        } catch (err) {
            console.error('Failed to save profile:', err);
            setSaveMsg('Failed to save profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setSaveMsg('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setSaveMsg('New password must be at least 6 characters.');
            return;
        }
        setSaving(true);
        setSaveMsg('');
        try {
            await api.changePassword({ currentPassword, newPassword });
            setSaveMsg('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSaveMsg(''), 3000);
        } catch (err: any) {
            console.error('Failed to change password:', err);
            setSaveMsg(err?.error || 'Failed to change password.');
        } finally {
            setSaving(false);
        }
    };

    const handleSave = () => {
        if (activeTab === 'security') {
            handleChangePassword();
        } else {
            handleSaveProfile();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
            </div>
        );
    }

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
                                        {getInitials()}
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
                                <div className="space-y-2 text-left md:col-span-2">
                                    <label className="text-sm font-medium text-white/70">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-left md:col-span-2">
                                    <label className="text-sm font-medium text-white/70">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="email" value={email} disabled className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white/50 cursor-not-allowed" />
                                    </div>
                                    <p className="text-xs text-white/40">Email cannot be changed directly. Contact support if needed.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'academic' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">University/College</label>
                                    <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="e.g. State Institute of Technology" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Degree & Branch</label>
                                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. B.Tech Computer Science" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Graduation Year</label>
                                    <select value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none">
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                </div>
                            </div>

                            <hr className="border-white/10" />

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Links & Resume</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn Profile URL" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    </div>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub Profile URL" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
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
                                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">New Password</label>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                    <p className="text-xs text-white/40">Must be at least 6 characters long.</p>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-white/70">Confirm New Password</label>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Common Save Button Box */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                        {saveMsg && (
                            <span className={`text-sm flex items-center gap-2 ${saveMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                {saveMsg.includes('success') && <CheckCircle className="w-4 h-4" />}
                                {saveMsg}
                            </span>
                        )}
                        {!saveMsg && <span />}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
