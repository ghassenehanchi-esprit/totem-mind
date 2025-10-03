const variantStyles = {
    light: {
        container: 'border-white/10 bg-brand-midnight text-white/80',
        label: 'text-white',
        link: 'text-white/80 hover:text-white',
    },
    dark: {
        container: 'border-transparent bg-[#1d263d] text-white/80',
        label: 'text-white',
        link: 'text-white/80 hover:text-white',
    },
};

const footerLinks = [
    { label: 'CGU', href: 'https://totemmind.app/cgu-mentions-legales/' },
    {
        label: 'Politique de confidentialité',
        href: 'https://totemmind.app/politique-de-confidentialite/',
    },
    { label: 'Contact', href: 'https://totemmind.app/contact/' },
];

export default function SiteFooter({ className = '', variant = 'light' }) {
    const { container, label, link } = variantStyles[variant] ?? variantStyles.light;

    return (
        <footer
            className={`mt-auto w-full border-t px-6 py-6 text-sm ${container} ${className}`.trim()}
        >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
                <span className={`font-semibold ${label}`.trim()}>
                    Totem Mind © 2025
                </span>

                {footerLinks.map((footerLink) => (
                    <a
                        key={footerLink.label}
                        href={footerLink.href}
                        className={`transition-colors ${link}`.trim()}
                    >
                        {footerLink.label}
                    </a>
                ))}
            </div>
        </footer>
    );
}
