'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Building2, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/admin/ui/Modal';
import { FormInput } from '@/components/admin/ui/FormComponents';
import { api } from '@/lib/api';

const colorOptions = [
    "from-blue-500 to-cyan-500", "from-emerald-400 to-cyan-400",
    "from-purple-500 to-indigo-500", "from-brand-400 to-brand-700",
    "from-orange-400 to-rose-400"
];

export default function CompanyManagement() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', color: 'from-blue-500 to-cyan-500' });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const data = await api.getCompanies();
            setCompanies(data);
        } catch (err) {
            console.error('Failed to fetch companies:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCompany = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const payload = { name: formData.name };
        try {
            if (editingId) {
                await api.updateCompany(editingId, payload);
            } else {
                await api.createCompany(payload);
            }
            await fetchCompanies();
            closeModal();
        } catch (err: any) {
            console.error('Failed to save company:', err);
            alert(err.error || err.message || 'Failed to save company');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteCompany(id);
            setCompanies(companies.filter(c => c.id !== id));
        } catch (err: any) {
            console.error('Failed to delete company:', err);
            alert(err.error || err.message || 'Failed to delete company');
        }
    };

    const openEditModal = (company: any) => {
        setEditingId(company.id);
        setFormData({ name: company.name, color: 'from-blue-500 to-cyan-500' });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', color: 'from-blue-500 to-cyan-500' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditingId(null);
            setFormData({ name: '', color: 'from-blue-500 to-cyan-500' });
        }, 200);
    };

    // Assign a color deterministically from the company index
    const getColor = (index: number) => colorOptions[index % colorOptions.length];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Company Management</h1>
                    <p className="text-white/50 mt-1">Manage recruiting companies and their targeted preparation tracks.</p>
                </div>
                <Button variant="primary" className="flex items-center gap-2" onClick={openAddModal}>
                    <Plus className="w-4 h-4" />
                    Add Company
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-white/50">Loading companies...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company, index) => (
                        <div key={company.id} className="bg-[#0a0618] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] group hover:border-white/20 transition-colors flex flex-col items-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColor(index)} flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4`}>
                                {company.name[0]}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">{company.name}</h3>

                            <div className="w-full flex justify-between px-4 border-y border-white/5 py-3 mb-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-brand-400">{company.aptitude_question_count}</p>
                                    <p className="text-xs text-white/50">Aptitude Qs</p>
                                </div>
                                <div className="w-px bg-white/5"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-400">{company.coding_problem_count}</p>
                                    <p className="text-xs text-white/50">Coding Qs</p>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full mt-auto pt-2">
                                <button onClick={() => openEditModal(company)}
                                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors flex justify-center items-center gap-2 border border-white/5 hover:border-white/10">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button onClick={() => handleDelete(company.id)}
                                    className="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex justify-center items-center gap-2 border border-red-500/20">
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen} onClose={closeModal}
                title={editingId ? "Edit Company" : "Add New Company"}
                footer={
                    <>
                        <Button variant="outline" className="text-sm px-4 py-2 h-auto" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" className="text-sm px-4 py-2 h-auto" onClick={handleSaveCompany}>
                            {editingId ? "Save Changes" : "Add Company"}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleSaveCompany} className="space-y-4">
                    <FormInput label="Company Name" id="companyName" placeholder="e.g. Amazon, Google" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-white/70">Theme Color</label>
                        <div className="flex gap-3">
                            {colorOptions.map(colorStr => (
                                <div key={colorStr} onClick={() => setFormData({ ...formData, color: colorStr })}
                                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${colorStr} cursor-pointer border-2 transition-transform ${formData.color === colorStr ? 'border-white scale-110' : 'border-transparent scale-100'}`} />
                            ))}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
