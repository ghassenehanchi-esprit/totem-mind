import ApplicationLogo from '@/Components/ApplicationLogo';
import SiteFooter from '@/Components/SiteFooter';
import { Link, usePage } from '@inertiajs/react';

export default function SurveyLayout({ children, activeItem = 'surveys' }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const navigation = [
        {
            key: 'surveys',
            label: 'Sondages rémunérés',
            href: route('dashboard'),
            type: 'link',
        },
        { key: 'welcome', label: '1€', type: 'placeholder' },
        { key: 'payment', label: 'Paiement', type: 'placeholder' },
        { key: 'settings', label: 'Paramètres', type: 'placeholder' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-[#212c39] font-sans text-white">
            <div className="flex flex-1 flex-col lg:flex-row">
                <aside className="w-full bg-[#212c39] px-8 py-10 lg:w-80">
                    <div className="flex h-full flex-col">
                        <Link href="/" className="flex items-center gap-4">
                            <ApplicationLogo className="h-14 w-auto" />

                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-[0.45em] text-white/60">
                                    Totem Mind
                                </span>
                                <span className="text-lg font-semibold text-white">
                                    Espace membre
                                </span>
                            </div>
                        </Link>

                        <div className="mt-10 space-y-1 text-white/70">
                            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/40">
                                Bonjour
                            </p>
                            <p className="text-lg font-semibold text-white">
                                {user?.name}
                            </p>
                            <p className="text-xs text-white/50">{user?.email}</p>
                        </div>

                        <nav className="mt-12 flex flex-col gap-2">
                            {navigation.map((item) => {
                                const isActive = item.key === activeItem;

                                if (item.type === 'link') {
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            className={`flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] transition-colors duration-200 ${
                                                isActive
                                                    ? 'bg-[#e0e1dc] text-[#212c39] shadow-lg shadow-black/10'
                                                    : 'bg-white/5 text-white/80 hover:bg-[#e0e1dc] hover:text-[#212c39]'
                                            }`.trim()}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }

                                return (
                                    <span
                                        key={item.key}
                                        aria-disabled="true"
                                        className="flex w-full items-center justify-between rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/30"
                                    >
                                        {item.label}
                                    </span>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-10">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                type="button"
                                className="inline-flex w-full items-center justify-center rounded-xl bg-[#e0e1dc] px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#212c39] shadow-lg shadow-black/10 transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                            >
                                Déconnexion
                            </Link>
                        </div>
                    </div>
                </aside>

                <main className="flex flex-1 items-stretch bg-[#e0e1dc] text-[#212c39]">
                    {children}
                </main>
            </div>

            <SiteFooter variant="dark" />
        </div>
    );
}
