import { ChangeEventHandler } from "react";

interface Props {
    label: string;
    type: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    obrigatory?: boolean;
    value?: string;
    textArea?: boolean;
    maxChars?: number;
    minChars?: number;
}

export default function DefaultInput({ label, type, placeholder, onChange, obrigatory, value, textArea, maxChars, minChars }: Props) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-neutral-300 flex gap-1">
                <div>{label}</div>
                {obrigatory && <span className="text-red-500">*</span>}
            </label>
            <div className="relative w-full">
                {textArea ? (
                    <textarea
                        value={value}
                        maxLength={(minChars && maxChars) ? maxChars + minChars : maxChars || 9999}
                        className={`transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none ${maxChars && "pb-4"}`}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        value={value}
                        maxLength={(minChars && maxChars) ? maxChars + minChars : maxChars || 9999}
                        className={`transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none ${maxChars && "pb-4"}`} 
                        onChange={onChange}
                        type={type}
                        placeholder={placeholder}
                    />
                )}
                {(value && maxChars) && <span className="absolute right-1 bottom-1 text-xs text-neutral-500">
                    {minChars ? value.length - minChars : value.length}/{maxChars}
                </span>
                }
            </div>
        </div>
    );
}