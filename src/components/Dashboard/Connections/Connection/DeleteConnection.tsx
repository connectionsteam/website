import { api } from "@/utils/api";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/router";

export default function DeleteConnection({ id }: { id: string }) {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDeleteConnection = async () => {
        await api.delete(`/connections/${id}`);

        router.push("/connections");
    };


    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <button onClick={onOpen} className="flex gap-2 items-center w-full border-red-500 border-2 transition hover:bg-red-500 p-3 rounded-lg">
                    <span className="text-center">Deltar</span>
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
                            <span className="text-center">Deletar</span>
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}