import SurveyLayout from '@/Layouts/SurveyLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <SurveyLayout activeItem="surveys">
            <Head title="Sondages rémunérés" />

            <div className="flex w-full flex-col">
                <div className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-16 lg:py-16">
                    <div className="flex flex-col gap-10">
                        <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <h1 className="font-serif text-4xl text-[#1f2d3c]">
                                    Sondages rémunérés
                                </h1>
                                <p className="mt-4 text-base text-[#1f2d3c]/80">
                                    Certains sondages vous donnent des récompenses même si vous n'êtes
                                    pas sélectionné(e) !
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/80 px-8 py-6 text-center text-[#212c39] shadow-lg shadow-black/5">
                                <p className="text-xs uppercase tracking-[0.45em] text-[#212c39]/60">
                                    Cadeau de bienvenue
                                </p>
                                <p className="mt-3 text-4xl font-bold text-[#212c39]">+1€</p>
                                <p className="mt-2 text-sm text-[#212c39]/70">
                                    Chaque nouvel explorateur reçoit automatiquement 1€ dès son
                                    inscription.
                                </p>
                                <button
                                    type="button"
                                    className="mt-5 inline-flex items-center justify-center rounded-full bg-[#e0e1dc] px-8 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#212c39] shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#212c39]/30"
                                >
                                    Voir mes gains
                                </button>
                            </div>
                        </header>

                        <div className="rounded-3xl border border-dashed border-[#212c39]/30 bg-white/60 px-8 py-6 text-sm text-[#212c39]/70 shadow-inner shadow-black/5">
                            (note développeur : ici, on mettra le script-code des sondages)
                        </div>

                        <section className="flex flex-col items-center justify-center rounded-3xl bg-white px-10 py-16 text-center shadow-xl shadow-black/10">
                            <div className="rounded-full bg-[#e0e1dc] p-6 shadow-inner shadow-black/5">
                                <svg
                                    viewBox="0 0 120 120"
                                    aria-hidden="true"
                                    className="h-20 w-20 text-[#415a78]"
                                    fill="none"
                                >
                                    <path
                                        d="M20 92h80"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M30 92l18-32 16 24 14-20 22 28"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle cx="36" cy="28" r="4" fill="currentColor" />
                                    <path
                                        d="m74 18 3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z"
                                        fill="currentColor"
                                        opacity="0.4"
                                    />
                                    <path
                                        d="M54 46c4 2 7 5 8 10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        opacity="0.6"
                                    />
                                </svg>
                            </div>

                            <p className="mt-10 max-w-3xl font-serif text-2xl leading-snug text-[#333333]">
                                On dirait qu'il n'y a plus de sondages disponibles pour le moment,
                                revenez dans quelques heures !
                            </p>
                            <p className="mt-4 max-w-2xl text-base text-[#212c39]/70">
                                Patience, de nouvelles missions arrivent très vite. Activez vos
                                notifications pour être averti dès qu'un nouveau sondage rémunéré est
                                disponible.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </SurveyLayout>
    );
}
