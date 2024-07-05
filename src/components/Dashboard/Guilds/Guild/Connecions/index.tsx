import { useState } from "react";
import { ConnectedConnectionPayload, ConnectedConnectionsState, GuildChannelsPayload, GuildPayload, TabsStructure } from "@/types";
import ConnectionsSkeleton from "../../../ConnectionsSkeleton";
import GuildEditConnection from "../../Connection";
import { LuPlusCircle } from "react-icons/lu";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import GuildConnectConnection from "../../Connection/Connect";
import ConnectedConnnectionCard from "./Card";
import { api } from "@/utils/api";

interface Props {
    guild: GuildPayload;
    addTab: (newTab: TabsStructure) => void;
    setSelectedTab: (value: string) => void;
    setGuild: (guild: GuildPayload) => void;
    channels: GuildChannelsPayload[];
}

export default function Connections({ guild, addTab, setSelectedTab, setGuild, channels }: Props) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [connectionProps, setConnectionProps] = useState<ConnectedConnectionsState>({
        connection: null!,
        hover: null,
        removing: null
    });

    const handleSelectConnection = (connection: ConnectedConnectionPayload) => {
        addTab({
            value: connection.name,
            title: connection.name,
            content: <GuildEditConnection channels={channels} key={connection.name} setGuild={setGuild} guild={guild} GuildConnection={connection} />
        });

        setConnectionProps({ ...connectionProps, connection });
        setSelectedTab(connection.name);
    };

    const handleRemoveConnection = async (connectionName: string) => {
        setConnectionProps({ ...connectionProps, removing: connectionName });

        await api.delete(`/guilds/${guild.id}/connections/${connectionName}`);

        setTimeout(() => {
            setGuild({
                ...guild,
                connections: guild.connections.filter(connection => connection.name !== connectionName)
            });

            setConnectionProps({ ...connectionProps, removing: null });
        }, 500);
    };

    return (
        <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Conexões</h1>
            <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                {guild.connections ? (
                    guild.connections.map((connection) => (
                        <ConnectedConnnectionCard 
                            connection={connection}
                            handleRemoveConnection={handleRemoveConnection}
                            handleSelectConnection={handleSelectConnection}
                            setConnectionProps={setConnectionProps}
                            connectionProps={connectionProps} 
                            key={connection.name} />
                    ))
                ) : <ConnectionsSkeleton />}
                <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                    <button
                        onClick={onOpen}
                        className="flex items-center justify-center gap-2 p-5 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition"
                    >
                        <LuPlusCircle size={26} />
                        <span>Adicionar conexão</span>
                    </button>
                </div>
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Conectar a uma conexão</ModalHeader>
                        <ModalBody>
                            <GuildConnectConnection
                                setGuild={setGuild}
                                onClose={onClose}
                                channels={channels}
                                connection={connectionProps.connection as ConnectedConnectionPayload}
                                guild={guild}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}