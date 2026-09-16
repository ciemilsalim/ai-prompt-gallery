import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 font-sans antialiased">
            <nav className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-md sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-6">
                            <Link href="/dashboard" className="flex items-center gap-2.5 group">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                    <svg className="w-4 h-4 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="font-extrabold text-base tracking-tight text-white">
                                    Prompt<span className="text-emerald-400">Hub</span> <span className="text-xs font-normal text-zinc-400">Admin</span>
                                </span>
                            </Link>

                            <div className="hidden sm:flex items-center gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                        route().current('dashboard')
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                                    }`}
                                >
                                    Dashboard
                                </Link>

                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-emerald-300 hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5"
                                >
                                    <span>Lihat Galeri Publik</span>
                                    <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white hover:border-zinc-700 transition duration-150"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px]">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span>{user.name}</span>
                                                <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
                                        <Dropdown.Link href={route('profile.edit')} className="text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                            Profil Saya
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-xs text-red-400 hover:bg-red-500/10">
                                            Keluar (Log Out)
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-b border-zinc-800 bg-zinc-900/95'}>
                    <div className="space-y-1 px-3 pb-3 pt-2">
                        <Link
                            href={route('dashboard')}
                            className="block px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-zinc-800/80"
                        >
                            Dashboard
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-800"
                        >
                            Lihat Galeri Publik
                        </a>
                    </div>

                    <div className="border-t border-zinc-800 pb-3 pt-3 px-4">
                        <div className="text-xs font-semibold text-zinc-200">{user.name}</div>
                        <div className="text-[11px] text-zinc-500">{user.email}</div>
                        <div className="mt-2 space-y-1">
                            <Link href={route('profile.edit')} className="block py-1 text-xs text-zinc-400 hover:text-white">
                                Profil
                            </Link>
                            <Link method="post" href={route('logout')} as="button" className="block py-1 text-xs text-red-400 hover:underline">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-zinc-900/40 border-b border-zinc-800/60">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-6">{children}</main>
        </div>
    );
}

