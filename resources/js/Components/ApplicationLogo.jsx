export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            src="/images/Logo-blanc.png"
            alt="Totem Mind"
            className={`h-16 w-auto ${className}`.trim()}
            {...props}
        />
    );
}
