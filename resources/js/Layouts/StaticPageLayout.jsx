import SiteFooter from '@/Components/SiteFooter';
import LandingNavbar from '@/Components/LandingNavbar';

export default function StaticPageLayout({ title, lead, children, contentClassName = '' }) {
    return (
        <div className="flex min-h-screen flex-col bg-brand-cream text-brand-midnight">
            <LandingNavbar ctaHref={route('dashboard')} />

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
