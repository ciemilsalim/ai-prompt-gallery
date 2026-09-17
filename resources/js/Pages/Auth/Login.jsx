import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk - PromptHub Admin" />

            <div className="mb-6 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Masuk ke Akun
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                    Kelola prompt video, statistik konversi, dan token integrasi bot.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="admin@example.com"
                        className="block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] text-zinc-400 hover:text-emerald-400 transition-colors"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-xs text-zinc-400 select-none">
                            Ingat sesi saya
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? 'Memverifikasi...' : 'Masuk Sekarang'}
                    </PrimaryButton>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-center">
                    <p className="text-xs text-zinc-400">
                        Belum memiliki akun?{' '}
                        <Link
                            href={route('register')}
                            className="text-emerald-400 hover:underline font-semibold"
                        >
                            Daftar di sini
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
