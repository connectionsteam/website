"use client"
import DefaultLayout from "@/components/Mixed/Layout";
import { ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload, GuildThreadsPayload, TabState } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GuildSkeleton from "./Skeleton";
import Infos from "./Infos";
import Channels from "./Channels";
import Connections from "./Connecions";
import GuildEditConnection from "../Connection";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload>();
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
    const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);
    const [connection, setConnection] = useState<ConnectedConnectionPayload>(null!);

    const [tab, setTab] = useState<TabState>({
        tabs: [],
        selected: "infos",
        connection: false,
    });

    const handleSelectConnection = async (connection: ConnectedConnectionPayload) => {
        setTab({ ...tab, connection: true, selected: connection.name });
        setConnection(connection);
    };

    const handleChangeTab = (selected: string) => {
        if (connection && selected === "connections")
            return setTab({
                connection: false, selected,
                tabs: [
                    ...tab.tabs.filter((t) => t.value !== "connections"),
                    {
                        value: "connections",
                        title: "Conexões",
                        content: <Connections
                            handleSelectConnection={handleSelectConnection}
                            connection={connection}
                            setConnection={setConnection}
                            key={0}
                            channels={channels}
                            setGuild={setGuild}
                            guild={guild as GuildPayload}
                        />
                    }
                ]
            });

        setTab({
            ...tab,
            connection: false,
            selected
        });
    };

    useEffect(() => {
        if (!id) return;

        const fetchGuild = async () => {
            const guildRes = await api.get(`/guilds/${id}`);
            const channelRes = await api.get(`/guilds/${id}/channels`);

            setThreads(guildRes.data.threads || []);
            setChannels(channelRes.data);
            setGuild(guildRes.data);
        };

        fetchGuild();
    }, [id]);

    useEffect(() => {
        if (guild && threads) {
            setTab({
                tabs: [
                    {
                        value: "infos",
                        title: "Informações",
                        content: <Infos
                            setGuild={setGuild}
                            setThreads={setThreads}
                            channels={channels}
                            threads={threads}
                            key={0}
                            guild={guild}
                        />,
                    },
                    {
                        value: "channels",
                        title: "Canais",
                        content: <Channels setGuild={setGuild} guild={guild} channels={channels} key={0} />,
                    },
                    {
                        value: "connections",
                        title: connection?.name || "Conexões",
                        content: <Connections
                            handleSelectConnection={handleSelectConnection}
                            connection={connection}
                            setConnection={setConnection}
                            key={0}
                            channels={channels}
                            setGuild={setGuild}
                            guild={guild}
                        />,
                    }
                ],
                selected: tab.selected,
                connection: tab.connection,
            });
        }
    }, [guild, threads, channels, connection]);

    return (
        <DefaultLayout>
            {guild ? (
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex mb-1 bg-neutral-800 rounded-lg p-1 overflow-x-auto">
                        {tab.tabs.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => handleChangeTab(t.value)}
                                className={`text-white px-4 rounded-lg py-2 cursor-pointer transition-colors duration-300 gap-2 flex ${(tab.connection && t.value === "connections") ? "bg-neutral-700" : ""} ${tab.selected === t.value ? "bg-neutral-700" : ""}`}
                            >
                                <span>{t.title}</span>
                            </button>
                        ))}
                    </div>
                    <div>
                        <AnimatePresence>
                            {tab.tabs.map((t) => (
                                tab.selected === t.value ? (
                                    <motion.div key={t.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                        {t.content}
                                    </motion.div>
                                ) : tab.connection && t.value === "connections" ? (
                                    <motion.div key={t.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                        <GuildEditConnection
                                            handleChangeTab={handleChangeTab}
                                            connection={connection}
                                            channels={channels}
                                            key={connection.name}
                                            setGuild={setGuild}
                                            guild={guild as GuildPayload}
                                            setConnection={setConnection}
                                        />
                                    </motion.div>
                                ) : null)
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <GuildSkeleton />
            )}
        </DefaultLayout>
    );
}