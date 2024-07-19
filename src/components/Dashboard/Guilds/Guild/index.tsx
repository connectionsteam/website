"use client";
import DefaultLayout from "@/components/Mixed/Layout";
import { ConnectedConnectionPayload, DiscordMember, GuildChannelsPayload, GuildPayload, GuildThreadsPayload, Premium, TabState } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GuildSkeleton from "./Skeleton";
import Infos from "./Infos";
import Channels from "./Channels";
import GuildEditConnection from "../Connection";
import ProtectedRoute from "@/components/Mixed/ProtectedRoute";
import Cases from "./Cases";
import { useLanguage } from "@/hooks/useLanguage";
import usePremium from "@/hooks/usePremium";
import Connections from "./Connecions";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload>();
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
    const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);
    const [connection, setConnection] = useState<ConnectedConnectionPayload>(null!);
    const [members, setMembers] = useState<DiscordMember[]>([]);
    const { premium, setPremium } = usePremium(guild);
    const l = useLanguage();

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
                            premium={premium as Premium}
                            handleSelectConnection={handleSelectConnection}
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

            setGuild(guildRes.data);
            setThreads(guildRes.data.threads);
        };

        const fetchMembers = async () => {
            const membersRes = await api.get(`/guilds/${id}/members?limit=1000`);

            setMembers(membersRes.data);
        };

        const fetchChannels = async () => {
            const channelRes = await api.get(`/guilds/${id}/channels`);

            setChannels(channelRes.data);
        };

        Promise.all([fetchGuild(), fetchMembers(), fetchChannels()]);
    }, [id]);

    useEffect(() => {
        if (guild && threads && premium) {
            setTab({
                tabs: [
                    {
                        value: "infos",
                        title: l.dashboard.guilds.tabs.infos,
                        content: <Infos
                            premium={premium}
                            setPremium={setPremium}
                            members={members}
                            setGuild={setGuild}
                            setThreads={setThreads}
                            threads={threads}
                            key={0}
                            guild={guild}
                        />
                    },
                    {
                        value: "channels",
                        title: l.dashboard.guilds.tabs.channels,
                        content: <Channels setGuild={setGuild} guild={guild} channels={channels} key={0} />
                    },
                    {
                        value: "cases",
                        title: l.dashboard.guilds.tabs.cases,
                        content: <Cases members={members} guild={guild} key={0} />
                    },
                    {
                        value: "connections",
                        title: l.dashboard.guilds.tabs.connections,
                        content: <Connections
                            premium={premium}
                            handleSelectConnection={handleSelectConnection}
                            setConnection={setConnection}
                            key={0}
                            channels={channels}
                            setGuild={setGuild}
                            guild={guild}
                        />
                    }
                ],
                selected: tab.selected,
                connection: tab.connection,
            });
        }
    }, [guild, threads, channels, connection, premium]);

    return (
        <DefaultLayout>
            <ProtectedRoute loading={<GuildSkeleton />}>
                {guild ? (
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex mb-1 bg-neutral-800 rounded-lg p-1 overflow-x-auto relative">
                            {tab.tabs.map((t) => (
                                <>
                                    <button
                                        onClick={() => handleChangeTab(t.value)}
                                        className={`text-white px-4 rounded-lg py-2 
                                        cursor-pointer transition-colors duration-300 gap-2 flex z-20`}
                                    >
                                        <span>{t.title}</span>
                                    </button>
                                    <motion.div
                                        key={t.value}
                                        animate={{
                                            width: tab.selected === "channels" ? "75px"
                                            : tab.selected === "cases" ? "75px"
                                            : tab.selected === "connections" ? "100px"
                                            : tab.selected === "infos" ? "120px" : "100px",
                                            x: tab.selected === "channels" ? 130
                                            : tab.selected === "cases" ? 212
                                            : tab.selected === "connections" ? 290
                                            : (tab.connection && t.value === "connections") ? 290
                                            : tab.selected === "infos" ? 0 : 290
                                        }}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.3,
                                            duration: 0.5,
                                        }}
                                        className="absolute bg-neutral-700 z-10 h-[84%] w-12 rounded-xl
                                        -translate-y-1/2 -translate-x-1"
                                    >
                                    </motion.div>
                                </>
                            ))}
                        </div>
                        <div>
                            {tab.tabs.map((t) => (
                                tab.selected === t.value ? (
                                    <motion.div
                                        key={t.value}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {t.content}
                                    </motion.div>
                                ) : tab.connection && t.value === "connections" ? (
                                    <motion.div
                                        key={t.value}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
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
                        </div>
                    </div>
                ) : (
                    <GuildSkeleton />
                )}
            </ProtectedRoute>
        </DefaultLayout>
    );
}
