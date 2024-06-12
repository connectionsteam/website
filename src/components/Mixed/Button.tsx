import { ReactNode } from "react";

export default function DefaultButton({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
    return (
        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
            <button onClick={onClick} className={`flex items-center justify-center gap-2 ph-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition ${className}`}>
                {children}
            </button>
        </div>
    );
}