const providerConfig = {
    google: {
        className: 'bg-white text-[#1d263d] hover:bg-white/90',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill="#EA4335"
                    d="M12 11v2h5.5c-.2 1.3-.9 2.4-1.9 3.1l3 2.3c1.8-1.7 2.9-4.1 2.9-6.9 0-.7-.1-1.4-.2-2H12Z"
                />
                <path
                    fill="#34A853"
                    d="M5.3 14.6c-.3-.8-.5-1.6-.5-2.6s.2-1.8.5-2.6L2.3 6.9C1.5 8.5 1 10.2 1 12s.5 3.5 1.3 5.1l3-2.5Z"
                />
                <path
                    fill="#4285F4"
                    d="M12 5.1c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.6 1.5 14.4.6 12 .6 7.5.6 3.6 3.3 2.3 6.9l3 2.5C5.9 7.8 8.6 5.1 12 5.1Z"
                />
                <path
                    fill="#FBBC05"
                    d="M12 18.9c-3.4 0-6.1-2.7-6.7-6.3l-3 2.4C3.6 20.7 7.5 23.4 12 23.4c2.4 0 4.6-.8 6.3-2.2l-3-2.3c-.9.6-2 1-3.3 1Z"
                />
            </svg>
        ),
    },
    facebook: {
        className: 'bg-[#1877F2] text-white hover:bg-[#1452b7]',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M14 8h2.5V4.5H14a4 4 0 0 0-4 4V12H7.5v3.5H10V24h3.5v-8.5H16L16.5 12H13v-3.5a1 1 0 0 1 1-1Z"
                />
            </svg>
        ),
    },
    default: {
        className: 'border border-white/40 bg-white/10 text-white hover:bg-white/20',
        icon: null,
    },
};

export default function SocialAuthButton({
    provider = 'default',
    children,
    className = '',
    ...props
}) {
    const config = providerConfig[provider] ?? providerConfig.default;
    const baseClassName =
        'flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70';

    return (
        <button
            type="button"
            className={`${baseClassName} ${config.className} ${className}`.trim()}
            {...props}
        >
            {config.icon}
            <span>{children}</span>
        </button>
    );
}
