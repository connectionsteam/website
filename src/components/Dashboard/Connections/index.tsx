import { Input } from "@nextui-org/input";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from "react";
import { ConnectionPayload } from "@/types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import CreateConnectionForm from "./Connection/FormCreateConnection";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import ConnectionComponent from "./Connection";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { api } from "@/utils/api";
import ConnectionCard from "./Connection/Card";
import { AnimatePresence } from "framer-motion";

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
    const { language } = useContext(LanguageContext);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [connectionProps, setConnectionProps] = useState<ConnectionState>({
        connection: null!,
        hover: null,
        removing: null
    });

    const openModal = (connection: ConnectionPayload) => {
        setConnectionProps({ ...connectionProps, connection });
        onOpen();
    };

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
        <div className="flex w-full items-start flex-col gap-4 tablet:px-3">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">{languages[language].dashboard.connections.title}</h1>
                <span className="text-neutral-300">{languages[language].dashboard.connections.description}</span>
            </div>
            <Input classNames={{
                inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
            }} onChange={handleChangeQuery} type="string" label={languages[language].dashboard.misc.filterConnections} />
            <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                <AnimatePresence>
                    {connections ? (
                        connections
                            .filter((connection) =>
                                connection.name.toLowerCase().includes(searchQuery.toLowerCase())
                                || connection.name.includes(searchQuery)
                                || connection.description?.toLowerCase().includes(searchQuery.toLowerCase())
                                || connection.creatorId.includes(searchQuery)
                            )
                            .map((connection, index) => (
                                <ConnectionCard
                                    handleDeleteConnection={handleDeleteConnection}
                                    key={index}
                                    closeForm={onClose}
                                    connection={connection}
                                    connectionProps={connectionProps}
                                    setConnectionProps={setConnectionProps}
                                    index={index}
                                    openModal={openModal}
                                />
                            ))
                    ) : <ConnectionsSkeleton key={0} />}
                </AnimatePresence>
                {connections &&
                    <CreateConnectionForm
                        key={0}
                        connections={connections}
                        setConnections={setConnections as Dispatch<SetStateAction<ConnectionPayload[]>>}
                    />
                }
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Editar conexão {connectionProps?.connection?.name}</ModalHeader>
                        <ModalBody>
                            <ConnectionComponent key={0} connection={connectionProps.connection as ConnectionPayload} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
