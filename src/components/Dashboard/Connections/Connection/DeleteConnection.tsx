import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { AnimatePresence } from "framer-motion";
import { LuTrash } from "react-icons/lu";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    id: string;
    open: boolean;
    handleRemove: () => void;
}

export default function DeleteConnection({ id, open, handleRemove }: Props) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const l = useLanguage();

    const handleDeleteConnection = async () => {
        handleRemove();
        onClose();
    };

    return (
        <>
            <AnimatePresence key={id}>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-0 right-0 z-50"
                    >
                        <div className="bg-neutral-900 rounded-lg p-2 items-center flex">
                            <button onClick={onOpen} className="hover:text-red-500 transition">
                                <LuTrash size={18} />
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">{l.dashboard.connections.delete.title}</ModalHeader>
                    <ModalBody className="flex gap-2">
                        <div>{l.dashboard.connections.delete.description} <strong>{id}</strong>?</div>
                    </ModalBody>
                    <ModalFooter className="flex w-full justify-center">
                        <button onClick={handleDeleteConnection} className="flex gap-2 w-1/2 items-center justify-center font-semibold text-center border-red-500 border-2 transition hover:bg-red-500 p-2 rounded-lg">
                            <span className="text-center">{l.dashboard.connections.delete.button}</span>
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}