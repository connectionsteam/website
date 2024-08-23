import DefaultPremiumButton from "../../../../components/Mixed/DefaultPremiumButton";
import DefaultInput from "../../../../components/Mixed/Input";
import { ConnectionPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, useEffect, useState } from "react";
import { useLanguage } from "../../../../hooks/useLanguage";
import PromotedFunctionsCards from "../../../Promote/Cards";

interface Props {
    connection: ConnectionPayload;
    setShowConfetti: (value: boolean) => void;
    setConnection: (connection: ConnectionPayload) => void;
}

export default function ActivePromoted({ connection, setShowConfetti, setConnection }: Props) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const l = useLanguage();

    const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [code !== ""]);

    const handleSubmit = async () => {
        if (code === "") return null;
        setLoading(true);

        try {
            await api.put(`/codes/${code}/connections/${connection.name}`);

            onOpen();
            setShowConfetti(true);
            setLoading(false);
            setCode("");
            setTimeout(() => setShowConfetti(false), 10_000);
        } catch (error: any) {
            setLoading(false);

            setErrors({
                ...errors,
                api: error.response.data.message,
            });
        }
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <DefaultInput
                    maxChars={64}
                    minChars={0}
                    onChange={handleChangeCode}
                    value={code}
                    label={l.plans.popUp.code}
                    type="text"
                    placeholder={l.plans.popUp.placeholder}
                />
                {errors.api && <div className="text-red-500">{errors.api}</div>}
                <DefaultPremiumButton
                    pink
                    onClick={handleSubmit}
                    text={l.dashboard.connections.activatePromoted}
                    loading={loading}
                    disabled={loading}
                />
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-0.5 bg-neutral-800 text-white bg-gradient-to-r from-pink-500 to-rose-700 rounded-lg w-full">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800 rounded-lg rounded-b-none pb-0 font-bold">
                        {l.promote.modal.promoted}
                    </ModalHeader>
                    <ModalBody className="flex flexl-col gap-2 rounded-lg rounded-t-none bg-neutral-800 pb-4">
                        <span className="text-lg font-semibold">
                            {l.promote.modal.success}
                        </span>
                        <div className="grid grid-cols-2 gap-2 tablet:grid-cols-1">
                            <PromotedFunctionsCards connection={connection} />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

// eu nao to ta nkando mais