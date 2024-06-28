"use client"
import DefaultInput from "@/components/Mixed/Input";
import { ConnectedConnectionPayload, ConnectionBody, GuildChannelsPayload, GuildPayload, Languages } from "@/types";
import { api } from "@/utils/api";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConnectionChannels from "./Channels";
import JoinConnectionLanguage from "./Languages";

interface Props {
    guild: GuildPayload;
    connection: ConnectedConnectionPayload;
    channels: GuildChannelsPayload[];
    onClose: () => void;
    setGuild: (guild: GuildPayload) => void;
};

export default function GuildConnectConnection({ guild, connection, channels, onClose, setGuild }: Props) {
    const [body, setBody] = useState<ConnectionBody>({
        channel: {
            id: "",
            name: "",
            position: 0,
            nsfw: false,
            parent_id: "",
        },
        name: "",
        language: {
            language: "",
            key: ""
        }
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const joinConnection = async () => {
        setLoading(true);

        if (guild.connections.map(c => c.name).includes(body.name)) {
            setErrors({ ...errors, api: "Already joinned this connection" });
            return setLoading(false);
        }

        try {
            const req = await api.put(`/guilds/${guild.id}/connections`, {
                channelId: body.channel.id,
                name: body.name,
                language: body.language.key,
            });

            setLoading(false);
            onClose();
            setGuild({
                ...guild,
                connections: [
                    ...guild.connections.filter(c => c.name !== req.data.name),
                    {
                        ...req.data,
                    }
                ]
            });
        } catch (error: any) {
            const json = error.response.data.errors[0].map((err: any) => err.message) || error.message;

            setLoading(false);
            setErrors({
                ...errors,
                api: json.join(", "),
            });
        }
    };

    console.log(body)

    return (
        <div className="flex w-full flex-col gap-4">
            <DefaultInput
                value={body.name}
                obrigatory
                onChange={(event) => setBody({ ...body, name: event.target.value })}
                key={0}
                label="Nome da conexão"
                type="text"
                placeholder="conexaolegal"
            />
            <JoinConnectionLanguage setBody={setBody} body={body} />
            <ConnectionChannels setBody={setBody} body={body} channels={channels} connection={connection} />
            {errors.api && <div className="text-red-500">{errors.api}</div>}
            <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                <button
                    disabled={loading}
                    onClick={joinConnection}
                    className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}
                >
                    {loading ? (
                        <div className="flex gap-2 items-center w-full justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                            <span className="font-semibold">Conectando...</span>
                        </div>
                    ) : <span className="font-semibold">Conectar</span>}
                </button>
            </div>
        </div>
    );
}