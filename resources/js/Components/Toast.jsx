import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, visible }) {
    if (!visible) return null;

    return (
        <div
            className="fixed bottom-5 inset-x-4 max-w-xs mx-auto z-50 pointer-events-none transition-all duration-300 ease-out transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-3"
            role="status"
            aria-live="polite"
        >
            <div className="bg-zinc-900/95 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-full shadow-2xl shadow-black/80 flex items-center justify-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{message || 'Prompt berhasil disalin!'}</span>
            </div>
        </div>
    );
}
