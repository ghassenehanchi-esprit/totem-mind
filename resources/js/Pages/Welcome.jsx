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
            <div className="flex min-h-screen flex-col bg-brand-midnight text-white">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-brand-midnight via-[#172238] to-[#0f172a]">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src="/images/paysage-bleu.png"
                            alt="Illustration TotemMind"
                            className="pointer-events-none h-full w-full object-cover object-right"
                        />
                    </div>

                    <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-12 sm:pt-16 lg:flex-row lg:items-center lg:gap-12">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-3">
                                    <img src="/images/Logo-blanc.png" alt="TotemMind" className="h-12 w-auto" />
                                </Link>

                                <Link
                                    href={ctaLink}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
                                >
                                    Accéder aux sondages
                                </Link>
                            </div>

                            <div className="mt-12 max-w-xl">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                                    <span className="text-lg">✶</span> Recevez 1€ de bonus de bienvenue
                                </span>
                                <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                                    Gagnez de l’argent via Paypal en répondant à des sondages rémunérés
                                </h1>
                                <p className="mt-6 text-lg text-white/80">
                                    TotemMind.app vous permet de partager votre opinion avec des marques qui vous ressemblent.
                                    Répondez à des sondages sur mesure, cumulez vos gains en euros et transférez-les directement sur votre compte PayPal.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <div className="absolute -top-12 -right-6 h-32 w-32 rounded-full bg-brand-ocean/40 blur-3xl" aria-hidden="true" />
                            <img
                                src="/images/element-08.png"
                                alt="Motif Totem"
                                className="mx-auto h-[420px] w-auto drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
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
