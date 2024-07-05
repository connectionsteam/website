"use client"
import DefaultLayout from "@/components/Mixed/Layout";
import { GuildChannelsPayload, GuildPayload, GuildThreadsPayload, TabsStructure } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GuildSkeleton from "./Skeleton";
import Infos from "./Infos";
import Connections from "./Connecions";
import { BiX } from "react-icons/bi";
import Channels from "./Channels";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload>();
    const [tabs, setTabs] = useState<TabsStructure[]>([]);
    const [selectedTab, setSelectedTab] = useState("infos");
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
    const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);

    const addTab = (newTab: TabsStructure) => {
        setTabs((prevTabs) => {
            if (prevTabs.some(tab => tab.value === newTab.value)) return prevTabs;

            return [...prevTabs, newTab];
        });
    };

    const removeTab = (tab: TabsStructure, event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        setTabs((prevTabs) => {
            return prevTabs.filter(prevTab => prevTab.value !== tab.value);
        });

        setTimeout(() => {
            setSelectedTab("connections");
        }, 100);
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
            setTabs([
                {
                    value: "infos",
                    title: "Informações",
                    content: <Infos setGuild={setGuild} setThreads={setThreads} channels={channels} threads={threads} key={0} guild={guild} />,
                },
                {
                    value: "channels", 
                    title: "Canais",
                    content: <Channels setGuild={setGuild} guild={guild} channels={channels} key={0} />,
                },
                {
                    value: "connections",
                    title: "Conexões",
                    content: <Connections
                        key={0}
                        channels={channels}
                        setGuild={setGuild}
                        setSelectedTab={setSelectedTab}
                        guild={guild}
                        addTab={addTab}
                    />,
                },
                ...tabs.filter((tab) => !["connections", "infos", "channels"].includes(tab.value)),
            ]);
        }
    }, [guild, threads, channels]);

    return (
        <DefaultLayout>
            {guild ? (
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex mb-1 bg-neutral-800 rounded-lg p-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setSelectedTab(tab.value)}
                                className={`text-white px-4 rounded-lg py-2 cursor-pointer transition-colors duration-300 gap-2 flex ${selectedTab === tab.value ? "bg-neutral-700" : ""}`}
                            >
                                <span>{tab.title}</span>
                                {!["infos", "connections" ,"channels"].includes(tab.value) && (
                                    <button
                                        onClick={(event) => removeTab(tab, event)}
                                        className="flex items-center justify-center h-full text-neutral-300 hover:text-neutral-400 transition-colors duration-300">
                                        <BiX
                                            className="hover:fill-red-500 hover:bg-neutral-800 transition rounded-full font-bold"
                                            size={23}
                                        />
                                    </button>
                                )}
                            </button>
                        ))}
                    </div>
                    <div>
                        {tabs.map((tab) => (
                            selectedTab === tab.value && (
                                <motion.div key={tab.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                    {tab.content}
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <GuildSkeleton />
            )}
        </DefaultLayout>
    );
}
