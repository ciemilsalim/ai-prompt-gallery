import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Sparkles, Search, X, SlidersHorizontal, Film, ArrowUpDown } from 'lucide-react';
import PromptCard from '@/Components/PromptCard';
import Toast from '@/Components/Toast';

export default function Welcome({ prompts, categories, aiTools, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const triggerToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2500);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilter({ search: searchTerm || undefined });
    };

    const applyFilter = (newParams) => {
        const query = {
            category: filters.category || undefined,
            tool: filters.tool || undefined,
            search: filters.search || undefined,
            ...newParams,
        };

        // Filter out undefined keys
        Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '') {
                delete query[key];
            }
        });

        router.get('/', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setSearchTerm('');
        router.get('/', {}, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const promptList = prompts?.data || [];
    const hasActiveFilters = filters.category || filters.tool || filters.search;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 font-sans antialiased flex flex-col">
            <Head>
                <title>AI Prompt Gallery & Video Hub - Kurasi Prompt AI Video Terbaik</title>
                <meta
                    name="description"
                    content="Katalog kurasi prompt AI video dengan pratinjau bergerak 9:16 untuk Higgsfield AI, Kling AI, dan OpenRouter. Salin prompt dalam 1 klik dan coba langsung!"
                />
            </Head>

            {/* Header Bar */}
            <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
                <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
                    <div className="flex items-center justify-between gap-4">
                        {/* Brand Logo & Name */}
                        <a href="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                <Sparkles className="w-5 h-5 text-zinc-950" />
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                                        Prompt<span className="text-emerald-400">Hub</span>
                                    </span>
                                    <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-semibold px-1.5 py-0.2 rounded-md">
                                        PRO
                                    </span>
                                </div>
                                <p className="text-[11px] text-zinc-400 hidden sm:block">
                                    Kurasi Prompt AI Video & Pratinjau Bergerak
                                </p>
                            </div>
                        </a>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative flex-1 max-w-md ml-auto"
                        >
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari prompt video, gaya, model..."
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 rounded-xl pl-9 pr-8 py-2 transition-all outline-none"
                            />
                            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm('');
                                        applyFilter({ search: undefined });
                                    }}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Filter Pills Section (Horizontal Scroll on Mobile) */}
                    <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-zinc-900">
                        {/* Category Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
                            <span className="text-zinc-500 font-medium text-[11px] shrink-0 mr-1 hidden sm:inline">
                                Kategori:
                            </span>
                            <button
                                type="button"
                                onClick={() => applyFilter({ category: undefined })}
                                className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-all cursor-pointer ${
                                    !filters.category
                                        ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm shadow-emerald-500/20'
                                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                                }`}
                            >
                                Semua Kategori
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => applyFilter({ category: cat.slug })}
                                    className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-all cursor-pointer ${
                                        filters.category === cat.slug
                                            ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm shadow-emerald-500/20'
                                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* AI Tools Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                            <span className="text-zinc-500 font-medium text-[11px] shrink-0 mr-1 hidden sm:inline">
                                Tool AI:
                            </span>
                            <button
                                type="button"
                                onClick={() => applyFilter({ tool: undefined })}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-all cursor-pointer ${
                                    !filters.tool
                                        ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                Semua AI
                            </button>
                            {aiTools.map((tool) => (
                                <button
                                    key={tool.id}
                                    type="button"
                                    onClick={() => applyFilter({ tool: tool.slug })}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                                        filters.tool === tool.slug
                                            ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                                            : 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                                    }`}
                                >
                                    {tool.logo_url && (
                                        <img
                                            src={tool.logo_url}
                                            alt={tool.name}
                                            className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                                        />
                                    )}
                                    <span>{tool.name}</span>
                                </button>
                            ))}

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="ml-auto text-[11px] text-emerald-400 hover:underline shrink-0 font-medium px-2 py-0.5"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6">
                {/* Hero / Banner for First Impression */}
                <div className="mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800/90 relative overflow-hidden">
                    <div className="max-w-2xl relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Katalog Prompt Video Siap Pakai</span>
                        </div>
                        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                            Jelajahi & Salin Prompt AI Video Berkualitas Tinggi
                        </h1>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                            Format portrait 9:16 untuk video viral Reels, TikTok, & Shorts. Klik salin prompt dan uji coba langsung di platform generator AI favoritmu.
                        </p>
                    </div>
                </div>

                {/* Catalog Grid */}
                {promptList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {promptList.map((prompt) => (
                                <PromptCard
                                    key={prompt.id}
                                    prompt={prompt}
                                    onCopySuccess={triggerToast}
                                />
                            ))}
                        </div>

                        {/* Pagination Links */}
                        {prompts.links && prompts.links.length > 3 && (
                            <div className="mt-10 flex items-center justify-center gap-1.5 flex-wrap">
                                {prompts.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="px-3 py-1.5 rounded-lg text-xs text-zinc-600 bg-zinc-900 border border-zinc-800/60 cursor-not-allowed select-none"
                                            />
                                        );
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                                link.active
                                                    ? 'bg-emerald-500 text-zinc-950 font-bold'
                                                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <div className="py-16 text-center bg-zinc-900/50 border border-zinc-800/80 rounded-2xl max-w-md mx-auto px-6">
                        <Film className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                        <h3 className="text-zinc-200 font-semibold text-base">
                            Tidak ada prompt yang cocok
                        </h3>
                        <p className="text-zinc-400 text-xs mt-1 max-w-xs mx-auto">
                            Coba ubah kata kunci pencarian atau reset filter kategori dan tool AI.
                        </p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                        >
                            Reset Semua Filter
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p>© {new Date().getFullYear()} AI Prompt Gallery. Didesain mobile-first untuk kreator konten.</p>
                    <div className="flex items-center gap-4 text-zinc-400 text-xs">
                        <span>Higgsfield AI</span>
                        <span>•</span>
                        <span>Kling AI</span>
                        <span>•</span>
                        <span>OpenRouter</span>
                    </div>
                </div>
            </footer>

            {/* Toast Notification */}
            <Toast message={toastMessage} visible={showToast} />
        </div>
    );
}
