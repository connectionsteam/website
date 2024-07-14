import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";

interface Props {
    disabled?: boolean;
    text: string;
    className?: string;
    onClick?: () => void;
    loading?: boolean;
    link?: boolean;
    href?: string;
}

export default function DefaultPremiumButton({ disabled, text, className, onClick, loading, link, href }: Props) {
    return (
        <div className="p-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 w-full">
            {link ? (
                <Link href={href || ""} className="p-3 rounded-lg bg-neutral-800 hover:bg-transparent transition w-full h-full 
                    isabled:text-neutral-300 disabled:hover:bg-neutral-800 flex gap-2 items-center 
                    justify-center ${className} group
                ">
                    {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" size={23} />
                    ) : (
                        <HiSparkles className="fill-yellow-500 group-hover:fill-white transition group-disabled:group-hover:fill-yellow-500" size={23} />
                    )}
                    <span>{text}</span>
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`p-3 rounded-lg bg-neutral-800 hover:bg-transparent transition w-full h-full 
                    isabled:text-neutral-300 disabled:hover:bg-neutral-800 flex gap-2 items-center 
                    justify-center ${className} group
                `}
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" size={23} />
                    ) : (
                        <HiSparkles className="fill-yellow-500 group-hover:fill-white transition group-disabled:group-hover:fill-yellow-500" size={23} />
                    )}
                    <span>{text}</span>
                </button>
            )}
        </div>
    );
}