import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const baseClasses = {
    default:
        'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
    brand:
        'w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base text-white placeholder-white/70 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-0',
};

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        variant = 'default',
        ...props
    },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const resolvedClasses = baseClasses[variant] ?? baseClasses.default;

    return (
        <input
            {...props}
            type={type}
            className={`${resolvedClasses} ${className}`.trim()}
            ref={localRef}
        />
    );
});
