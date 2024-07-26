import { ConnectionsPageStructure } from "@/types";
import Link from "next/link";
import Avatar from "../Mixed/Avatar";
import abbreviateNumber from "@/utils/abbreviate";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function ConnectionPageCard({ connection }: { connection: ConnectionsPageStructure }) {
    return (
        <Link
            className="p-3 rounded-lg bg-neutral-800 items-center flex
            transition hover:bg-neutral-700"
            href={`/connection/${connection.name}`}
            key={connection.name}
        >
            <div className="flex gap-3">
                {connection.icon && (
                    <Avatar
                        src={connection.icon}
                        className="w-12 h-12 rounded-full"
                    />
                )}
                <div className="flex flex-col">
                    <span className="font-bold text-lg">{connection.name}</span>
                    <div className="text-neutral-300 rounded-lg 
                    transition text-sm flex items-center">
                        <span className="bg-neutral-700 pl-2 rounded-l-lg">
                            {abbreviateNumber(connection.votes
                                ?.reduce((total, { count }) =>
                                    total + count, 0)) ?? 0}
                        </span>
                        <div className="h-full bg-neutral-700 flex 
                        items-center justify-center px-1 rounded-r-lg">
                            <MdOutlineKeyboardArrowUp size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}