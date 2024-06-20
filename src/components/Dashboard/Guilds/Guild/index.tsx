import Avatar from "@/components/Mixed/Avatar";
import DefaultLayout from "@/components/Mixed/Layout";
import { ConnectedConnectionFlags, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GuildSkeleton from "./Skeleton";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { LuInfo, LuLink } from "react-icons/lu";
import Infos from "./Infos";
import Switchers from "./Switchers";
import Connections from "./Connections";
import { Tabs } from "@/components/ui/Tabs";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload>();
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        if (!id) return;

        const fetchGuild = async () => {
            const res = await api.get(`/guilds/${id}`);

            setGuild({
                icon: "https://cdn.discordapp.com/avatars/551374220953649181/01d8288ab9879d1edb2b334b69e57faf.png",
                name: "GUILDA LEGAL",
                ...res.data,
                connections: [
                    {
                        ...res.data.connections[0],
                        icon: "https://cdn.discordapp.com/avatars/551374220953649181/01d8288ab9879d1edb2b334b69e57faf.png",
                        name: "conexaolegal",
                        description: "conmexão legal"
                    }
                ],
                mods: [
                    {
                        avatar: "https://cdn.discordapp.com/avatars/551374220953649181/01d8288ab9879d1edb2b334b69e57faf.png",
                        username: "ewerton",
                        id: "551374220953649181"
                    },
                    {
                        avatar: "https://cdn.discordapp.com/avatars/955095844275781693/4007e7943493138d10aeb5d6e64e481c.png",
                        username: "spyei",
                        id: "955095844275781693"
                    }
                ]
            });
        };

        fetchGuild();
    }, [id]);

    const tabs = [
        {
            value: "infos",
            title: "Informações",
            content: <Infos guild={guild as GuildPayload} />
        },
        {
            value: "switchers",
            title: "Configurações",
            content: <Switchers guild={guild as GuildPayload} />
        },
        {
            value: "connections",
            title: "Conexões",
            content: <Connections guild={guild as GuildPayload} />
        }
    ];

    return (
        <DefaultLayout>
            {guild ? (
                <div className="flex gap-4 w-full flex-col">
                    <Tabs tabs={tabs} />
                </div>
            ) : (
                <GuildSkeleton />
            )}
        </DefaultLayout>
    );
}