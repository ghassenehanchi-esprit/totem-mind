import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link } from '@inertiajs/react';

export default function RegistrationComplete() {
    return (
        <AuthLayout
            backgroundClassName="bg-brand-midnight"
            footerVariant="light"
            contentWrapperClassName="flex flex-col items-center text-center"
            showLogo
        >
            <Head title="Inscription terminée" />

            <img
                src="/images/renard-blanc.png"
                alt="Illustration d'un renard"
                className="mt-[100px] w-[70%] max-w-md"
            />

            <h1 className="mt-10 text-4xl font-semibold text-white">
                Inscription terminée
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/80">
                Félicitations, votre compte a été créé !
            </p>

            <p className="mt-4 max-w-2xl text-base text-white/70">
                Un e-mail vient de vous être envoyé. Cliquez sur le lien de
                validation pour confirmer votre adresse et accéder à votre
                espace personnel.
            </p>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Pensez à vérifier vos spams !
            </p>

            <Link
                href={route('login')}
                className="mt-12 inline-flex w-full items-center justify-center rounded-full bg-brand-sand px-8 py-3 font-serif text-lg font-semibold text-black transition-colors duration-200 hover:bg-white hover:text-[#1b263b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:w-auto"
            >
                Accéder à mon compte
            </Link>
        </AuthLayout>
    );
}
