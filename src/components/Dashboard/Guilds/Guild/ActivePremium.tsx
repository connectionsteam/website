import DefaultPremiumButton from "@/components/Mixed/DefaultPremiumButton";
import DefaultInput from "@/components/Mixed/Input";
import { GuildPayload, Premium, PremiumType } from "@/types";
import { api } from "@/utils/api";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    guild: GuildPayload;
    setShowConfetti: (value: boolean) => void;
    setGuildPremium: (value: Premium) => void;
    setGuild: (guild: GuildPayload) => void;
}

export default function ActivePremium({ guild, setShowConfetti, setGuildPremium, setGuild }: Props) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [premium, setPremium] = useState(1);
    const l = useLanguage();

    const premiums = {
        1: "Premium",
        2: "VIP",
    }

    const advantages = {
        1: l.plans.basicpremium.features,
        2: l.plans.premium.features,
    }

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
            const { data: { type, expiresAt } } = await api.put(`/codes/${code}/guilds/${guild.id}`);

            setGuildPremium({
                isPremium: true,
                maxThreads: type === PremiumType.Normal ? 5 : 15,
                maxConnections: type === PremiumType.Normal ? 25 : 50,
                maxMods: 10,
                premiumType: type,
            });

            setGuild({
                ...guild,
                premium: {
                    expiresAt,
                    type
                },
            });

            onOpen();
            setShowConfetti(true);
            setLoading(false);
            setCode("");
            setPremium(type);
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
                    label="Código de ativação"
                    type="text"
                    placeholder="Digite aqui o código de ativação"
                />
                {errors.api && <div className="text-red-500">{errors.api}</div>}
                <DefaultPremiumButton
                    onClick={handleSubmit}
                    text="Ativar Premium"
                    loading={loading}
                    disabled={loading}
                />
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-0.5 bg-neutral-800 text-white bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg w-full">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800 rounded-lg rounded-b-none pb-0">
                        Ativação de premium
                    </ModalHeader>
                    <ModalBody className="flex flexl-col items-center justify-center gap-2 rounded-lg rounded-t-none bg-neutral-800 p-6">
                        <HiSparkles className="text-yellow-500 text-6xl" />
                        <div className="flex gap-2 flex-col items-center justify-center">
                            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent text-3xl font-bold">
                                {premiums[premium as keyof typeof premiums]}
                            </span>
                            <span className="text-2xl">foi ativado em seu servidor com sucesso!</span>
                            <div className="flex flex-col gap-2 w-full items-start">
                                <span className="font-bold text-lg">Vantagens obtidas</span>
                                {advantages[premium as keyof typeof advantages].map((feature, index) => (
                                    <motion.div
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.4 }}
                                        key={index}
                                        className="flex gap-1 items-center"
                                    >
                                        <BiCheck fill="#7DDA58" />
                                        <span className="font-semibold">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}