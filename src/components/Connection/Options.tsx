import { ConnectionBody, GuildChannelsPayload, GuildPayload } from "../../types";
import ConnectionChannels from "../Dashboard/Guilds/Connection/Channels";
import JoinConnectionLanguage from "../Dashboard/Guilds/Connection/Languages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    setBody: Dispatch<SetStateAction<ConnectionBody>>;
    body: ConnectionBody;
    guild: GuildPayload;
}

export default function ConnectionsPageChannels({ setBody, body, guild }: Props) {
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const l = useLanguage();

    useEffect(() => {
        const fetchChannels = async () => {
            const channelsRes = await api.get(`/guilds/${guild.id}/channels`);

            setChannels(channelsRes.data);
        };

        fetchChannels();
    }, [guild.id]);

    const joinConnection = async () => {
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

            await api.put(`/guilds/${guild!.id}/connections`, reqBody);

            setLoading(false);

            router.push(`/guild/${guild!.id}`);
        } catch (error: any) {
            const errors = {
                404: "Unknown connection",
                409: "This server already joinned this connection",
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
        <>
            <JoinConnectionLanguage body={body} setBody={setBody} />
            <ConnectionChannels
                channels={channels}
                setBody={setBody}
                body={body}
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
                            <span className="font-semibold">
                                {l.dashboard.guilds.connections.connecting}
                            </span>
                        </div>
                    ) : <span className="font-semibold">{l.dashboard.guilds.connections.connect}</span>}
                </button>
            </div>
        </>
    );
}