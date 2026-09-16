import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Sparkles,
    Eye,
    Copy,
    ExternalLink,
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Terminal,
    Key,
    Check,
    Video,
    Film,
    ArrowUpRight,
    X,
} from 'lucide-react';
import Toast from '@/Components/Toast';

export default function Dashboard({ stats, prompts, categories, aiTools, botToken }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [tokenCopied, setTokenCopied] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    // Form for Adding New Prompt
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        prompt_text: '',
        ai_tool_id: aiTools[0]?.id || '',
        category_id: categories[0]?.id || '',
        preview_video_url: '',
        aspect_ratio: '9:16',
        model_version: '',
        custom_affiliate_url: '',
    });

    const handleCreatePrompt = (e) => {
        e.preventDefault();
        post(route('dashboard.prompts.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
                triggerToast('Prompt baru berhasil dipublikasikan!');
            },
        });
    };

    const handleTogglePublish = (promptId) => {
        router.patch(route('dashboard.prompts.toggle', promptId), {}, {
            preserveScroll: true,
            onSuccess: () => triggerToast('Status publikasi diperbarui!'),
        });
    };

    const handleDeletePrompt = (promptId, promptTitle) => {
        if (confirm(`Hapus prompt "${promptTitle}"?`)) {
            router.delete(route('dashboard.prompts.destroy', promptId), {
                preserveScroll: true,
                onSuccess: () => triggerToast('Prompt berhasil dihapus!'),
            });
        }
    };

    const handleCopyToken = () => {
        navigator.clipboard.writeText(botToken);
        setTokenCopied(true);
        triggerToast('X-BOT-TOKEN berhasil disalin ke clipboard!');
        setTimeout(() => setTokenCopied(false), 2000);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">
                            Admin & Creator Hub
                        </h1>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Pantau metrik performa video, link affiliate, dan kelola katalog prompt.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
                        >
                            <span>Buka Galeri Publik</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                        </a>

                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Prompt</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - PromptHub Admin" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* 1. Overview Metric Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat Card 1 */}
                    <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-zinc-400">
                            <span className="text-xs font-medium">Total Prompt</span>
                            <div className="p-2 rounded-xl bg-zinc-800/80 text-emerald-400">
                                <Film className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl sm:text-3xl font-black text-white">
                                {stats.total_prompts}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                                {stats.total_categories} Kategori • {stats.total_tools} AI Tools
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-zinc-400">
                            <span className="text-xs font-medium">Total Tayangan (Views)</span>
                            <div className="p-2 rounded-xl bg-zinc-800/80 text-blue-400">
                                <Eye className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl sm:text-3xl font-black text-white">
                                {stats.total_views.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                                Pratinjau video di halaman utama
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-zinc-400">
                            <span className="text-xs font-medium">Prompt Disalin</span>
                            <div className="p-2 rounded-xl bg-zinc-800/80 text-amber-400">
                                <Copy className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl sm:text-3xl font-black text-white">
                                {stats.total_copies.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                                Aksi klik tombol salin prompt
                            </div>
                        </div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-zinc-400">
                            <span className="text-xs font-medium">Klik Affiliate (/r/slug)</span>
                            <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                                <ExternalLink className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                                {stats.total_clicks.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                                Pengunjung diarahkan ke tool AI mitra
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Bot Automation Ingestion Card */}
                <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/30 border border-zinc-800 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-emerald-400" />
                                <h2 className="text-sm font-bold text-white">
                                    Automasi Ingest Prompt (Bot Python / Antigravity)
                                </h2>
                            </div>
                            <p className="text-xs text-zinc-400 max-w-2xl">
                                Bot generator dapat mengirimkan prompt secara otomatis via endpoint <code className="bg-zinc-950 px-1.5 py-0.5 rounded text-emerald-300 font-mono">POST /api/v1/prompts</code> dengan menyertakan header token di bawah.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono text-xs text-zinc-300 flex items-center gap-2 select-all">
                                <Key className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{botToken}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyToken}
                                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                            >
                                {tokenCopied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Tersalin</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Salin Token</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Prompt Management Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-bold text-white">Daftar Prompt Video</h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Kelola tayangan, teks prompt, dan tautan redirect affiliate aktif.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-zinc-300">
                            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-[11px] uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3.5">Prompt & Judul</th>
                                    <th className="px-4 py-3.5">Kategori / Tool</th>
                                    <th className="px-4 py-3.5 text-center">Performa</th>
                                    <th className="px-4 py-3.5 text-center">Status</th>
                                    <th className="px-4 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/70">
                                {prompts.data.length > 0 ? (
                                    prompts.data.map((p) => (
                                        <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                                            <td className="px-4 py-3.5 max-w-xs sm:max-w-md">
                                                <div className="font-semibold text-white text-xs truncate">
                                                    {p.title}
                                                </div>
                                                <div className="font-mono text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                                                    {p.prompt_text}
                                                </div>
                                                <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-2">
                                                    <span>/{p.slug}</span>
                                                    <span>•</span>
                                                    <span>Ratio: {p.aspect_ratio}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="inline-block px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold rounded-md">
                                                    {p.category?.name || '-'}
                                                </div>
                                                <div className="text-zinc-400 text-[11px] mt-1 font-medium">
                                                    {p.ai_tool?.name || '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-3 text-[11px]">
                                                    <span title="Views" className="flex items-center gap-1 text-zinc-400">
                                                        <Eye className="w-3 h-3 text-zinc-500" />
                                                        {p.views_count}
                                                    </span>
                                                    <span title="Copies" className="flex items-center gap-1 text-zinc-400">
                                                        <Copy className="w-3 h-3 text-zinc-500" />
                                                        {p.copies_count}
                                                    </span>
                                                    <span title="Clicks" className="flex items-center gap-1 text-emerald-400 font-semibold">
                                                        <ExternalLink className="w-3 h-3" />
                                                        {p.clicks_count}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTogglePublish(p.id)}
                                                    className="inline-flex items-center gap-1 cursor-pointer"
                                                    title="Klik untuk ubah status"
                                                >
                                                    {p.is_published ? (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                            Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                            Draft
                                                        </span>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <a
                                                        href={`/r/${p.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Test Redirect Affiliate"
                                                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-700 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeletePrompt(p.id, p.title)}
                                                        title="Hapus Prompt"
                                                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                                            Belum ada prompt yang tersimpan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Prompt Baru */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <h3 className="text-sm font-bold text-white">Tambah Prompt Video Baru</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePrompt} className="p-4 space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Judul Video Prompt
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Cyberpunk Samurai in Rain"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 outline-none"
                                />
                                {errors.title && <div className="text-red-400 text-[10px] mt-1">{errors.title}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Tool AI
                                    </label>
                                    <select
                                        value={data.ai_tool_id}
                                        onChange={(e) => setData('ai_tool_id', e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                                    >
                                        {aiTools.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Teks Prompt Lengkap
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.prompt_text}
                                    onChange={(e) => setData('prompt_text', e.target.value)}
                                    placeholder="Tuliskan prompt AI..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-white placeholder-zinc-500 focus:border-emerald-500 outline-none leading-relaxed"
                                />
                                {errors.prompt_text && <div className="text-red-400 text-[10px] mt-1">{errors.prompt_text}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    URL Video Pratinjau (MP4 Direct URL)
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={data.preview_video_url}
                                    onChange={(e) => setData('preview_video_url', e.target.value)}
                                    placeholder="https://domain.com/video.mp4"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 outline-none"
                                />
                                {errors.preview_video_url && <div className="text-red-400 text-[10px] mt-1">{errors.preview_video_url}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Rasio Aspek
                                    </label>
                                    <input
                                        type="text"
                                        value={data.aspect_ratio}
                                        onChange={(e) => setData('aspect_ratio', e.target.value)}
                                        placeholder="9:16"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Model Version (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.model_version}
                                        onChange={(e) => setData('model_version', e.target.value)}
                                        placeholder="v2.1"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Custom Affiliate Link (Opsional)
                                </label>
                                <input
                                    type="url"
                                    value={data.custom_affiliate_url}
                                    onChange={(e) => setData('custom_affiliate_url', e.target.value)}
                                    placeholder="Biarkan kosong untuk memakai URL default tool AI"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 outline-none"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-xl cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950/40"
                                >
                                    <span>Simpan & Publikasikan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Toast message={toastMessage} visible={showToast} />
        </AuthenticatedLayout>
    );
}
