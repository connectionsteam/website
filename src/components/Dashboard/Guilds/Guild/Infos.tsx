import Avatar from "@/components/Mixed/Avatar";
import { DiscordMember, GuildChannelsPayload, GuildPayload, GuildThreadsPayload } from "@/types";
import GuildMods from "./Mods";
import Threads from "./Threads";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    threads: GuildThreadsPayload[];
    channels: GuildChannelsPayload[];
    setThreads: (threads: GuildThreadsPayload[]) => void;
    members: DiscordMember[];
}

export default function Infos({ guild, setGuild, threads, channels, setThreads, members }: Props) {
    return (
        <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Informações</h1>
            <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                    <Avatar className="w-16 h-16" key={0} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} />
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold text-lg">{guild.name}</span>
                        <div className="text-sm text-neutral-300">{guild.id}</div>
                    </div>
                </div>
                {(threads.length > 0 || !threads) && <Threads setThreads={setThreads} channels={channels} guild={guild} threads={threads} />}
                <GuildMods setGuild={setGuild} guild={guild} members={members} key={0} />
            </div>
        </div>
    )
}