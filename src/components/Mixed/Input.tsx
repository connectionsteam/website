import { ChangeEventHandler } from "react";

export default function DefaultInput({ label, type, placeholder, onChange, obrigatory }: { obrigatory?: boolean, label: string, type: string, placeholder: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-neutral-300 flex gap-1">
                <div>{label}</div>
                {obrigatory && <span className="text-red-500">*</span>}
            </label>
            <div className="w-full">
                <input className="transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none" onChange={onChange} type={type} placeholder={placeholder} />
            </div>
        </div>
    );
}