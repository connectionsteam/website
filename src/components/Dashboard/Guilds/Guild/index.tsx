import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import DefaultLayout from "@/components/Mixed/Layout";
import ProtectedRoute from "@/components/Mixed/ProtectedRoute";
import { api } from "@/utils/api";
import GuildSkeleton from "./Skeleton";
import Infos from "./Infos";
import Channels from "./Channels";
import Cases from "./Cases";
import usePremium from "@/hooks/usePremium";
import { GuildChannelsPayload, GuildPayload, GuildTab, GuildThreadsPayload, Language, TabState } from "@/types";
import Connections from "./Connecions";
import { useLanguage } from "@/hooks/useLanguage";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload>();
    const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
    const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);
    const { premium, setPremium } = usePremium(guild);
    const l = useLanguage();

    const [tab, setTab] = useState<TabState>({
        tabs: [],
        selected: "infos",
        connection: false,
    });

    const handleChangeTab = (selected: string) => {
        setTab({
            ...tab,
            connection: false,
            selected
        });
    };

    const createTabs = () => {
        if (guild && threads && premium) {
            return [
                {
                    value: "infos",
                    title: l.dashboard.guilds.tabs.infos,
                    content: <Infos
                        premium={premium}
                        setPremium={setPremium}
                        setGuild={setGuild}
                        setThreads={setThreads}
                        threads={threads}
                        guild={guild}
                    />
                },
                {
                    value: "channels",
                    title: l.dashboard.guilds.tabs.channels,
                    content: <Channels setGuild={setGuild} guild={guild} channels={channels} />
                },
                {
                    value: "cases",
                    title: l.dashboard.guilds.tabs.cases,
                    content: <Cases guild={guild} />
                },
                {
                    value: "connections",
                    title: l.dashboard.guilds.tabs.connections,
                    content: <Connections
                        premium={premium}
                        channels={channels}
                        setGuild={setGuild}
                        guild={guild}
                    />
                }
            ];
        }
        return [];
    };

    useEffect(() => {
        if (!id) return;

        const fetchGuild = async () => {
            const guildRes = await api.get(`/guilds/${id}`);

            setGuild(guildRes.data);
            setThreads(guildRes.data.threads);
        };

        const fetchChannels = async () => {
            const channelRes = await api.get(`/guilds/${id}/channels`);

            setChannels(channelRes.data);
        };

        Promise.all([fetchGuild(), fetchChannels()]);
    }, [id]);

    useEffect(() => {
        setTab((prevTab) => ({
            ...prevTab,
            tabs: createTabs(),
        }));
    }, [guild, threads, channels, premium, l.language]);

    const animations = (
        t: { value: string },
        language: Language,
        selectedTab: GuildTab,
        connection: boolean
    ) => {
        const pxs: Record<Language, Record<GuildTab, string>> = {
            "pt-BR": {
                channels: "75px",
                cases: "75px",
                connections: "100px",
                infos: "120px",
                width: "75px"
            },
            "en-US": {
                channels: "96px",
                cases: "75px",
                connections: "120px",
                infos: "125px",
                width: "95px"
            }
        };

        const position: Record<Language, Record<GuildTab, number>> = {
            "pt-BR": {
                channels: 130,
                cases: 212,
                connections: 290,
                infos: 0,
                width: 290
            },
            "en-US": {
                channels: 130,
                cases: 232,
                connections: 313,
                infos: 0,
                width: 290
            }
        };

        if (connection)
            return {
                width: pxs[language]["connections"],
                x: position[language]["connections"]
            };

        const width = pxs[language][selectedTab];
        const x = position[language][selectedTab];

        return { width, x };
    };

    return (
        <DefaultLayout>
            <ProtectedRoute loading={<GuildSkeleton />}>
                {guild ? (
                    <div className="flex flex-col gap-4 w-full overflow-x-hidden">
                        <div className="flex mb-1 bg-neutral-800 rounded-lg 
                        p-1 overflow-x-auto relative">
                            {tab.tabs.map((t) => (
                                <>
                                    <button
                                        onClick={() => handleChangeTab(t.value)}
                                        className={`text-white px-4 rounded-lg py-2 
                                        cursor-pointer transition-colors duration-300 
                                        gap-2 flex z-20`}
                                    >
                                        <span>{t.title}</span>
                                    </button>
                                    <motion.div
                                        key={t.value}
                                        animate={
                                            animations(t,
                                                l.language,
                                                tab.selected as GuildTab,
                                                tab.connection
                                            )
                                        }
                                        transition={{
                                            type: "spring",
                                            bounce: 0.3,
                                            duration: 0.5,
                                        }}
                                        className="absolute bg-neutral-700 z-10 h-[84%] 
                                        w-12 rounded-lg -translate-y-1/2 -translate-x-1"
                                    >
                                    </motion.div>
                                </>
                            ))}
                        </div>
                        <div className="overflow-x-hidden">
                            {tab.tabs.map((t) => (
                                tab.selected === t.value ? (
                                    <motion.div
                                        key={t.value}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {t.content}
                                    </motion.div>
                                ) : null
                            ))}
                        </div>
                    </div>
                ) : (
                    <GuildSkeleton />
                )}
            </ProtectedRoute>
        </DefaultLayout>
    );
}
