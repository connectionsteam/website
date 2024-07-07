import { ConnectedConnectionFlags, ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { HiHashtag } from "react-icons/hi";
import { LuLock, LuUnlock } from "react-icons/lu";

interface Props {
    channels: GuildChannelsPayload[];
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
}

export default function Channels({ channels, guild, setGuild }: Props) {
    const [groupedChannels, setGroupedChannels] = useState<Record<string, GuildChannelsPayload[]>>({});

    useEffect(() => {
        const groupChannelsByCategory = () => {
            const grouped: Record<string, GuildChannelsPayload[]> = {};

            guild.connections.forEach(connection => {
                const channel = channels.find(ch => ch.id === connection.channelId);
                if (channel) {
                    const parentId = channel.parent_id || "uncategorized";

                    if (!grouped[parentId]) {
                        grouped[parentId] = [];
                    }

                    grouped[parentId].push(channel);
                }
            });

            return setGroupedChannels(grouped);
        };

        groupChannelsByCategory();
    }, [channels, guild.connections]);

    const handleToggleLocked = async (connectionName: string) => {
        const connection = guild.connections.find((connection) => connection.name === connectionName);

        if (!connection) return;

        const flags = connection.flags.includes(ConnectedConnectionFlags.Locked)
            ? connection.flags.filter((flag) => flag !== ConnectedConnectionFlags.Locked)
            : [...connection.flags, ConnectedConnectionFlags.Locked];

        await api.patch(`/guilds/${guild.id}/connections/${connection.name}`, { flags });

        setGuild({
            ...guild,
            connections: guild.connections.map((connection) => connection.name === connectionName ? { ...connection, flags } : connection)
        });
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl">Editar Canais bloqueados</h1>
                <span className="text-neutral-300">
                    Clique nos cadeados para bloquear e desbloquear o canal de cada conexão conectada em seu servidor
                </span>
            </div>
            <div className="w-full">
                {Object.entries(groupedChannels).map(([categoryId, categoryChannels]) => (
                    <button className="w-full flex gap-1 flex-col" key={categoryId}>
                        <div className="font-bold my-1">
                            {channels.find((channel) => channel.id === categoryId)?.name || ""}
                        </div>
                        {categoryChannels.map((channel) => {
                            const connection = guild.connections.find((connection) => connection.channelId === channel.id);

                            return connection ? (
                                <div
                                    onClick={() => handleToggleLocked(connection.name)}
                                    key={channel.id}
                                    className="hover:bg-neutral-900/50 transition flex gap-2 items-center w-full rounded-lg"
                                >
                                    <div className="p-3 flex gap-2 flex-grow w-full items-center justify-start">
                                        <HiHashtag />
                                        <span>{channel.name} - <strong>{connection.name}</strong></span>
                                    </div>
                                    <div className="flex gap-2 items-center pr-3">
                                        <div
                                            className={`transition text-black rounded-lg flex gap-2 p-1 items-center w-full
                                                ${connection.flags.includes(ConnectedConnectionFlags.Locked)
                                                    ? "bg-red-500"
                                                    : "bg-green-500"}
                                                `}
                                        >
                                            {connection.flags.includes(ConnectedConnectionFlags.Locked)
                                                ? <LuLock size={26} />
                                                : <LuUnlock size={26} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </button>
                ))}
            </div>
        </div>
    );
}