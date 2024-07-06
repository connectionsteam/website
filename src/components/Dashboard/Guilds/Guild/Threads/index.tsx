import { GuildChannelsPayload, GuildPayload, GuildThreadsPayload } from "@/types";
import { useState } from "react";
import { MenuProps } from "../Mods";
import DeleteThread from "./Menu";
import { api } from "@/utils/api";

interface Props {
    channels: GuildChannelsPayload[];
    setThreads: (threads: GuildThreadsPayload[]) => void;
    threads: GuildThreadsPayload[];
    guild: GuildPayload;
}

interface ThreadProps extends Props {
    thread: GuildThreadsPayload;
}

export default function Threads({ threads, setThreads, channels, guild }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl">Threads</h1>
            <div className="grid grid-cols-2 tablet:grid-cols-1 gap-2">
                {threads.map((thread) => <Thread guild={guild} threads={threads} channels={channels} key={thread.id} thread={thread} setThreads={setThreads} />)}
            </div>
        </div>
    );
}

function Thread({ thread, setThreads, channels, threads, guild }: ThreadProps) {
    const threadChannels = channels.filter((channel) => thread.children.includes(channel.id));

    const [menu, setMenu] = useState<MenuProps>({
        hover: null,
        removing: null,
    });

    const handleRemoveThread = async () => {
        setMenu({ ...menu, removing: thread.id });

        await api.get(`/guilds/${guild.id}/threads/${thread.id}`);

        const filtredThreads = threads.filter((thread) => thread.id !== thread.id);

        setTimeout(() => {
            setThreads(filtredThreads);

            setMenu({ ...menu, removing: null });
        }, 500);
    };

    return (
        <div
            onMouseEnter={() => setMenu({ ...menu, hover: thread.id })}
            onMouseLeave={() => setMenu({ ...menu, hover: "" })}
            className="relative"
        >
            <div className="w-full relative tabletdesk:invisible">
                <DeleteThread
                    thread={thread}
                    open={true}
                    handleRemove={handleRemoveThread}
                />
            </div>
            <DeleteThread
                thread={thread}
                open={menu.hover === thread.id}
                handleRemove={handleRemoveThread}
            />
            <div className="flex gap-2 items-center bg-neutral-900/50 rounded-lg p-3 break-all">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        <div className="font-semibold">Id de origem:</div>
                        <span>{thread.originId}</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="font-semibold">Criador da thread:</div>
                        <span>{thread.creatorId}</span>
                    </div>
                    <div className="flex items-start text-start gap-2">
                        <span className="font-semibold">Canais da thread:</span>
                        {threadChannels.map((channel) => channel.name).join(", ")}
                    </div>
                    <div className="text-sm text-neutral-300 flex gap-1">
                        <div className="font-semibold">Criada em:</div>
                        <span>{new Date(thread.createdTimestamp).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}