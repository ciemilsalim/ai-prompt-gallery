import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email - PromptHub" />

            <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Verifikasi Alamat Email
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Terima kasih telah mendaftar! Sebelum memulai, silakan klik tautan verifikasi yang telah kami kirimkan ke email Anda.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 text-center">
                    Tautan verifikasi baru telah dikirimkan ke alamat email Anda.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi'}
                    </PrimaryButton>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-center">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs text-red-400 hover:underline font-medium"
                    >
                        Keluar (Log Out)
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
