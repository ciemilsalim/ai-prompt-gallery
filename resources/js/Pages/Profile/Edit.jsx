import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                    Pengaturan Profil Akun
                </h1>
            }
        >
            <Head title="Profil Akun - PromptHub" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-5 sm:p-8 rounded-2xl shadow-xl">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-5 sm:p-8 rounded-2xl shadow-xl">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-5 sm:p-8 rounded-2xl shadow-xl">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
