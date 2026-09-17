import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi - PromptHub" />

            <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Pemulihan Kata Sandi
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Masukkan alamat email akun Anda. Kami akan mengirimkan tautan reset kata sandi ke kotak masuk Anda.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email Akun" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="email@example.com"
                        className="block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? 'Mengirim Tautan...' : 'Kirim Tautan Reset Sandi'}
                    </PrimaryButton>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-center">
                    <Link
                        href={route('login')}
                        className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors font-medium"
                    >
                        ← Kembali ke halaman masuk
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
