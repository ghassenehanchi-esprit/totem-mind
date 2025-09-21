import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link } from '@inertiajs/react';

export default function AccountValidated() {
    return (
        <AuthLayout
            backgroundClassName="bg-brand-midnight"
            footerVariant="light"
            contentWrapperClassName="flex flex-col items-center text-center text-white"
            showLogo
        >
            <Head title="Compte validé" />

            <img
                src="/images/renard-blanc.png"
                alt="Illustration d'un renard"
                className="w-full max-w-lg"
            />

            <div className="mt-16 flex w-full max-w-3xl items-center gap-8">
                <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/30"
                ></span>
                <h1 className="flex-shrink-0 font-serif text-5xl text-white">
                    Compte validé !
                </h1>
                <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/30"
                ></span>
            </div>

            <p className="mt-12 text-lg text-white/80">
                Votre compte a été validé !
            </p>

            <p className="mt-6 max-w-2xl text-base text-white/70">
                Vous pouvez maintenant démarrer vos sondages rémunérés en vous{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-brand-sand underline decoration-brand-sand/40 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/60"
                >
                    connectant sur cette page
                </Link>
                .
            </p>
        </AuthLayout>
    );
}
