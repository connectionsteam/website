import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, UseDisclosureProps } from "@nextui-org/modal";

interface Props extends UseDisclosureProps {
    text: string;
}

export default function PremiumPopUp({ isOpen, onChange, text }: Props) {
    return (
        <Modal classNames={{
            closeButton: "transition hover:bg-neutral-700",
            wrapper: "overflow-y-hidden",
            base: "max-h-screen overflow-y-auto",
        }} isOpen={isOpen} onOpenChange={onChange}>
            <ModalContent className="bg-neutral-800 text-white">
                <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Premium</ModalHeader>
                <ModalBody className="flex gap-2">
                    <div>Precisa do premium amigao</div>
                </ModalBody>
                <ModalFooter className="flex w-full justify-center">
                    <div>footer</div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}