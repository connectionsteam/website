import { GuildChannelsPayload, GuildPayload, GuildThreadsPayload } from "@/types";
import { useState } from "react";
import { MenuProps } from "../Mods";
import DeleteThread from "./Menu";
import { api } from "@/utils/api";
import { useLanguage } from "@/hooks/useLanguage";
import usePremium from "@/hooks/usePremium";

interface Props {
    setThreads: (threads: GuildThreadsPayload[]) => void;
    threads: GuildThreadsPayload[];
    guild: GuildPayload;
}

interface ThreadProps extends Props {
    thread: GuildThreadsPayload;
}

export default function Threads({ threads, setThreads, guild }: Props) {
    const l = useLanguage();
    const premium = usePremium(guild);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-end">
                    <h1 className="font-semibold text-xl">Threads</h1>
                    <span className="text-neutral-300">{threads.length}/{premium.maxThreads}</span>
                </div>
                <span className="text-neutral-300 max-w-96 tablet:max-w-full">{l.dashboard.guilds.threads.description}</span>
            </div>
            <div className="flex flex-col gap-3 h-full">
                {threads.length > 0 ? (
                    threads.map((thread) => <Thread guild={guild} threads={threads} key={thread.id} thread={thread} setThreads={setThreads} />)
                ) : (
                    <div className="flex flex-col gap-2 h-full w-full">
                        <h1 className="font-bold text-xl mobile:text-lg">{l.dashboard.guilds.threads.thread.noThreads}</h1>
                        <span>{l.dashboard.guilds.threads.thread.noThreadsDescription}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function Thread({ thread, setThreads, threads, guild }: ThreadProps) {
    const l = useLanguage();

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
                    <div className="flex gap-1 mobile:flex-col">
                        <div className="font-semibold">{l.dashboard.guilds.threads.thread.originId}:</div>
                        <span className="text-neutral-300">{thread.originId}</span>
                    </div>
                    <div className="flex gap-1 mobile:flex-col">
                        <div className="font-semibold">{l.dashboard.guilds.threads.thread.creatorId}:</div>
                        <span className="text-neutral-300">{thread.creatorId}</span>
                    </div>
                    <div className="flex items-start text-start gap-2 mobile:flex-col">
                        <span className="font-semibold">{l.dashboard.guilds.threads.thread.channels}:</span>
                        <span className="text-neutral-300">{thread.children.join(", ")}</span>
                    </div>
                    <div className="text-sm text-neutral-300 flex gap-1 mobile:flex-col">
                        <div className="font-semibold">{l.dashboard.guilds.threads.thread.created}:</div>
                        <span className="text-neutral-300">{new Date(thread.createdTimestamp).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}