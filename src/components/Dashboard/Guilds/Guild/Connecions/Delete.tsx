import { useLanguage } from "@/hooks/useLanguage";
import { ConnectedConnectionPayload, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { LuTrash } from "react-icons/lu";

interface Props {
    connection: ConnectedConnectionPayload;
    onRemove: () => void;
}

export const DeleteConnectedConnection = ({ connection, onRemove }: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const l = useLanguage();

    const handleDelete = async () => {
        onRemove();
        onClose();
    }

    return (
        <>
            <button onClick={onOpen} className="hover:text-red-500 transition">
                <LuTrash size={18} />
            </button>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">{l.dashboard.guilds.connections.disconnect.title}</ModalHeader>
                    <ModalBody className="flex gap-2">
                        <div>{l.dashboard.guilds.connections.disconnect.disconnectConfirm} <strong>{connection.name}</strong>?</div>
                    </ModalBody>
                    <ModalFooter className="flex w-full justify-center">
                        <button onClick={handleDelete} className="flex gap-2 w-1/2 items-center justify-center font-semibold text-center border-red-500 border-2 transition hover:bg-red-500 p-2 rounded-lg">
                            <span className="text-center">{l.dashboard.guilds.connections.disconnect.disconnect}</span>
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}