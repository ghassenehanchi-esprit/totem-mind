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
        { key: 'payment', label: 'Paiement', type: 'placeholder' },
        { key: 'settings', label: 'Paramètres', type: 'placeholder' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-[#071522] text-white">
            <div className="flex flex-1 flex-col lg:flex-row">
                <aside className="w-full bg-[#212a3a] px-8 py-10 lg:w-80">
                    <div className="flex h-full flex-col">
                        <Link href="/" className="flex items-center gap-4 text-white">
                            <ApplicationLogo className="h-14 w-auto" />
                        </Link>

                        <div className="mt-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-white/60">Bonjour</p>
                                <p className="text-sm font-semibold text-white">{user?.email}</p>
                            </div>
                            <span
                                className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#081b2e]"
                            >
                                <span>1</span>
                                <span>€</span>
                            </span>
                        </div>

                        <nav className="mt-12 flex flex-col gap-3">
                            {navigation.map((item) => {
                                const isActive = item.key === activeItem;

                                if (item.type === 'link') {
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            className={`flex w-full items-center justify-between rounded-3xl px-5 py-4 text-sm font-semibold capitalize transition-colors duration-200 font-sans ${
                                                isActive
                                                    ? 'bg-[#f1f5f9] text-[#081b2e] shadow-xl shadow-black/30'
                                                    : 'bg-white/5 text-white/80 hover:bg-white/10'
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
                                        className="flex w-full items-center justify-between rounded-3xl bg-white/5 px-5 py-4 text-sm font-semibold capitalize text-white/30 font-sans"
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
                                className="inline-flex w-full items-center justify-center rounded-3xl bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#081b2e] shadow-xl shadow-black/30 transition-colors duration-200 hover:bg-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                            >
                                Déconnexion
                            </Link>
                        </div>
                    </div>
                </aside>

                <main className="relative flex flex-1 items-stretch bg-[#e0e1dd] text-[#081b2e]">
                    {children}
                </main>
            </div>

            <SiteFooter variant="dark" />
        </div>
    );
}
