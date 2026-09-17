import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 font-sans antialiased flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background subtle radial glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Brand Logo & Title */}
            <div className="mb-6 flex flex-col items-center text-center relative z-10">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-6 h-6 text-zinc-950" />
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-1.5">
                            <span className="font-black text-xl tracking-tight text-white">
                                Prompt<span className="text-emerald-400">Hub</span>
                            </span>
                            <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold px-1.5 py-0.5 rounded-md">
                                PRO
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                            AI Prompt Gallery & Creator Hub
                        </p>
                    </div>
                </Link>
            </div>

            {/* Auth Form Card */}
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-md relative z-10">
                {children}
            </div>

            {/* Back to Gallery Link */}
            <div className="mt-6 text-center relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 font-medium transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Galeri Publik</span>
                </Link>
            </div>
        </div>
    );
}
