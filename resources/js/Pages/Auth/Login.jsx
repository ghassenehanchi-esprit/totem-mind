import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword, canRegister }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, [reset]);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white">
            <img
                src="/images/lézard-blanc.png"
                alt="Illustration d'un lézard"
                className="w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Accédez à votre espace Totem Mind pour continuer vos quêtes,
                suivre vos gains et profiter des sondages exclusifs.
            </p>
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
            <Head title="Connexion" />

            <div className="mb-10 mt-12 flex justify-center">
                <ApplicationLogo className="h-16 w-auto" />
            </div>

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Se connecter
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Retrouvez votre espace personnel et continuez l'aventure
                        Totem Mind.
                    </p>
                </div>

                {status && (
                    <div className="mt-6 rounded-full bg-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-emerald-100">
                        {status}
                    </div>
                )}

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
                            value="Mot de passe"
                            variant="brand"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            variant="brand"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.password}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <label className="flex items-center gap-3 text-sm text-white/90">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="size-5 border-white/40 text-brand-sand focus:ring-brand-sand focus:ring-offset-0"
                            />
                            <span>Se souvenir de moi</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-semibold text-white hover:text-brand-sand"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="brand"
                        disabled={processing}
                        className="w-full"
                    >
                        Se connecter
                    </PrimaryButton>
                </form>
            </div>

            {canRegister && (
                <p className="mt-12 text-center text-sm text-white/80">
                    Pas encore de compte ?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-white hover:text-brand-sand"
                    >
                        Inscrivez-vous !
                    </Link>
                </p>
            )}
        </AuthLayout>
    );
}
