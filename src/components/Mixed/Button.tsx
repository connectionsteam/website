import { cn } from "../../utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    href?: string;
    divclass?: string;
    pink?: boolean;
    notarget?: boolean;
}

export default function DefaultButton({ children, className, onClick, disabled, href, divclass, pink, notarget }: Props) {
    const sharedClasses = cn(
        "flex gap-2 h-full w-full items-center justify-center w-full rounded-lg bg-neutral-800 hover:bg-transparent transition disabled:hover:bg-neutral-800 text-center",
        className
    );

    return (
        <div className={cn(`p-[2px] bg-gradient-to-r ${!pink ? "from-fuchsia-500 to-indigo-500" : "from-pink-600 to-rose-700"} rounded-lg w-full`, divclass)}>
            {href ? (
                <Link
                    target={notarget ? "_self" : "_blank"}
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
