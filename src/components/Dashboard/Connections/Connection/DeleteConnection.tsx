import { useIsClient } from "@/contexts/Client";
import { api } from "@/utils/api";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

export default function DeleteConnection({ id }: { id: string }) {
    const isClient = useIsClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDeleteConnection = async () => {
        await api.delete(`/connections/${id}`);

        isClient && window.location.reload();
    };

    return (
        <>
            <div className="flex flex-col bg-red-500 bg-opacity-10 p-3 rounded-lg">
                <div className="font-semibold">Deletar conexão</div>
                <span className="text-neutral-300 mb-2">Essa ação é irreversível.</span>
                <button onClick={onOpen} className="flex gap-2 tablet:max-w-none justify-center items-center border-red-500 border-2 transition hover:bg-red-500 p-3 rounded-lg">
                    <span className="text-center">Deletar</span>
                </button>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Deletar conexão</ModalHeader>
                    <ModalBody className="flex gap-2">
                        <div>Você deseja mesmo deletar a conexão <strong>{id}</strong>?</div>
                    </ModalBody>
                    <ModalFooter className="flex w-full justify-center">
                        <button onClick={handleDeleteConnection} className="flex gap-2 w-1/2 items-center justify-center font-semibold text-center border-red-500 border-2 transition hover:bg-red-500 p-2 rounded-lg">
                            <span className="text-center">Deltar</span>
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}