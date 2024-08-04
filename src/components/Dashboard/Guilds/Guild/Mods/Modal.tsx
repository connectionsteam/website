import Avatar from "../../../../../components/Mixed/Avatar";
import DefaultInput from "../../../../../components/Mixed/Input";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { DiscordMember, GuildPayload } from "../../../../../types";
import { useState } from "react";

interface Props {
    handleAddMod: (user: DiscordMember) => void;
    guild: GuildPayload;
    members: DiscordMember[] | null;
}

export default function GuildModModal({ handleAddMod, guild, members }: Props) {
    const l = useLanguage();
    const [query, setQuery] = useState("");

    return (
        <>
            <DefaultInput
                onChange={(event) => setQuery(event.target.value)}
                placeholder="spyei"
                type="text"
                label={l.dashboard.guilds.mods.label}
            />
            <div className="flex flex-col gap-3 w-full max-h-96 overflow-y-auto justfy-start">
                {members ? (
                    members
                        .filter(user =>
                            user.user.username.toLowerCase().includes(query.toLowerCase())
                            || user.user.id.toLowerCase().includes(query.toLowerCase())
                            || user.user.global_name?.toLowerCase().includes(query.toLowerCase())
                        )
                        .filter((user) =>
                            !Object.keys(guild.mods).includes(user.user.id)
                            && !user.user.bot
                        )
                        .map((user, index) => (
                            <button
                                className="flex gap-3 text-start w-full rounded-lg p-3 bg-neutral-900/50 hover:bg-neutral-900 transition"
                                key={index}
                                onClick={() => handleAddMod(user)}
                            >
                                <Avatar
                                    className="w-12 h-12"
                                    src={`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`}
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg">{user.user.global_name || user.user.username}</span>
                                    <span className="text-neutral-300 text-sm">@{user.user.username}</span>
                                </div>
                            </button>
                        ))
                ) : (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            className="bg-neutral-900/50 w-full min-h-[72px] rounded-lg flex items-center p-3 gap-3"
                            key={index}
                        >
                            <div className="w-12 h-12 rounded-full bg-neutral-700 animate-pulse"></div>
                            <div className="flex flex-col gap-2">
                                <div className="bg-neutral-700 rounded-full h-5 animate-pulse w-24"></div>
                                <div className="bg-neutral-700 rounded-full h-3 animate-pulse w-20"></div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}