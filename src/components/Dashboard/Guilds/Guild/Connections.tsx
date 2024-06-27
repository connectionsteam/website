"use client"
import Avatar from "@/components/Mixed/Avatar";
import { ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload } from "@/types";
import ConnectionsSkeleton from "../../ConnectionsSkeleton";
import GuildEditConnection from "../Connection";
import { TabsStructure } from ".";
import { LuPlusCircle } from "react-icons/lu";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import GuildConnectConnection from "../Connection/Connect";
import { useState } from "react";

interface Props {
    guild: GuildPayload;
    addTab: (newTab: TabsStructure) => void;
    setSelectedTab: (value: string) => void;
    setGuild: (guild: GuildPayload) => void;
    channels: GuildChannelsPayload[];
}

export default function Connections({ guild, addTab, setSelectedTab, setGuild, channels }: Props) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [connection, setConnection] = useState<ConnectedConnectionPayload>();

    const handleSelectConnection = (connection: ConnectedConnectionPayload) => {
        addTab({
            value: connection.name,
            title: connection.name,
            content: <GuildEditConnection setGuild={setGuild} guild={guild} GuildConnection={connection} />
        });
        
        setConnection(connection);
        setSelectedTab(connection.name);
    };

    return (
        <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Conexões</h1>
            <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                {guild.connections ? (
                    guild.connections.map((connection) => (
                        <button onClick={() => handleSelectConnection(connection)} key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition">
                            <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-lg">{connection.name}</span>
                                {connection.description && <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>}
                            </div>
                        </button>
                    ))
                ) : <ConnectionsSkeleton key={0} />}
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
                            <GuildConnectConnection onClose={onClose} channels={channels} connection={connection as ConnectedConnectionPayload} guild={guild} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
