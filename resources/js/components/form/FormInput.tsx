import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function FormInput({
    label,
    error,
    type="text", //default type text
    className = "",
    ...props
}: FormInputProps) {
    return (
        <div className="form-control w-full mb-4">

            <label className="label">
                <span className="label-text font-semibold">
                    {label}
                </span>
            </label>

            <input
                {...props}
                type={type}
                className={`input input-bordered w-full ${className}`}
            />

            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">
                        {error}
                    </span>
                </label>
            )}

        </div>
    );
}