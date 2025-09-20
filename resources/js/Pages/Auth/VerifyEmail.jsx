import PrimaryButton from '@/Components/PrimaryButton';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white">
            <img
                src="/images/loup-blanc.png"
                alt="Illustration d'un loup"
                className="w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Validez votre adresse mail pour débloquer l'ensemble des
                fonctionnalités de Totem Mind.
            </p>
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-ocean"
            backgroundClassName="bg-brand-midnight"
            footerVariant="light"
        >
            <Head title="Vérification de l’adresse mail" />

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Vérifiez votre adresse mail
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Cliquez sur le lien reçu par mail pour confirmer votre
                        compte. Vous n'avez rien reçu ? Envoyez un nouveau lien
                        en un clic.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mt-6 rounded-full bg-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-emerald-100">
                        Un nouveau lien de vérification vient d'être envoyé à
                        votre adresse mail.
                    </div>
                )}

                <form className="mt-10 space-y-6" onSubmit={submit}>
                    <PrimaryButton
                        disabled={processing}
                        variant="brand"
                        className="w-full"
                    >
                        Renvoyer l’email de vérification
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full rounded-full border border-white/40 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                    >
                        Se déconnecter
                    </Link>
                </form>
            </div>
        </AuthLayout>
    );
}
