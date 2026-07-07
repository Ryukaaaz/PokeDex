type option = {
    value: string | number;
    label: string;
};

type FormSelectProps = {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    options: option[];
};

export default function FormSelect({
    label,
    value,
    onChange,
    error,
    options,
}: FormSelectProps) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>

            <select
                value={value}
                onChange={onChange}
                className={`select select-bordered w-full ${error ? 'select error' : ''
                    }`}
            >
                <option value="">Select...</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}

            </select>

            {error && (
                <p className="text-error text-sm mt-1"> {error}</p>
            )}

        </div>
    );
}