import Avatar from "@/components/Mixed/Avatar";
import DefaultInput from "@/components/Mixed/Input";
import { useLanguage } from "@/hooks/useLanguage";
import { DiscordMember } from "@/types";

interface Props {
    query: string;
    setQuery: (query: string) => void;
    handleAddMod: (user: DiscordMember) => void;
    users: DiscordMember[];
}

export default function GuildModModal({ query, setQuery, handleAddMod, users }: Props) {
    const l = useLanguage();

    return (
        <>
            <DefaultInput
                onChange={(event) => setQuery(event.target.value)}
                placeholder="spyei"
                type="text"
                label={l.dashboard.guilds.mods.label}
            />
            <div className="flex flex-col gap-3 w-full max-h-96 overflow-y-auto justfy-start">
                {users ? (
                    users
                        .filter(user =>
                            !user.user.bot &&
                            user.user.username.toLowerCase().includes(query.toLowerCase())
                            || user.user.id.toLowerCase().includes(query.toLowerCase())
                            || user.user.global_name?.toLowerCase().includes(query.toLowerCase())
                        ).map((user, index) => (
                            <button
                                className="flex gap-3 text-start w-full rounded-lg p-3 bg-neutral-900/50 hover:bg-neutral-900 transition"
                                key={index}
                                onClick={() => handleAddMod(user)}
                            >
                                <Avatar className="w-12 h-12" src={`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`} />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg">{user.user.global_name || user.user.username}</span>
                                    <span className="text-neutral-300 text-sm">@{user.user.username}</span>
                                </div>
                            </button>
                        ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}