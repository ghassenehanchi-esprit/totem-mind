import SurveyLayout from '@/Layouts/SurveyLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <SurveyLayout activeItem="surveys">
            <Head title="Sondages rémunérés" />

            <div className="relative flex w-full flex-col overflow-hidden px-0 pb-12 sm:pb-16">
                <div className="relative flex w-full flex-col gap-10 text-[#081b2e]">
                    <div className="relative -mx-6 flex flex-col gap-4 overflow-hidden bg-[#12385b] px-6 py-16 text-white sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
                        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">

                            <h1 className="text-4xl font-semibold text-white">Sondages rémunérés</h1>
                            <p className="max-w-2xl text-base text-white/80">
                                Certains sondages vous donnent des récompenses même si vous n'êtes pas sélectionné(e) !
                            </p>
                        </div>

                        <img
                            src="/images/element-08.png"
                            alt="Illustration décorative Totem Mind"
                            className="pointer-events-none absolute -top-12 right-0 h-40 w-auto max-w-none translate-x-10"
                        />
                    </div>

                    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-dashed border-[#081b2e]/20 bg-white/60 px-6 py-6 text-sm italic text-[#081b2e]/70">
                        (note développeur : ici, on mettra le script-code des sondages)
                    </div>

                    <div className="mx-auto flex flex-1 w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 text-center sm:px-10 lg:px-16">
                        <img
                            src="/images/paysage.png"
                            alt="Illustration de paysage Totem Mind"
                            className="h-auto w-full max-w-md"
                        />

                        <p className="max-w-3xl text-2xl font-serif font-semibold leading-snug text-[#333333]">
                            On dirait qu'il n'y a plus de sondages disponibles pour le moment, revenez dans quelques heures !
                        </p>
                    </div>
                </div>
            </div>
        </SurveyLayout>
    );
}
