import GuildEditConnection from "../../../../components/Dashboard/Guilds/Connection";
import ConnectionGuildPageSkeleton from "../../../../components/Dashboard/Guilds/Connection/Skeleton";
import DefaultLayout from "../../../../components/Mixed/Layout";
import { ConnectedConnectionPayload, GuildChannelsPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function GuildConnection() {
    const router = useRouter();
    const { id, name } = router.query as { id: string, name: string };
    const [connection, setConnection] = useState<ConnectedConnectionPayload>();
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);

    useEffect(() => {
        if (!id && !name) return;

        const fetchConnection = async () => {
            const { data } = await api.get(`/guilds/${id}/connections/${name}`);

            setConnection(data);
        }

        const fetchChannels = async () => {
            const { data } = await api.get(`/guilds/${id}/channels`);

            setChannels(data);
        };

        Promise.all([fetchConnection(), fetchChannels()]);
    }, [id, name]);

    return (connection && channels) ? (
        <DefaultLayout>
            <GuildEditConnection
                channels={channels}
                guildId={id}
                connection={connection}
                setConnection={setConnection as Dispatch<SetStateAction<ConnectedConnectionPayload>>}
            />
        </DefaultLayout>
    ) : <ConnectionGuildPageSkeleton />;
}