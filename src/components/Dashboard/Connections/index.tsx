import { Input } from "@nextui-org/input";
import { ChangeEvent, useContext, useState } from "react";
import { ConnectionPayload } from "@/types";
import Avatar from "@/components/Mixed/Avatar";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import CreateConnectionForm from "./Connection/FormCreateConnection";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import ConnectionComponent from "./Connection";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";

export default function ConnectionsComponent({ connections }: { connections: ConnectionPayload[] | null }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { language } = useContext(LanguageContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [connection, setConnection] = useState<ConnectionPayload | null>(null);

    const openModal = (connection: ConnectionPayload) => {
        setConnection(connection);
        onOpen();
    };

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
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
                        <button onClick={() => openModal(connection)} key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                            <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-lg">{connection.name}</span>
                                {connection.description && <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>}
                            </div>
                        </button>
                    ))
                ) : <ConnectionsSkeleton key={0} />}
                <CreateConnectionForm />
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Editar conexão {connection?.name}</ModalHeader>
                        <ModalBody>
                            <ConnectionComponent connection={connection as ConnectionPayload} /> 
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
