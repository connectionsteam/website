"use client"
import DefaultInput from "@/components/Mixed/Input";
import { ConnectionBody, GuildChannelsPayload, GuildPayload, Premium } from "@/types";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConnectionChannels from "./Channels";
import JoinConnectionLanguage from "./Languages";
import { useLanguage } from "@/hooks/useLanguage";
import { useDisclosure } from "@nextui-org/modal";
import PremiumPopUp from "@/components/Premium/PopUp";

interface Props {
    guild: GuildPayload;
    channels: GuildChannelsPayload[];
    onClose: () => void;
    setGuild: (guild: GuildPayload) => void;
    premium: Premium
};

export default function GuildConnectConnection({ guild, channels, onClose, setGuild, premium }: Props) {
    const l = useLanguage();
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
    const [sonner, setSonner] = useState(false);
    const { isOpen: isPremiumOpen, onOpen: onPremiumOpen, onOpenChange: onPremiumChange, onClose: onPremiumClose } = useDisclosure();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                joinConnection();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [body, guild]);

    const joinConnection = async () => {
        if (guild.connections.length >= premium.maxConnections) {
            setSonner(false);
            setTimeout(() => setSonner(true), 0);

            return onPremiumOpen();
        };

        setLoading(true);

        try {
            let reqBody = {
                channelId: body.channel.id,
                name: body.name,
                language: body.language?.key,
            }

            if (body.language?.key === "" && body.language?.language === "") {
                delete reqBody.language;
            }

            const req = await api.put(`/guilds/${guild.id}/connections`, reqBody);

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
            const errors = {
                404: "Unknown connection",
                409: "Already joined this connection",
            }

            if (error.response.status in errors) {
                setErrors({ ...errors, api: errors[error.response.status as keyof typeof errors] });
                return setLoading(false);
            }

            const json = error.response.data.errors[0].map((err: any) => err.message) || error.message;

            setLoading(false);
            setErrors({
                ...errors,
                api: json.join(", "),
            });
        }
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <DefaultInput
                value={body.name}
                obrigatory
                onChange={(event) => setBody({ ...body, name: event.target.value })}
                label={l.dashboard.guilds.connections.connectionName}
                type="text"
                placeholder={l.dashboard.guilds.connections.connectionPlaceholder}
            />
            <JoinConnectionLanguage setBody={setBody} body={body} />
            <ConnectionChannels
                setBody={setBody}
                body={body}
                channels={channels}
                connections={guild.connections}
            />
            {errors.api && <div className="text-red-500">{errors.api}</div>}
            <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                <button
                    disabled={loading}
                    onClick={joinConnection}
                    className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg
                        bg-neutral-800 hover:bg-transparent transition 
                        ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}
                >
                    {loading ? (
                        <div className="flex gap-2 items-center w-full justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                            <span className="font-semibold">{l.dashboard.guilds.connections.connecting}</span>
                        </div>
                    ) : <span className="font-semibold">{l.dashboard.guilds.connections.connect}</span>}
                </button>
            </div>
            <PremiumPopUp
                isOpen={isPremiumOpen}
                sonner={sonner}
                onChange={onPremiumChange}
                onClose={onPremiumClose}
                limitText={`Você chegou no limite de conexões de ${guild.connections.length}/${premium.maxConnections}`}
                limit={guild.connections.length === 50}
                text="Parece que você chegou no seu limite de conexões..."
            />
        </div>
    );
}