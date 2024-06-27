import { ChangeEventHandler } from "react";

interface Props {
    label: string;
    type: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    obrigatory?: boolean;
    value?: string;
}

export default function DefaultInput({ label, type, placeholder, onChange, obrigatory, value }: Props) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-neutral-300 flex gap-1">
                <div>{label}</div>
                {obrigatory && <span className="text-red-500">*</span>}
            </label>
            <div className="w-full">
                <input
                    value={value}
                    className="transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none" 
                    onChange={onChange} 
                    type={type} 
                    placeholder={placeholder} />
            </div>
        </div>
    );
}