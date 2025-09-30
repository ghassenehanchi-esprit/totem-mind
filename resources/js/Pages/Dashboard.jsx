import SurveyLayout from '@/Layouts/SurveyLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <SurveyLayout activeItem="surveys">
            <Head title="Sondages rémunérés" />

            <div className="relative flex w-full flex-col overflow-hidden px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
                <img
                    src="/images/paysage-bleu.png"
                    alt="Décor de Totem Mind"
                    className="pointer-events-none absolute -top-6 right-6 w-52 max-w-full select-none opacity-30"
                    aria-hidden="true"
                />

                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 text-[#081b2e]">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-semibold text-[#081b2e]">Sondages rémunérés</h1>
                        <p className="max-w-2xl text-base text-[#081b2e]/80">
                            Certains sondages vous donnent des récompenses même si vous n'êtes pas sélectionné(e) !
                        </p>
                    </div>

                    <div className="rounded-3xl border border-dashed border-[#081b2e]/20 bg-white/60 px-6 py-6 text-sm italic text-[#081b2e]/70">
                        (note développeur : ici, on mettra le script-code des sondages)
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
                        <img
                            src="/images/element-08.png"
                            alt="Illustration décorative Totem Mind"
                            className="h-24 w-auto"
                        />

                        <p className="max-w-3xl text-2xl font-semibold leading-snug text-[#081b2e]">
                            On dirait qu'il n'y a plus de sondages disponibles pour le moment, revenez dans quelques heures !
                        </p>
                    </div>
                </div>
            </div>
        </SurveyLayout>
    );
}
