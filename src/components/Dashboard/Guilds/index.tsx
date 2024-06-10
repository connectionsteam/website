import { Input } from "@nextui-org/input";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { GuildPayload } from "@/types";
import Avatar from "@/components/Mixed/Avatar";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import ProtectedRoute from "@/components/Mixed/ProtectedRoute";
import GuildsSkeleton from "./Skeleton";
import { LuPlusCircle } from "react-icons/lu";

const url = "https://discord.com/oauth2/authorize?client_id=1243234162077470802";

export default function GuildsComponent() {
    const [connections, setConnections] = useState<GuildPayload[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const fetchConnections = async () => {
            const response = await api.get("/users/@me/guilds");

            setConnections(response.data);
        };

        fetchConnections();
    }, []);

    return (
        <ProtectedRoute loading={<GuildsSkeleton key={Math.random()} />}>
            <div className="flex items-center justify-center text-white">
                <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-3xl">Servidores</h1>
                        <span className="text-neutral-300">Selecione o servidor que deseja gerenciar</span>
                    </div>
                    <Input classNames={{
                        inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                    }} onChange={handleChangeQuery} type="string" label="Filtrar conexão" />
                    <div className="grid grid-cols-3 gap-3 w-full">
                        {connections ? (
                            connections.filter((connection) => connection.name.toLowerCase().includes(searchQuery.toLowerCase()) || connection.id.includes(searchQuery)).map((connection) => (
                                <Link href={`/guild/${connection.id}`} key={connection.id} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                    <Avatar className="w-12 h-12" src={connection.icon} key={connection.id} />
                                    <div className="flex flex-col gap-1 text-start">
                                        <span className="font-bold text-lg">{connection.name}</span>
                                        <span className="text-neutral-300 text-sm">{connection.id}</span>
                                    </div>
                                </Link>
                            ))
                        ) : <ConnectionsSkeleton key={Math.random()} />}
                        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                            <a target="_blank" href={url} className="flex items-center justify-center gap-2 p-3 h-full w-full rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                <LuPlusCircle size={20} />
                                <span>Adicionar servidor</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

