import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function DefaultButton({ children, className, onClick, disabled }: Props) {
    return (
        <div aria-disabled={disabled} className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
            <button
                disabled={disabled || false}
                onClick={onClick}
                className={`${className} flex gap-2 ph-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition disabled:hover:bg-neutral-800`}
            >
                {children}
            </button>
        </div>
    );
}