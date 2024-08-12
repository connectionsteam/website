import { GuildPayload, GuildThreadsPayload, Premium } from "../../../../../types";
import { useLanguage } from "../../../../../hooks/useLanguage";
import Thread from "./Thread";

export interface ThreadsProps {
    setThreads: (threads: GuildThreadsPayload[]) => void;
    threads: GuildThreadsPayload[];
    guild: GuildPayload;
    premium: Premium;
    setModifications: (modifications: boolean) => void;
    setGuild: (guild: GuildPayload) => void;
}

export default function Threads({ threads, setThreads, guild, premium, setGuild, setModifications }: ThreadsProps) {
    const l = useLanguage();

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-end">
                    <h1 className="font-semibold text-xl">Threads</h1>
                    <div className="text-neutral-300">{threads.length}/
                        <span>
                            {premium.maxThreads}
                        </span>
                    </div>
                </div>
                <span className="text-neutral-300 max-w-96 tablet:max-w-full">
                    {l.dashboard.guilds.threads.description}
                </span>
            </div>
            <div className="flex flex-col gap-3 h-full">
                {threads.length > 0 ? (
                    threads.map((thread) => (
                        <Thread
                            setModifications={setModifications}
                            setGuild={setGuild}
                            premium={premium}
                            guild={guild}
                            threads={threads}
                            key={thread.id}
                            thread={thread}
                            setThreads={setThreads}
                        />
                    ))
                ) : (
                    <div className="flex flex-col gap-2 h-full w-full">
                        <h1 className="font-bold text-xl mobile:text-lg">
                            {l.dashboard.guilds.threads.thread.noThreads}
                        </h1>
                        <span>{l.dashboard.guilds.threads.thread.noThreadsDescription}</span>
                    </div>
                )}
            </div>
        </div>
    );
}