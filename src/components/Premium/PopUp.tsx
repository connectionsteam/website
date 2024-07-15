import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, UseDisclosureProps } from "@nextui-org/modal";
import DefaultPremiumButton from "../Mixed/DefaultPremiumButton";
import Sonner from "../Mixed/Sonner";
import { useEffect, useState } from "react";

interface Props extends UseDisclosureProps {
    text: string;
    limitText?: string;
    limit?: boolean;
    sonner?: boolean;
}

export default function PremiumPopUp({ isOpen, onChange, text, limit, limitText, sonner }: Props) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (sonner) {
            setActive(true);
        }
    }, [sonner]);

    return (limit && limitText && sonner) ? (
        <Sonner active={active} text={limitText} setActive={setActive} />
    ) : (
        <Modal classNames={{
            closeButton: "transition hover:bg-neutral-700",
            wrapper: "overflow-y-hidden",
            base: "max-h-screen overflow-y-auto",
        }} isOpen={isOpen} onOpenChange={onChange} >
            <ModalContent className="bg-neutral-800 text-white">
                <ModalHeader className="flex flex-col gap-1 bg-neutral-800">
                    Comprar Premium
                </ModalHeader>
                <ModalBody className="flex gap-2">
                    <div>{text}</div>
                </ModalBody>
                <ModalFooter className="flex w-full justify-center">
                    <DefaultPremiumButton text="Adquirir Premium" link href="/premium" />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}