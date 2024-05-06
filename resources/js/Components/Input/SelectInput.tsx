interface SelectInputOption {
    label: string;
    value: string;
}

interface SelectInputProps {
    id: string;
    placeholder?: string;
    options: SelectInputOption[];
    onChange: (value: string) => void;
    value?: string;
}

const SelectInput = ({ id, placeholder, options, onChange, value }: SelectInputProps) => {
    return (
        <select
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => onChange(e.target.value)}
            value={value}
        >
            {placeholder ? (<option>{placeholder}</option>) : null}
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}
export default SelectInput;
