import { Input } from "@nextui-org/input";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { ConnectionPayload } from "@/types";
import Avatar from "@/components/Mixed/Avatar";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import CreateConnectionForm from "./Connection/FormCreateConnection";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";

export default function ConnectionsComponent() {
    const [connections, setConnections] = useState<ConnectionPayload[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { language } = useContext(LanguageContext);

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const fetchConnections = async () => {
            const res = await api.get("/users/@me/connections");

            setConnections(res.data);
        };

        fetchConnections();
    }, []);

    return (
        <div className="flex items-center justify-center text-white">
            <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">{languages[language].dashboard.connections.title}</h1>
                    <span className="text-neutral-300">{languages[language].dashboard.connections.description}</span>
                </div>
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} onChange={handleChangeQuery} type="string" label={languages[language].dashboard.misc.filterConnections} />
                <div className="grid grid-cols-3 gap-3 w-full">
                    {connections ? (
                        connections.filter((connection) => connection.name.toLowerCase().includes(searchQuery.toLowerCase()) || connection.name.includes(searchQuery)).map((connection) => (
                            <Link href={`/connection/${connection.name.replace(/ /g, "-")}`} key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                                <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                                <div className="flex flex-col gap-1 text-start">
                                    <span className="font-bold text-lg">{connection.name}</span>
                                    {connection.description && <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>}
                                </div>
                            </Link>
                        ))
                    ) : <ConnectionsSkeleton key={Math.random()} />}
                    <CreateConnectionForm/>
                </div>
            </div>
        </div>
    );
}

