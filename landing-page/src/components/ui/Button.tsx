import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
}

export function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none px-6 py-2.5 text-sm';

    const variants = {
        primary: 'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] glow-purple',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md',
        outline: 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-md',
        ghost: 'text-white/70 hover:text-white',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
