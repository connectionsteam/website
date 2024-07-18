import { cn } from "@/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    href?: string;
}

export default function DefaultButton({ children, className, onClick, disabled, href }: Props) {
    const sharedClasses = cn(
        "flex gap-2 h-full items-center justify-center w-full rounded-lg bg-neutral-800 hover:bg-transparent transition disabled:hover:bg-neutral-800 text-center",
        className
    );

    return (
        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg">
            {href ? (
                <Link
                    href={href}
                    className={sharedClasses}
                >
                    {children}
                </Link>
            ) : (
                <button
                    disabled={disabled || false}
                    onClick={onClick}
                    className={sharedClasses}
                >
                    {children}
                </button>
            )}
        </div>
    );
}
