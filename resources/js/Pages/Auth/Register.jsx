import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - PromptHub Admin" />

            <div className="mb-6 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Buat Akun Kreator Baru
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                    Daftar untuk mengunggah dan mengelola koleksi prompt AI video Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Nama Anda"
                        className="block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="email@example.com"
                        className="block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi (Password)" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Minimal 8 karakter"
                        className="block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Ulangi kata sandi"
                        className="block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-red-400"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? 'Mendaftarkan...' : 'Daftar Akun Sekarang'}
                    </PrimaryButton>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-center">
                    <p className="text-xs text-zinc-400">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="text-emerald-400 hover:underline font-semibold"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
