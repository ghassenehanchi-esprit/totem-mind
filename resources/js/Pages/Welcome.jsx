import { Head, Link } from '@inertiajs/react';
import SiteFooter from '@/Components/SiteFooter';

const highlightSteps = [
    {
        title: 'Inscrivez-vous en une minute',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        ),
    },
    {
        title: 'Participez à une dizaine de sondages disponibles chaque jour',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 0h-.75m.75 0v15.75c0 .414.336.75.75.75h14.25a.75.75 0 0 0 .75-.75V5.25m-16.5 0V4.5A.75.75 0 0 1 4.5 3.75h15a.75.75 0 0 1 .75.75v.75m-5.25 3h-6m6 4.5h-6m3 4.5H9"
                />
            </svg>
        ),
    },
    {
        title: 'Transférez votre argent vers Paypal dès 5€',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18m0 0 5.25-5.25M12 21l-5.25-5.25M5.625 9.75H4.5a1.5 1.5 0 1 0 0 3h1.125m12.75-3H19.5a1.5 1.5 0 1 1 0 3h-1.125"
                />
            </svg>
        ),
    },
];

const reasons = [
    {
        description:
            'Ici, vous ne gagnez ni des points, ni des cartes cadeaux. Vous gagnez de vrais euros qui arrivent sur votre compte PayPal (retrait dès 5€).',
    },
    {
        description:
            'Marre d’être viré d’un sondage après avoir passé de précieuses minutes à répondre sans rien recevoir en retour ? Sur Totem Mind, certains sondages vous donnent de mini récompenses même quand vous n’êtes pas sélectionné !',
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
                    <section className="bg-[#f3f1eb] py-20 text-[#212d3a]">
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="flex flex-col items-center gap-14">
                                <div className="grid w-full gap-10 lg:grid-cols-3">
                                    {highlightSteps.map((step, index) => (
                                        <div
                                            key={step.title}
                                            className={`flex flex-col items-center gap-6 text-center lg:px-10 ${
                                                index !== highlightSteps.length - 1
                                                    ? 'lg:border-r lg:border-[#d9d6cf]'
                                                    : ''
                                            }`}
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9d6cf] bg-white text-[#212d3a]">
                                                {step.icon}
                                            </div>
                                            <p className="font-serif text-lg leading-relaxed">{step.title}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full rounded-full bg-[#e3dfd6] px-10 py-5 text-center">
                                    <p className="font-serif text-base tracking-wide text-[#212d3a]/80">
                                        Soyez récompensé en contribuant à l’avenir des entreprises et en partageant votre opinion
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#102a46] py-24 text-white">
                        <div className="mx-auto max-w-4xl px-6 text-center">
                            <div className="flex justify-center">
                                <img
                                    src="/images/element-08.png"
                                    alt="Illustration Totem"
                                    className="h-20 w-20"
                                />
                            </div>

                            <h2 className="mt-10 font-serif text-3xl font-semibold">Pourquoi choisir TotemMind.app</h2>

                            <div className="mt-12 grid gap-8 md:grid-cols-2">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason.description}
                                        className="h-full rounded-xl border border-white/30 bg-white/5 px-8 py-10 text-left text-[15px] leading-relaxed text-white/90"
                                    >
                                        {reason.description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="bg-[#f3f1eb] py-24 text-[#212d3a]">
                        <div className="mx-auto max-w-3xl px-6">
                            <div className="border-l-4 border-[#212d3a]/30 pl-8">
                                <h2 className="font-serif text-3xl font-semibold leading-tight">
                                    Combien de temps passez-vous...
                                </h2>

                                <div className="mt-6 space-y-3 font-serif text-lg leading-relaxed">
                                    <p>Dans les transports ? Dans les files d’attente ?</p>
                                    <p>Par jour, par semaine, par mois, par année ?</p>
                                    <p>
                                        Et si ce temps-là vous était rémunéré en donnant votre opinion ?
                                    </p>
                                </div>

                                <Link
                                    href={ctaLink}
                                    className="mt-10 inline-flex items-center justify-center rounded-full bg-[#0b1a33] px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-md shadow-black/20 transition hover:bg-[#0b1a33]/90"
                                >
                                    Commencez avec 1€ de bonus de bienvenue
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <SiteFooter variant="light" />
            </div>
        </>
    );
}
