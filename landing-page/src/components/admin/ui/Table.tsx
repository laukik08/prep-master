import React from 'react';

interface TableProps {
    headers: React.ReactNode[];
    children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
    return (
        <div className="w-full bg-[#0a0618] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/80">
                    <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-white/50 font-semibold tracking-wider">
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i} className="px-6 py-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const TableRow = ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-white/5 transition-colors group">
        {children}
    </tr>
);

export const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
        {children}
    </td>
);
