import { ConnectionsPageStructure } from "@/types";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import Avatar from "@/components/Mixed/Avatar";
import Link from "next/link";
import DefaultButton from "@/components/Mixed/Button";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    connection: ConnectionsPageStructure;
    index: number;
    query: string;
}

export default function ConnectionsPageCard({ connection, index, query }: Props) {
    const l = useLanguage();

    if (query.toLowerCase() === connection.name.toLowerCase()) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ delay: 0.1 * index, duration: 0.1 }}
            className="w-full relative"
        >
            {connection.promoted && (
                <div className="absolute px-2 font-semibold -top-3 flex rounded-full bg-fuchsia-500 left-3">
                    {l.connection.promoted}
                </div>
            )}
            <Link
                href={`/connection/${connection.name}`}
                className={`p-3 h-full bg-neutral-800 rounded-lg transition mobile:gap-2
                    hover:bg-neutral-700/70 w-full flex items-start justify-center mobile:flex-col
                    mobile:items-center
                ${connection.promoted ? "border-2 border-fuchsia-500" : ""}`}
            >
                <div className="flex gap-3 mobile:flex-col items-center flex-grow h-full">
                    {connection.icon && (
                        <div className="h-full flex items-center justify-center">
                            <div className="w-16 h-16">
                                <Avatar className="w-full h-full" src={connection.icon || ""} />
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 items-start mobile:items-center">
                        <span className="font-bold text-xl mobile:text-lg">{connection.name}</span>
                        {connection.description && (
                            <div className="flex items-start text-start w-full break-words 
                            rounded-lg text-lg mobile:items-center mobile:text-center">
                                <span>{connection.description}</span>
                            </div>
                        )}
                        <div className="text-neutral-300 px-2 bg-neutral-700 
                        rounded-lg flex items-center justify-center transition">
                            <span>{connection.votes?.reduce((total, { count }) => total + count, 0) ?? 0}</span>
                            <MdOutlineKeyboardArrowUp size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mobile:w-full">
                    <DefaultButton className="p-2 bg-neutral-700 rounded-lg transition w-full flex items-center">
                        <MdOutlineKeyboardArrowUp size={20} />
                        <span className="pr-2">{l.connection.vote}</span>
                    </DefaultButton>
                    <div className="p-2 bg-neutral-700 rounded-lg transition w-full flex gap-2 items-center">
                        <FaLink />
                        <span className="pr-2">{l.connection.connect}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}