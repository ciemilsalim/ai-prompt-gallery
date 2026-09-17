import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Kata Sandi - PromptHub" />

            <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Perbarui Kata Sandi Baru
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                    Silakan masukkan kata sandi baru untuk akun Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Minimal 8 karakter"
                        className="block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi Baru"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Ulangi kata sandi baru"
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
                        {processing ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
