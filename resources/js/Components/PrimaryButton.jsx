export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-zinc-950 px-5 py-2.5 text-xs font-bold transition duration-150 shadow-md shadow-emerald-950/40 cursor-pointer disabled:cursor-not-allowed ${
                    disabled && 'opacity-30'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
