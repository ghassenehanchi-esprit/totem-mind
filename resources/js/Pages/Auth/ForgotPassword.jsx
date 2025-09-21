import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const [requestSent, setRequestSent] = useState(Boolean(status));

    useEffect(() => {
        setRequestSent(Boolean(status));
    }, [status]);

    const submit = (e) => {
        e.preventDefault();
        setRequestSent(true);

        post(route('password.email'), {
            onSuccess: () => {
                setData('email', '');
            },
            onError: () => {
                setRequestSent(false);
            },
        });
    };

    return (
        <AuthLayout
            backgroundClassName="bg-brand-midnight"
            containerClassName="items-center justify-center"
            contentWrapperClassName="flex flex-col items-center gap-12 px-6 py-16 text-center"
            showLogo={false}
            footerVariant="light"
        >
            <Head title="Demander un nouveau mot de passe" />

            <ApplicationLogo className="h-20 w-auto" />

            <img
                src="/images/renard-blanc.png"
                alt="Illustration d'un renard"
                className="w-full max-w-xs"
            />

            <h1 className="text-3xl font-semibold text-white md:text-4xl">
                Demander un nouveau mot de passe
            </h1>

            <div className="w-full max-w-xl rounded-[2.5rem] bg-white/10 p-10 shadow-2xl shadow-black/20 backdrop-blur">
                {requestSent ? (
                    <p
                        className="text-center text-lg leading-relaxed text-white"
                        role="status"
                    >
                        Si cette adresse mail est enregistrée sur notre site, vous allez
                        recevoir un mail de réinitialisation dans quelques minutes.
                        Pensez à vérifier vos courriers indésirables !
                    </p>
                ) : (
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="text-left">
                            <InputLabel
                                htmlFor="email"
                                value="Adresse mail"
                                variant="brand"
                                className="sr-only"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                variant="brand"
                                placeholder="Adresse mail"
                                autoComplete="email"
                                isFocused
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="bg-white text-brand-midnight placeholder:text-brand-midnight/60"
                            />

                            <InputError
                                message={errors.email}
                                variant="brand"
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton
                            type="submit"
                            variant="brand"
                            disabled={processing}
                        >
                            Recevoir un mail pour réinitialiser le mot de passe
                        </PrimaryButton>
                    </form>
                )}
            </div>

            <Link
                href={route('login')}
                className="text-sm font-semibold text-white transition-colors hover:text-brand-sand"
            >
                Essayer de vous reconnecter
            </Link>
        </AuthLayout>
    );
}
