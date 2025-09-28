import SurveyLayout from '@/Layouts/SurveyLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <SurveyLayout activeItem="surveys">
            <Head title="Sondages rémunérés" />

            <div className="relative flex w-full flex-col overflow-hidden px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
                    <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                    <div className="absolute bottom-0 right-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col">
                    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/95 px-8 py-10 text-[#081b2e] shadow-[0_40px_80px_-40px_rgba(4,15,28,0.45)] backdrop-blur">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-sm uppercase tracking-[0.35em] text-[#0f2a44]/60">
                                    Totem Mind
                                </p>
                                <h1 className="mt-4 font-serif text-4xl text-[#0f2a44]">
                                    Sondages rémunérés
                                </h1>
                                <p className="mt-4 max-w-xl text-base text-[#0f2a44]/75">
                                    Certains sondages vous donnent des récompenses même si vous n'êtes pas sélectionné(e) !
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl border border-dashed border-[#0f2a44]/30 bg-white/80 px-6 py-6 text-sm italic text-[#0f2a44]/70">
                            (note développeur : ici, on mettra le script-code des sondages)
                        </div>

                        <div className="relative mt-12 flex flex-col items-center gap-8 text-center">
                            <img
                                src="/images/element-08.png"
                                alt="Illustration décorative de Totem Mind"
                                className="h-24 w-auto"
                            />

                            <p className="max-w-3xl font-serif text-2xl leading-snug text-[#0f2a44]">
                                On dirait qu'il n'y a plus de sondages disponibles pour le moment, revenez dans quelques heures !
                            </p>
                            <p className="max-w-2xl text-base text-[#0f2a44]/70">
                                Patience, de nouvelles missions arrivent très vite. Activez vos notifications pour être averti dès
                                qu'un nouveau sondage rémunéré est disponible.
                            </p>
                        </div>

                        <img
                            src="/images/paysage-bleu.png"
                            alt="Paysage bleu décoratif"
                            className="pointer-events-none absolute bottom-0 right-0 w-[18rem] max-w-full translate-y-16 select-none opacity-90"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </SurveyLayout>
    );
}
