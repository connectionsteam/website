import Avatar from "@/components/Mixed/Avatar";
import { GuildPayload } from "@/types";
import GuildMods from "./Mods";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
}

export default function Infos({ guild, setGuild }: Props) {
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
                <GuildMods setGuild={setGuild} guild={guild} />
            </div>
        </div>
    )
}