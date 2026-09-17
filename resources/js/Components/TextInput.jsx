import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
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

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-500 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm ' +
                className
            }
            ref={localRef}
        />
    );
});
