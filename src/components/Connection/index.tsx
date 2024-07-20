import { ConnectionsPageStructure, VotesPropsStructure } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../Mixed/Layout";
import Avatar from "../Mixed/Avatar";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import ConnectionsPageVoteComponent from "../Connections/Connection/Vote";
import { RiHashtag } from "react-icons/ri";
import { useLanguage } from "@/hooks/useLanguage";
import ConnectionsPageCard from "../Connections/Connection";
import ConnectConnection from "./Connect";
import Link from "next/link";
import { UserContext } from "@/contexts/User";
import ConnectionPageSkeleton from "./Skeleton";

export default function ConnectionPageComponent() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { query: { id } } = router;
    const [connection, setConnection] = useState<ConnectionsPageStructure>();
    const [recommendedConnections, setRecommendedConnections] = useState<ConnectionsPageStructure[]>();
    const [voteProps, setVoteProps] = useState<VotesPropsStructure>({
        loading: false,
        voted: false,
        restime: false,
        votes: 0,
        lastVoteTimestamp: 0,
        canVote: false
    });
    const l = useLanguage();

    useEffect(() => {
        if (!connection && !id) return;

        const fetchConnection = async () => {
            const connectionRes = await api.get(`/connections/${id}?with_votes=true`);
            const recomendedConnectionsRes = await api.get(`/connections/${id}/recommended`);

            setRecommendedConnections(recomendedConnectionsRes.data);
            setConnection(connectionRes.data);
        };

        fetchConnection();
    }, [id]);

    useEffect(() => {
        if (!connection) return;
        const twelve_hours = 12 * 60 * 60 * 1000;
        const lastVoteTimestamp = connection.votes?.find((vote) => vote.userId === user?.id)?.lastVoteTimestamp ?? 0;
        const canVote = (Date.now() - lastVoteTimestamp >= twelve_hours);
        const votes = connection.votes?.reduce((total, { count }) => total + count, 0) ?? 0

        setVoteProps({
            loading: false,
            voted: false,
            restime: false,
            votes,
            lastVoteTimestamp,
            canVote
        });
    }, [connection]);

    return connection && recommendedConnections ? (
        <DefaultLayout>
            <div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-4 p-6">
                <div className="flex w-full tablet:flex-col tablet:gap-4">
                    <div className="flex gap-4 items-center flex-grow mobile:flex-col">
                        {connection.icon && (
                            <Avatar src={connection.icon} className="w-24 h-24" />
                        )}
                        <div className="flex flex-col gap-2 items-start mobile:items-center">
                            <span className="font-bold text-2xl">{connection.name}</span>
                            {connection.description && (
                                <div className="flex items-start text-start w-full break-words rounded-lg mobile:text-center">
                                    <span>{connection.description}</span>
                                </div>
                            )}
                            <div className="text-neutral-300 px-2 bg-neutral-700 rounded-lg flex items-center justify-center transition">
                                <span>{voteProps.votes}</span>
                                <MdOutlineKeyboardArrowUp size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 min-w-[450px] justify-start items-start tablet:min-w-full mobile:flex-col">
                        <ConnectionsPageVoteComponent
                            connection={connection}
                            voteProps={voteProps}
                            setVoteProps={setVoteProps}
                        />
                        <ConnectConnection connection={connection} />
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold">{l.connection.creator}</span>
                    <div className="w-8 h-8">
                        <Avatar
                            className="w-full h-full"
                            src={`https://cdn.discordapp.com/avatars/${connection.creator.id}/${connection.creator.avatar}.png`}
                        />
                    </div>
                    <span className="font-bold text-lg">{connection.creator.username}</span>
                </div>
                <div className="flex items-center w-full gap-2">
                    {connection.tags.map((tag, index) => (
                        <button key={index} className="p-1 px-2 flex gap-2 items-center bg-neutral-700 rounded-lg">
                            <RiHashtag fill="#d946ef" />
                            <span>{tag}</span>
                        </button>
                    ))}
                </div>
                <span className="text-sm text-neutral-300">
                    {l.dashboard.guilds.threads.thread.created}
                    {new Date(connection.createdTimestamp).toLocaleString()}
                </span>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <span className="font-bold text-2xl">{l.connection.recommended}</span>
                <div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-1">
                    {recommendedConnections.map((connection, index) => (
                        <Link
                            className="w-full h-full flex"
                            href={`/connection/${connection.name}`} key={index}
                        >
                            <ConnectionsPageCard connection={connection} index={index} query={""} />
                        </Link>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    ) : <ConnectionPageSkeleton />;
}