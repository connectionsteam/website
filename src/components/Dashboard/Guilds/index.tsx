import { Input } from "@nextui-org/input";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { GuildPayload } from "@/types";
import Avatar from "@/components/Mixed/Avatar";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import ProtectedRoute from "@/components/Mixed/ProtectedRoute";
import GuildsSkeleton from "./Skeleton";
import { LuPlusCircle } from "react-icons/lu";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";

const url = "https://discord.com/oauth2/authorize?client_id=1243234162077470802";

export default function GuildsComponent() {
    const [guilds, setGuilds] = useState<GuildPayload[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { language } = useContext(LanguageContext);

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const fetchConnections = async () => {
            const response = await api.get("/users/@me/guilds");

            setGuilds(response.data);
        };

        fetchConnections();
    }, []);

    return (
        <ProtectedRoute loading={<GuildsSkeleton key={Math.random()} />}>
            <div className="flex items-center justify-center text-white">
                <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-3xl">{languages[language].dashboard.guilds.title}</h1>
                        <span className="text-neutral-300">{languages[language].dashboard.guilds.description}</span>
                    </div>
                    <Input classNames={{
                        inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                    }} onChange={handleChangeQuery} type="string" label={languages[language].dashboard.misc.filterGuilds} />
                    <div className="grid grid-cols-3 gap-3 w-full">
                        {guilds ? (
                            guilds.filter((guild) => guild.name.toLowerCase().includes(searchQuery.toLowerCase()) || guild.id.includes(searchQuery)).map((guild) => (
                                <Link href={`/guild/${guild.id}`} key={guild.id} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                    <Avatar className="w-12 h-12" src={guild.icon} key={guild.id} />
                                    <div className="flex flex-col gap-1 text-start">
                                        <span className="font-bold text-lg">{guild.name}</span>
                                        <span className="text-neutral-300 text-sm">{guild.id}</span>
                                    </div>
                                </Link>
                            ))
                        ) : <ConnectionsSkeleton key={Math.random()} />}
                        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                            <a target="_blank" href={url} className="flex items-center justify-center gap-2 p-3 h-full w-full rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                <LuPlusCircle size={20} />
                                <span>{languages[language].dashboard.guilds.addServer}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

