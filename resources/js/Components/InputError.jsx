const baseClasses = {
    default: 'text-sm text-red-600',
    brand: 'text-sm text-red-300',
};

export default function InputError({
    message,
    className = '',
    variant = 'default',
    ...props
}) {
    if (!message) {
        return null;
    }

    const resolvedClasses = baseClasses[variant] ?? baseClasses.default;

    return (
        <p
            {...props}
            className={`${resolvedClasses} ${className}`.trim()}
        >
            {message}
        </p>
    );
}
