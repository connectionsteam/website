import { ConnectionBody, ConnectionsPageStructure, GuildChannelsPayload, GuildPayload } from "@/types";
import ConnectionChannels from "../Dashboard/Guilds/Connection/Channels";
import JoinConnectionLanguage from "../Dashboard/Guilds/Connection/Languages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "@/utils/api";

interface Props {
    setBody: Dispatch<SetStateAction<ConnectionBody>>;
    body: ConnectionBody;
    connection: ConnectionsPageStructure;
    guild: GuildPayload;
}

export default function ConnectionsPageChannels({ setBody, body, connection, guild }: Props) {
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);

    useEffect(() => {        
        const fetchChannels = async () => {
            const channelsRes = await api.get(`/guilds/${guild.id}/channels`);

            setChannels(channelsRes.data);
        };

        fetchChannels();
    }, [guild.id]);

    return (
        <>
            <JoinConnectionLanguage body={body} setBody={setBody} key={0} />
            <ConnectionChannels channels={channels} setBody={setBody} body={body} connection={connection as any} key={0} />
        </>
    );
}