const baseClasses = {
    default: 'block text-sm font-medium text-gray-700',
    brand: 'block text-xs font-semibold uppercase tracking-[0.3em] text-white/80',
};

export default function InputLabel({
    value,
    className = '',
    children,
    variant = 'default',
    ...props
}) {
    const resolvedClasses = baseClasses[variant] ?? baseClasses.default;

    return (
        <label
            {...props}
            className={`${resolvedClasses} ${className}`.trim()}
        >
            {value ? value : children}
        </label>
    );
}
