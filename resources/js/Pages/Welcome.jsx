import { Head, Link } from '@inertiajs/react';
import SiteFooter from '@/Components/SiteFooter';

const highlightSteps = [
    {
        title: 'Inscrivez-vous en quelques minutes',
        description:
            'Créez votre compte TotemMind.app, complétez votre profil et commencez à recevoir des sondages adaptés à vos centres d’intérêt.',
    },
    {
        title: 'Soyez récompensé en contribuant à l’avenir des entreprises',
        description:
            'Partagez vos opinions en toute simplicité, aidez les marques à progresser et transformez vos idées en décisions concrètes.',
    },
    {
        title: 'Transférez votre argent vers votre compte Paypal',
        description:
            'Convertissez vos gains en euros et récupérez-les à tout moment sur votre portefeuille PayPal en toute sécurité.',
    },
];

const reasons = [
    {
        title: 'Des sondages ciblés et rémunérés',
        description:
            'Recevez uniquement des sondages pertinents qui correspondent à votre profil et profitez d’une rémunération immédiate pour chaque participation complétée.',
    },
    {
        title: 'Une communauté engagée',
        description:
            'Rejoignez des milliers de répondants qui façonnent l’avenir des entreprises en donnant leur avis de manière constructive et authentique.',
    },
    {
        title: 'Un accompagnement constant',
        description:
            'Notre équipe vous accompagne à chaque étape avec des conseils, des rappels et des astuces pour optimiser vos gains et votre expérience.',
    },
];

const reflectionPrompts = [
    {
        title: 'Combien de temps passez-vous…',
        description:
            'Dans les transports ? Dans les files d’attente ? Autant de moments disponibles pour répondre à des sondages courts et agréables.',
    },
    {
        title: 'Par jour, par semaine, par mois, par année ?',
        description:
            'Avec TotemMind.app, vous choisissez votre rythme : répondez quand cela vous arrange et cumulez vos gains progressivement.',
    },
    {
        title: 'Et si ce temps-là vous était rémunéré en donnant votre opinion ?',
        description:
            'Partagez votre point de vue, influencez les décisions des entreprises et soyez récompensé pour chaque contribution.',
    },
];

export default function Welcome({ auth }) {
    const ctaLink = auth?.user ? route('dashboard') : route('login');

    return (
        <>
            <Head title="Accueil" />
            <div className="flex min-h-screen flex-col bg-[#0b1a33] text-white">
                <header className="border-b border-white/10 bg-[#0b1a33]/80">
                    <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <span className="text-xl font-semibold tracking-[0.6em]">TOTEM</span>
                            <span className="-ml-3 text-sm font-light uppercase tracking-[0.5em]">mind</span>
                        </Link>

                        <Link
                            href={ctaLink}
                            className="text-sm font-semibold uppercase tracking-[0.45em] text-white transition hover:text-brand-ocean"
                        >
                            Accéder aux sondages
                        </Link>
                    </div>
                </header>

                <div className="relative isolate flex flex-1 items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src="/images/paysage-bleu.png"
                            alt="Fond TotemMind"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-end lg:gap-20 lg:py-24">
                        <div className="max-w-xl space-y-8">
                            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                                Gagnez de l’argent via Paypal en répondant à des sondages rémunérés
                                <span className="text-brand-ocean"> *</span>
                            </h1>

                            <Link
                                href={ctaLink}
                                className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0b1a33] shadow-lg shadow-black/20 transition hover:bg-white/90"
                            >
                                Recevez 1€ de bonus de bienvenue
                            </Link>

                            <p className="text-sm text-white/70">
                                * Vous ne deviendrez pas millionnaire, mais au moins, vous pourrez récupérer l’argent que vous venez de dépenser chez Starbucks.
                            </p>
                        </div>

                        <div className="relative flex flex-1 justify-center">
                            <img
                                src="/images/loup-blanc.png"
                                alt="Illustration de loup TotemMind"
                                className="h-auto w-[320px] sm:w-[360px] lg:w-[420px]"

                            />
                        </div>
                    </div>
                </div>

                <main className="bg-brand-midnight">
                    <section className="bg-[#101a2f] py-16">
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {highlightSteps.map((step) => (
                                    <div
                                        key={step.title}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 shadow-lg shadow-black/10"
                                    >
                                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                        <p className="mt-4 leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#152139] py-16">
                        <div className="mx-auto max-w-5xl px-6 text-center">
                            <h2 className="font-serif text-3xl font-semibold text-white">
                                Pourquoi choisir TotemMind.app
                            </h2>
                            <p className="mt-4 text-white/70">
                                Soyez récompensé en contribuant à l’avenir des entreprises et en partageant votre opinion.
                            </p>

                            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason.title}
                                        className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-white/80 shadow-lg shadow-black/10"
                                    >
                                        <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
                                        <p className="leading-relaxed">{reason.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#101a2f] py-16">
                        <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
                            {reflectionPrompts.map((prompt) => (
                                <div
                                    key={prompt.title}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-white/80 shadow-lg shadow-black/10"
                                >
                                    <h3 className="font-serif text-2xl font-semibold text-white">{prompt.title}</h3>
                                    <p className="mt-4 text-base leading-relaxed">{prompt.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <SiteFooter variant="light" />
            </div>
        </>
    );
}
