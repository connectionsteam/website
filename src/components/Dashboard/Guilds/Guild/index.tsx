import Avatar from "@/components/Mixed/Avatar";
import DefaultLayout from "@/components/Mixed/Layout";
import { GuildPayload } from "@/types";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GuildSkeleton from "./Skeleton";

export default function GuildComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<GuildPayload | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchGuild = async () => {
            const res = await api.get(`/guilds/${id}`);

            setGuild(res.data);
        };

        fetchGuild();
    }, [id]);

    return (
        <DefaultLayout>
            {guild ? (
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-4 w-full flex-col">
                        <span className="font-bold text-xl">Servidor</span>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 w-full">
                            <Avatar className="w-12 h-12" src={guild.icon} key={id as string} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-xl">{guild.name}</span>
                                <span className="text-neutral-300 text-sm">{id}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 rounded-lg w-full flex-col">
                            <span className="font-bold text-xl">Conexões</span>
                            <div className="grid grid-cols-3 gap-3 w-full">
                                {guild.connections.map((connection) => (
                                    <Link href={`/connection/${connection.name.replace(/ /g, "-")}`} key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                        <Avatar className="w-12 h-12" src={connection.icon} key={connection.name} />
                                        <div className="flex flex-col gap-1 text-start">
                                            <span className="font-bold text-lg">{connection.name}</span>
                                            <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : <GuildSkeleton />}
        </DefaultLayout>
    );
}
