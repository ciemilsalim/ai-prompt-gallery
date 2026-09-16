import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Copy, Check, ExternalLink, Sparkles, Film, Eye, ChevronDown, ChevronUp } from 'lucide-react';

export default function PromptCard({ prompt, onCopySuccess }) {
    const videoRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [copiesCount, setCopiesCount] = useState(prompt.copies_count || 0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Viewport-based Autoplay with IntersectionObserver
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoElement
                            .play()
                            .then(() => setIsVideoPlaying(true))
                            .catch(() => {
                                // Autoplay policy may restrict before interaction
                                setIsVideoPlaying(false);
                            });
                    } else {
                        videoElement.pause();
                        setIsVideoPlaying(false);
                    }
                });
            },
            {
                threshold: 0.45, // plays when ~45% is visible on screen
            }
        );

        observer.observe(videoElement);

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    const handleCopy = async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(prompt.prompt_text);
            setCopied(true);
            setCopiesCount((prev) => prev + 1);

            if (onCopySuccess) {
                onCopySuccess('Prompt berhasil disalin!');
            }

            // Fire tracking request to backend
            axios.post(`/api/track-copy/${prompt.id}`).catch(() => {
                // Tracking failure is non-blocking
            });

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <article className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-black/40 hover:shadow-emerald-950/20">
            {/* Media Box */}
            <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
                {/* Background Video */}
                <video
                    ref={videoRef}
                    src={prompt.preview_video_url}
                    poster={prompt.preview_thumbnail_url}
                    playsInline
                    muted
                    loop
                    preload="none"
                    className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle gradient overlay on top & bottom for legibility */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                {/* Floating Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                    {/* Tool Badge (Top Left) */}
                    <div className="bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[11px] text-zinc-100 font-medium flex items-center gap-1.5 shadow-sm">
                        {prompt.ai_tool?.logo_url ? (
                            <img
                                src={prompt.ai_tool.logo_url}
                                alt={prompt.ai_tool.name}
                                className="w-3.5 h-3.5 rounded-full object-cover"
                            />
                        ) : (
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                        )}
                        <span>{prompt.ai_tool?.name || 'AI Video'}</span>
                    </div>

                    {/* Category Badge (Top Right) */}
                    <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 shadow-sm">
                        <Film className="w-3 h-3 text-emerald-400" />
                        <span>{prompt.category?.name || 'Curated'}</span>
                    </div>
                </div>

                {/* Bottom Overlay Info (Title & Stats) */}
                <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none flex flex-col gap-1">
                    <h3 className="text-white font-bold text-sm tracking-tight drop-shadow-md line-clamp-1">
                        {prompt.title}
                    </h3>

                    <div className="flex items-center gap-2.5 text-[11px] text-zinc-300 font-medium drop-shadow">
                        <span className="bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-zinc-200 uppercase font-mono">
                            {prompt.aspect_ratio || '9:16'}
                        </span>
                        {prompt.model_version && (
                            <span className="text-zinc-300 truncate max-w-[120px]">
                                {prompt.model_version}
                            </span>
                        )}
                        <span className="ml-auto flex items-center gap-1 text-zinc-300">
                            <Eye className="w-3 h-3 text-zinc-400" />
                            {prompt.views_count || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body Info: Monospace Prompt Box */}
            <div className="p-3.5 flex flex-col gap-3 flex-1 bg-zinc-900">
                <div className="relative">
                    <div
                        className={`bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 font-mono text-xs text-zinc-300 leading-relaxed transition-all duration-200 ${
                            isExpanded ? '' : 'line-clamp-3'
                        }`}
                    >
                        {prompt.prompt_text}
                    </div>

                    {prompt.prompt_text.length > 120 && (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-1 text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors self-start font-medium cursor-pointer"
                        >
                            {isExpanded ? (
                                <>
                                    <span>Tutup prompt</span>
                                    <ChevronUp className="w-3 h-3" />
                                </>
                            ) : (
                                <>
                                    <span>Lihat prompt lengkap</span>
                                    <ChevronDown className="w-3 h-3" />
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Ergonomic Bottom Action Bar (Touch-target >= 44px) */}
                <div className="mt-auto pt-1 grid grid-cols-2 gap-2">
                    {/* Salin Prompt Button */}
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Salin Prompt"
                        className={`min-h-[44px] px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                            copied
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                                : 'bg-zinc-800 hover:bg-zinc-700/90 active:scale-[0.98] text-zinc-100 border border-zinc-700/50'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="font-semibold">✓ Tersalin</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 text-zinc-300" />
                                <span>Salin ({copiesCount})</span>
                            </>
                        )}
                    </button>

                    {/* Affiliate CTA Button */}
                    <a
                        href={`/r/${prompt.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Coba AI Tool Ini"
                        className="min-h-[44px] px-3 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md shadow-emerald-950/40"
                    >
                        <span>Coba di {prompt.ai_tool?.name?.split(' ')[0] || 'AI'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
                    </a>
                </div>
            </div>
        </article>
    );
}
