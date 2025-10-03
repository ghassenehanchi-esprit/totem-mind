export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#1d263d] shadow-sm focus:ring-[#1d263d] ' +
                className
            }
        />
    );
}
