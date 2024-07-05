import Avatar from "@/components/Mixed/Avatar";
import { ConnectedConnectionFlags, ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload } from "@/types";
import BlockedWords from "./BlockedWords";
import { useState } from "react";
import GuildConnectionFlags from "./Flags";
import Image from "next/image";
import { HiHashtag } from "react-icons/hi";

interface Props {
    guild: GuildPayload;
    GuildConnection: ConnectedConnectionPayload;
    setGuild: (guild: GuildPayload) => void;
    channels: GuildChannelsPayload[];
}

export default function GuildEditConnection({ GuildConnection, guild, setGuild, channels }: Props) {
    const [connection, setConnection] = useState(GuildConnection);

    return (
        <div className="relative w-full">
            {connection.flags.includes(ConnectedConnectionFlags.Frozen) && (
                <Image
                    width={200}
                    height={50}
                    src="/backgrounds/frozenborder.png"
                    alt="Frozen border"
                    className="absolute -top-5 -left-4 z-0" />
            )}
            <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
                <h1 className="font-bold text-xl">Editar conexão conectada</h1>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <Avatar className="w-16 h-16" src={connection.icon || ""} />
                        <div className="flex gap-1 flex-col">
                            <span className="font-bold text-lg">{connection.name}</span>
                            <div className="text-neutral-300">{connection.description}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-xl">Informações</h1>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <div>Palavras bloqueadas:</div>
                                <span className="text-neutral-300">
                                    {connection.blockwords
                                        && connection.blockwords.length > 0 ? connection.blockwords.join(", ") : "Nenhuma"
                                    }
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="text-start">Flags:</div>
                                <span className="text-neutral-300">
                                    {connection.flags.length > 0 ? connection.flags.join(", ") : "Nenhuma"}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="text-start">Canal:</div>
                                <div className="text-neutral-300 flex gap-2 bg-neutral-900/50 rounded-lg p-1 text-sm items-center">
                                    <HiHashtag/>
                                    <span>{channels.find((channel) => channel.id === connection.channelId)?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-xl">Configurar</h1>
                        <div className="flex flex-col gap-3">
                            <BlockedWords setGuild={setGuild} setConnection={setConnection} guild={guild} connection={connection} />
                            <GuildConnectionFlags setGuild={setGuild} setConnection={setConnection} guild={guild} connection={connection} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
