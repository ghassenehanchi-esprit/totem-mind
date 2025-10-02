const baseClasses = {
    default:
        'inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900',
    brand:
        'inline-flex w-full items-center justify-center rounded-full bg-[#e0e1dc] px-8 py-3 font-serif text-lg font-semibold text-black transition-colors duration-200 hover:bg-[#1b263b] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 disabled:cursor-not-allowed disabled:opacity-60',
};

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    variant = 'default',
    ...props
}) {
    const resolvedClasses = baseClasses[variant] ?? baseClasses.default;

    return (
        <button
            {...props}
            className={`${resolvedClasses} ${className}`.trim()}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
