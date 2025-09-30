import { Link } from '@inertiajs/react';

export default function LandingNavbar({
    ctaHref,
    ctaLabel = 'Accéder aux sondages',
    headerClassName = '',
    containerClassName = '',
    logoClassName = 'h-10 w-auto',
}) {
    return (
        <header className={`border-b border-white/10 bg-[#0b1a33]/80 ${headerClassName}`.trim()}>
            <div className={`mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 ${containerClassName}`.trim()}>
                <Link href="/" className="flex items-center" aria-label="Totem Mind">
                    <img src="/images/Logo-blanc.png" alt="Totem Mind" className={logoClassName} />
                </Link>

                {ctaHref ? (
                    <Link
                        href={ctaHref}
                        className="text-sm font-semibold uppercase tracking-[0.45em] text-white transition hover:text-brand-ocean"
                    >
                        {ctaLabel}
                    </Link>
                ) : null}
            </div>
        </header>
    );
}
