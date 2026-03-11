import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function FormInput({ label, id, ...props }: FormInputProps) {
    return (
        <div className="space-y-1.5 w-full">
            <label htmlFor={id} className="block text-sm font-medium text-white/70">
                {label}
            </label>
            <input
                id={id}
                {...props}
                className={`w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors ${props.className || ''}`}
            />
        </div>
    );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
}

export function FormSelect({ label, id, options, ...props }: FormSelectProps) {
    return (
        <div className="space-y-1.5 w-full">
            <label htmlFor={id} className="block text-sm font-medium text-white/70">
                {label}
            </label>
            <select
                id={id}
                {...props}
                className={`w-full h-11 bg-[#0a0618] border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-brand-500 focus:bg-[#150D2B] transition-colors appearance-none ${props.className || ''}`}
            >
                <option value="" disabled className="bg-[#0a0618] text-white/50">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0a0618] text-white py-2">{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export function FormTextarea({ label, id, ...props }: FormTextareaProps) {
    return (
        <div className="space-y-1.5 w-full">
            <label htmlFor={id} className="block text-sm font-medium text-white/70">
                {label}
            </label>
            <textarea
                id={id}
                {...props}
                className={`w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors resize-y min-h-[100px] ${props.className || ''}`}
            />
        </div>
    );
}
