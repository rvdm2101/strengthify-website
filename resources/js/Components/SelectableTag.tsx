import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';

interface SelectableTagProps<T> {
    value: T;
    label: string;
    isSelected: boolean;
    onClick: (value: T) => void;
    className?: string;
}

export default function SelectableTag<T> ({ value, label, isSelected, onClick, className }: SelectableTagProps<T>) {
    const activeClasses = 'bg-indigo-500 hover:bg-indigo-400 text-white';
    const inactiveClasses = 'bg-gray-100 hover:bg-gray-200';
    const basicIconClasses = 'h-4 w-4';

    return (
        <button
            type="button"
            className={`rounded-full pl-1 pr-3 py-1 flex gap-1 items-center transition ease-in-out duration-150 ${isSelected ? activeClasses : inactiveClasses} ${className}`}
            onClick={() => onClick(value)}
        >
            {isSelected ? <CheckIcon className={`${basicIconClasses}`} /> : <PlusIcon className={`${basicIconClasses}`} />}
            <h6>{label}</h6>
        </button>
    )
}