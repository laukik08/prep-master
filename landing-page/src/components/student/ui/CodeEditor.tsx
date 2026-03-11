'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
    language: string;
    code: string;
    onChange: (value: string | undefined) => void;
    height?: string;
}

export function CodeEditor({ language, code, onChange, height = "100%" }: CodeEditorProps) {
    return (
        <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]" style={{ height }}>
            <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 24,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                }}
                loading={
                    <div className="flex h-full items-center justify-center text-white/50">
                        Loading Editor...
                    </div>
                }
            />
        </div>
    );
}
