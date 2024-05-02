import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export default forwardRef(function FileInput(
    { type = 'file', className = '', isFocused = false, image = undefined, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean, image?: File },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <>
            {image ? <div className="w-32 h-32 bg-center bg-no-repeat bg-contain shadow-xl rounded-xl mb-2" style={{
                backgroundImage: `url(${URL.createObjectURL(image)})`
                }} /> : null}
            <input
                {...props}
                type={type}
                className={
                    'block w-full text-sm text-gray-500 ' +
                    'file:me-4 file:py-2 file:px-4 ' +
                    'file:rounded-lg file:border-0 ' +
                    'file:text-sm file:font-semibold ' +
                    'file:bg-indigo-600 file:text-white ' +
                    'hover:file:bg-indigo-700 ' +
                    'file:disabled:opacity-50 file:disabled:pointer-events-none ' +
                    'dark:text-neutral-500 ' +
                    'dark:file:bg-indigo-500 ' +
                    'dark:hover:file:bg-indigo-400 ' +
                    className
                }
                ref={localRef}
            />
        </>
    );
});
