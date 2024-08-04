import { Input } from "@nextui-org/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ConnectionPayload } from "../../../types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import CreateConnectionForm from "./Connection/FormCreateConnection";
import { api } from "../../../utils/api";
import ConnectionCard from "./Connection/Card";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useLanguage } from "../../../hooks/useLanguage";

interface Props {
    connections: ConnectionPayload[] | null;
    setConnections: Dispatch<SetStateAction<ConnectionPayload[] | null>>;
}

export interface ConnectionState {
    connection: ConnectionPayload | null;
    hover: string | null;
    removing: string | null;
}

export default function ConnectionsComponent({ connections, setConnections }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const l = useLanguage();
    const [connectionProps, setConnectionProps] = useState<ConnectionState>({
        connection: null!,
        hover: null,
        removing: null
    });

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleDeleteConnection = async () => {
        setConnectionProps({ ...connectionProps, removing: connectionProps.hover });

        await api.delete(`/connections/${connectionProps.hover}`);

        setTimeout(() => {
            setConnections(connections!.filter(connection => connection.name !== connectionProps.hover));

            setConnectionProps({ ...connectionProps, removing: null });
        }, 500);
    };

    return (
        <>
            <Head>
                <title>{l.dashboard.connections.title}</title>
                <meta name="description" content={l.dashboard.connections.description} />
                <meta name="og:title" content={l.dashboard.connections.title} />
                <meta name="og:description" content={l.dashboard.connections.description} />
                <meta name="theme-color" content="#D946EF" />
            </Head>
            <div className="flex w-full items-start flex-col gap-4 tablet:px-3">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">{l.dashboard.connections.title}</h1>
                    <span className="text-neutral-300">{l.dashboard.connections.description}</span>
                </div>
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} onChange={handleChangeQuery} type="string" label={l.dashboard.misc.filterConnections} />
                <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                    <AnimatePresence>
                        {connections ? (
                            connections
                                .filter((connection) =>
                                    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    || connection.name.includes(searchQuery)
                                    || connection.description?.toLowerCase().includes(searchQuery.toLowerCase())
                                    || connection.creatorId?.includes(searchQuery)
                                )
                                .map((connection, index) => (
                                    <ConnectionCard
                                        handleDeleteConnection={handleDeleteConnection}
                                        key={index}
                                        connection={connection}
                                        connectionProps={connectionProps}
                                        setConnectionProps={setConnectionProps}
                                        index={index}
                                    />
                                ))
                        ) : <ConnectionsSkeleton />}
                    </AnimatePresence>
                    {connections &&
                        <CreateConnectionForm
                            connections={connections}
                            setConnections={setConnections as Dispatch<SetStateAction<ConnectionPayload[]>>}
                        />
                    }
                </div>
            </div>
        </>
    );
}