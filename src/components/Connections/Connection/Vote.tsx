import { UserContext } from "@/contexts/User";
import { ConnectionsPageStructure } from "@/types";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/utils/api";
import DefaultButton from "@/components/Mixed/Button";

interface Props {
    connection: ConnectionsPageStructure;
}

export default function ConnectionsPageVoteComponent({ connection }: Props) {
    const { user } = useContext(UserContext);
    const twelve_hours = 12 * 60 * 60 * 1000;
    const lastVoteTimestamp = connection.votes?.find((vote) => vote.userId === user?.id)?.lastVoteTimestamp ?? 0;
    const canVote = (Date.now() - lastVoteTimestamp >= twelve_hours);

    console.log(connection)

    const [voteProps, setVoteProps] = useState({
        loading: false,
        voted: false,
        restime: false,
        lastVoteTimestamp,
        canVote
    });

    const handleVote = async () => {
        setVoteProps({ ...voteProps, loading: true, voted: false });

        const res = await api.post(`/connections/${connection.name}/votes`);

        setVoteProps({ ...voteProps, loading: false, voted: true, lastVoteTimestamp: res.data.lastVoteTimestamp });

        setTimeout(() => {
            setVoteProps({ ...voteProps, restime: true });
        }, 1500);
    };

    const getRemainingHours = () => {
        const remainingTime = twelve_hours - (Date.now() - lastVoteTimestamp);

        return Math.ceil(remainingTime / (60 * 60 * 1000));
    };

    // p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition w-full flex gap-2 items-center disabled:opacity-50 disabled:hover:bg-neutral-700

    return (
        <DefaultButton
            className="p-2.5"
            disabled={!voteProps.canVote || voteProps.restime}
            onClick={handleVote}
        >
            <AnimatePresence mode="wait">
                {voteProps.canVote ? (
                    voteProps.loading ? (
                        <>
                            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                            <span>Votando...</span>
                        </>
                    ) : voteProps.voted ? (
                        <>
                            <FaCheckCircle className="text-green-500" size={20} />
                            <div className="flex">
                                <span className="pr-1">Votado</span>
                                <div className="flex gap-0.">
                                    (
                                    <motion.span
                                        key="voted"
                                        initial={{ opacity: 1, y: 0 }}
                                        animate={{ opacity: 0, display: "none", y: -10 }}
                                        transition={{ delay: 0.1, transition: { duration: 0.4 } }}
                                    >
                                        {connection.votes?.reduce((total, { count }) => total + count, 0) ?? 0}
                                    </motion.span>
                                    <motion.span
                                        key="voted"
                                        initial={{ opacity: 0, display: "none", y: 10, }}
                                        animate={{ opacity: 1, display: "block", y: 0 }}
                                        transition={{ delay: 0.4, transition: { duration: 0.1 } }}
                                    >
                                        {connection.votes?.reduce((total, { count }) => total + count, 0) + 1 ?? 0}
                                    </motion.span>
                                    )
                                </div>
                            </div>
                        </>
                    ) : voteProps.restime ? (
                        <>
                            <MdOutlineKeyboardArrowUp size={20} />
                            <span className="w-full text-start opacity-80">Volte daqui 12 horas</span>
                        </>
                    ) : (
                        <>
                            <MdOutlineKeyboardArrowUp size={20} />
                            <span>Votar ({connection.votes?.reduce((total, { count }) => total + count, 0) ?? 0})</span>
                        </>
                    )
                ) : (
                    <>
                        <MdOutlineKeyboardArrowUp size={20} />
                        <span className="w-full text-start opacity-80">Volte daqui {getRemainingHours()} {getRemainingHours() === 1 ? "hora" : "horas"}</span>
                    </>
                )}
            </AnimatePresence>
        </DefaultButton>
    )
}