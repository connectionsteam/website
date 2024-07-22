import Avatar from "@/components/Mixed/Avatar";
import { GuildPayload, GuildThreadsPayload, Premium } from "@/types";
import GuildMods from "./Mods";
import Threads from "./Threads";
import { useLanguage } from "@/hooks/useLanguage";
import DefaultPremiumButton from "@/components/Mixed/DefaultPremiumButton";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import ActivePremium from "./ActivePremium";
import { useState } from "react";
import Confetti from "react-confetti";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    threads: GuildThreadsPayload[];
    setThreads: (threads: GuildThreadsPayload[]) => void;
    premium: Premium;
    setPremium: (premium: Premium) => void;
}

export default function Infos({ guild, setGuild, threads, setThreads, premium, setPremium }: Props) {
    const l = useLanguage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showConfetti, setShowConfetti] = useState(false);

    return (
        <>
            {showConfetti && <Confetti
                className="absolute w-screen h-screen"
                colors={[
                    "#FFFFE0",
                    "#FFFACD",
                    "#FAFAD2",
                    "#FFEFD5",
                    "#FFE4B5",
                    "#FFD700",
                    "#FFC107",
                    "#FFEB3B",
                    "#FFEA00",
                    "#FFD600",
                    "#FFC300",
                    "#FFB300",
                    "#FFAA00",
                    "#FFA000",
                    "#FF8F00"
                ]} />
            }
            <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-xl">{l.dashboard.guilds.info.title}</h1>
                    <span className="text-neutral-300">{l.dashboard.guilds.info.description}</span>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex w-full tablet:flex-col tablet:gap-4">
                        <div className="flex gap-3 flex-grow">
                            <div className="w-16 h-16">
                                <Avatar
                                    className="w-16 h-16"
                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                />
                            </div>
                            <div className="flex gap-1 flex-col">
                                <span className="font-bold text-lg">{guild.name}</span>
                                <div className="text-sm text-neutral-300">{guild.id}</div>
                            </div>
                        </div>
                        <div>
                            <DefaultPremiumButton
                                onClick={onOpen}
                                className="px-6"
                                text="Ativar Premium"
                            />
                        </div>
                    </div>
                    <div className="w-full flex tablet:flex-col gap-4">
                        <GuildMods
                            premium={premium}
                            setGuild={setGuild}
                            guild={guild}
                        />
                        <Threads
                            premium={premium}
                            setThreads={setThreads}
                            guild={guild}
                            threads={threads}
                        />
                    </div>
                </div>
            </div>
            <>
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800">
                            Ativar premium
                        </ModalHeader>
                        <ModalBody>
                            <ActivePremium
                                setGuild={setGuild}
                                setGuildPremium={setPremium}
                                guild={guild}
                                setShowConfetti={setShowConfetti}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        </>
    )
}