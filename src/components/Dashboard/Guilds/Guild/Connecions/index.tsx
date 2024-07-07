import { Dispatch, SetStateAction, useState } from "react";
import { ConnectedConnectionPayload, ConnectedConnectionsState, GuildChannelsPayload, GuildPayload, TabsStructure } from "@/types";
import ConnectionsSkeleton from "../../../ConnectionsSkeleton";
import { LuPlusCircle } from "react-icons/lu";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import GuildConnectConnection from "../../Connection/Connect";
import ConnectedConnnectionCard from "./Card";
import { api } from "@/utils/api";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    channels: GuildChannelsPayload[];
    connection: ConnectedConnectionPayload;
    setConnection: Dispatch<SetStateAction<ConnectedConnectionPayload>>;
    handleSelectConnection: (connection: ConnectedConnectionPayload) => void;
}

export default function Connections({ guild, setGuild, channels, connection, handleSelectConnection }: Props) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const l = useLanguage();
    const [connectionProps, setConnectionProps] = useState<ConnectedConnectionsState>({
        hover: null,
        removing: null
    });

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
            <h1 className="font-semibold text-xl">{l.dashboard.connections.title}</h1>
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
                        <span>{l.dashboard.connections.addConnection}</span>
                    </button>
                </div>
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800">{l.dashboard.connections.connectToConnection}</ModalHeader>
                        <ModalBody>
                            <GuildConnectConnection
                                setGuild={setGuild}
                                onClose={onClose}
                                channels={channels}
                                connection={connection}
                                guild={guild}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}