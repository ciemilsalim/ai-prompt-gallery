import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Sandi - PromptHub" />

            <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Konfirmasi Keamanan
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Ini adalah area terlindungi. Silakan masukkan kata sandi Anda sebelum melanjutkan.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Akun" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? 'Memverifikasi...' : 'Konfirmasi Sandi'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
