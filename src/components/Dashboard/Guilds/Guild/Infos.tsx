import Avatar from "@/components/Mixed/Avatar";
import { DiscordMember, GuildChannelsPayload, GuildPayload, GuildThreadsPayload } from "@/types";
import GuildMods from "./Mods";
import Threads from "./Threads";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    threads: GuildThreadsPayload[];
    setThreads: (threads: GuildThreadsPayload[]) => void;
    channels: GuildChannelsPayload[];
    members: DiscordMember[];
}

export default function Infos({ guild, setGuild, threads, setThreads, members, channels }: Props) {
    const l = useLanguage();

    return (
        <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-xl">{l.dashboard.guilds.info.title}</h1>
                <span className="text-neutral-300">{l.dashboard.guilds.info.description}</span>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                    <div className="w-16 h-16">
                        <Avatar className="w-16 h-16" key={0} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} />
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold text-lg">{guild.name}</span>
                        <div className="text-sm text-neutral-300">{guild.id}</div>
                    </div>
                </div>
                <div className="w-full flex tablet:flex-col gap-4">
                    <GuildMods setGuild={setGuild} guild={guild} members={members} key={0} />
                    <Threads setThreads={setThreads} guild={guild} threads={threads} />
                </div>
            </div>
        </div>
    )
}