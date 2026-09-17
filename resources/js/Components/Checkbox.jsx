export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-md border-zinc-800 bg-zinc-950 text-emerald-500 shadow-sm focus:ring-emerald-500 focus:ring-offset-zinc-900 ' +
                className
            }
        />
    );
}
