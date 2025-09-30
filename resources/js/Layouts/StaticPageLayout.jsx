import ApplicationLogo from '@/Components/ApplicationLogo';
import SiteFooter from '@/Components/SiteFooter';
import { Link } from '@inertiajs/react';

export default function StaticPageLayout({ title, lead, children, contentClassName = '' }) {
    return (
        <div className="flex min-h-screen flex-col bg-brand-cream text-brand-midnight">
            <header className="border-b border-brand-sand/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                    <Link href="/" className="flex items-center gap-4 text-brand-midnight">
                        <ApplicationLogo className="h-14 w-auto" />

                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-[0.4em] text-brand-ocean/70">
                                Totem Mind
                            </span>
                            <span className="font-serif text-2xl text-brand-midnight">
                                Univers des explorateurs
                            </span>
                        </div>
                    </Link>

                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center justify-center rounded-full border border-brand-ocean/20 bg-brand-midnight px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-brand-midnight/20 transition-colors duration-200 hover:bg-brand-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ocean/40"
                    >
                        Accéder aux sondages
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                <div className="mx-auto w-full max-w-5xl px-6 py-16">
                    <div className="rounded-3xl border border-brand-sand/80 bg-white/95 px-8 py-10 shadow-[0_40px_80px_-40px_rgba(29,38,61,0.35)]">
                        <div className="max-w-3xl">
                            <p className="text-xs uppercase tracking-[0.4em] text-brand-ocean/60">Totem Mind</p>
                            <h1 className="mt-4 font-serif text-4xl text-brand-midnight">{title}</h1>
                            {lead ? (
                                <p className="mt-4 text-base leading-relaxed text-brand-midnight/70">{lead}</p>
                            ) : null}
                        </div>

                        <div
                            className={`mt-10 text-base leading-relaxed text-brand-midnight/80 ${contentClassName}`.trim()}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter variant="light" />
        </div>
    );
}
