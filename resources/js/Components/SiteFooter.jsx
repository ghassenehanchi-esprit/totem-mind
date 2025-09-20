const variantStyles = {
    light: 'border-white/20 text-white/70',
    dark: 'border-slate-200 text-slate-600',
};

export default function SiteFooter({ className = '', variant = 'light' }) {
    const year = new Date().getFullYear();
    const resolvedVariant = variantStyles[variant] ?? variantStyles.light;

    return (
        <footer
            className={`mt-auto w-full border-t px-6 py-6 text-center text-xs uppercase tracking-[0.3em] ${resolvedVariant} ${className}`.trim()}
        >
            © {year} Totem Mind. Tous droits réservés.
        </footer>
    );
}
