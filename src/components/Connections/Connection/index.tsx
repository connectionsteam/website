import { forwardRef, useContext } from "react";
import { ConnectionsPageStructure } from "../../../types";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Avatar from "../../../components/Mixed/Avatar";
import Link from "next/link";
import DefaultButton from "../../../components/Mixed/Button";
import { useLanguage } from "../../../hooks/useLanguage";
import { UserContext } from "../../../contexts/User";
import ConnectConnection from "../../Connection/Connect";

interface Props {
    connection: ConnectionsPageStructure;
    index: number;
    layout: string;
    connections: ConnectionsPageStructure[];
}

const ConnectionsPageCard = forwardRef<HTMLDivElement, Props>(({ connection, index, layout, connections = [] }, ref) => {
    const l = useLanguage();
    const { user } = useContext(UserContext);

    const animation = connections.length < 16
        ? {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -30 },
            transition: { delay: 0.09 * index, duration: 0.09 },
        }
        : {};

    const twelve_hours = 12 * 60 * 60 * 1000;
    const lastVoteTimestamp = connection.votes?.find((vote) => vote.userId === user?.id)
        ?.lastVoteTimestamp ?? 0;
    const canVote = (Date.now() - lastVoteTimestamp >= twelve_hours);

    return (
        <motion.div
            {...animation}
            className="w-full relative"
            ref={ref}
        >
            {connection.promoted && (
                <div className="absolute px-2 font-semibold -top-3 flex rounded-full bg-fuchsia-500 left-3">
                    {l.connection.promoted}
                </div>
            )}
            <div
                className={`p-3 h-full bg-neutral-800 rounded-lg transition mobile:gap-2
                    hover:bg-neutral-700/70 w-full flex items-start justify-center mobile:flex-col
                    mobile:items-center
                    ${layout === "grid" ? "flex-col items-start tablet:items-center gap-2.5" : ""}
                    ${connection.promoted ? "border-2 border-fuchsia-500" : ""}`}
            >
                <Link
                    href={`/connection/${connection.name}`}
                    className={`flex gap-3 mobile:flex-col items-center flex-grow h-full
                    ${layout === "grid" ? "tablet:flex-col" : ""}
                `}
                >
                    {connection.icon && (
                        <div className="h-full flex items-center justify-center">
                            <div className="w-16 h-16">
                                <Avatar className="w-full h-full" src={connection.icon || ""} />
                            </div>
                        </div>
                    )}
                    <div
                        className={`flex flex-col gap-2 items-start mobile:items-center
                        ${layout === "grid" ? "tablet:items-center" : ""}
                        `}
                    >
                        <span className="font-bold text-xl mobile:text-lg">{connection.name}</span>
                        {connection.description && (
                            <div className="flex items-start text-start w-full break-words 
                            rounded-lg text-lg mobile:items-center mobile:text-center">
                                <span>{connection.description}</span>
                            </div>
                        )}
                        <div className={`text-neutral-300 px-2 bg-neutral-700 
                        rounded-lg flex items-center justify-center transition
                        ${layout === "grid" ? "tablet:items-center mb-2" : ""}
                        `}>
                            <span>{connection.votes?.reduce((total, { count }) => total + count, 0) ?? 0}</span>
                            <MdOutlineKeyboardArrowUp size={20} />
                        </div>
                    </div>
                </Link>
                <div className="flex gap-2 mobile:w-full">
                    <div className={canVote ? "" : "opacity-30"}>
                        <DefaultButton disabled={!canVote} className="p-2 bg-neutral-700 rounded-lg 
                        transition w-full flex items-center disabled:hover:bg-neutral-700">
                            <MdOutlineKeyboardArrowUp size={20} />
                            <span className="pr-2">{l.connection.vote}</span>
                        </DefaultButton>
                    </div>
                    <ConnectConnection connection={connection} small={true} />
                </div>
            </div>
        </motion.div>
    );
});

ConnectionsPageCard.displayName = "ConnectionsPageCard";

export default ConnectionsPageCard;