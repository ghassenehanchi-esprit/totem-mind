import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email ?? '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const asideContent = (
        <div className="flex w-full flex-col items-center text-center text-white">
            <ApplicationLogo className="mb-10 h-16 w-auto" />
            <img
                src="/images/lézard-blanc.png"
                alt="Lézard Totem"
                className="w-full max-w-sm self-center"
            />
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-midnight"
            backgroundClassName="bg-brand-ocean"
            footerVariant="light"
            showLogo={false}
        >
            <Head title="Réinitialisation du mot de passe" />

            <div className="mt-[100px] rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Définir un nouveau mot de passe
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Saisissez votre adresse mail puis votre nouveau mot de
                        passe pour sécuriser votre compte.
                    </p>
                </div>

                <form className="mt-10 space-y-7" onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Adresse mail"
                            variant="brand"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            variant="brand"
                            placeholder="nom@exemple.com"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.email}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Nouveau mot de passe"
                            variant="brand"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            variant="brand"
                            autoComplete="new-password"
                            isFocused
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.password}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmation"
                            variant="brand"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            variant="brand"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="brand"
                        disabled={processing}
                        className="w-full"
                    >
                        Enregistrer le nouveau mot de passe
                    </PrimaryButton>
                </form>
            </div>
        </AuthLayout>
    );
}
