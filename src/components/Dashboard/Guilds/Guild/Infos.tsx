import Avatar from "../../../../components/Mixed/Avatar";
import { DiscordMember, GuildPayload, GuildThreadsPayload, Premium } from "../../../../types";
import GuildMods from "./Mods";
import Threads from "./Threads";
import { useLanguage } from "../../../../hooks/useLanguage";
import DefaultPremiumButton from "../../../../components/Mixed/DefaultPremiumButton";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import ActivePremium from "./ActivePremium";
import { useState } from "react";
import Confetti from "react-confetti";
import { api } from "../../../../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    threads: GuildThreadsPayload[];
    setThreads: (threads: GuildThreadsPayload[]) => void;
    premium: Premium;
    setPremium: (premium: Premium) => void;
};

export default function Infos({ guild, setGuild, threads, setThreads, premium, setPremium }: Props) {
    const l = useLanguage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showConfetti, setShowConfetti] = useState(false);
    const [prefix, setPrefix] = useState(guild.prefix);
    const [loading, setLoading] = useState({ loading: false, check: false });

    const patchPrefix = (prefix: string | undefined) => async () => {
        if (!prefix) return;
        if (guild.prefix === prefix) return;
        if (prefix === "") return;

        setLoading({ loading: true, check: false });

        await api.patch(`/guilds/${guild.id}`, { prefix });

        setGuild({ ...guild, prefix });

        setLoading({ loading: false, check: true });

        setTimeout(() => {
            setLoading({ ...loading, check: false });
        }, 2000);
    };

    const premiums = {
        0: "None",
        1: "Premium",
        2: "VIP",
    };

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
                                text={l.plans.popUp.activate}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">{l.dashboard.guilds.info.prefix}</span>
                            <span>{l.dashboard.guilds.info.prefixdescription}</span>
                        </div>
                        <div className="flex gap-1">
                            <input
                                className="rounded-lg p-2 max-w-32 outline-none bg-neutral-900/50"
                                value={prefix !== undefined ? prefix : "c"}
                                onChange={(e) => setPrefix(e.target.value)}
                            />
                            <button
                                className="p-3 bg-neutral-900/50 transition hover:bg-neutral-900
                                rounded-lg justify-center flex gap-2 items-center px-4"
                                onClick={patchPrefix(prefix)}
                            >
                                <span>{l.dashboard.guilds.info.save}</span>
                                {loading.loading && <AiOutlineLoading3Quarters className="animate-spin" size={18} />}
                                {loading.check && <FaCheckCircle className="text-green-500" size={18} />}
                            </button>
                        </div>
                    </div>
                    {guild.premium && (
                        <div className="flex gap-2 flex-col">
                            <div className="flex gap-1">
                                <span className="font-bold mt-0.5">Premium</span>
                                <div className="bg-gradient-to-r from-yellow-500 to-amber-400
                                bg-clip-text text-transparent font-bold text-lg">
                                    {premiums[guild.premium.type]}
                                </div>
                            </div>
                            <span className="font-bold">
                                {l.dashboard.guilds.info.premiumexpires
                                    .replace("{date}", new Date(guild.premium.expiresAt)
                                        .toLocaleDateString(l.language))}
                            </span>
                        </div>
                    )}
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
                            {l.plans.popUp.activate}
                        </ModalHeader>
                        <ModalBody>
                            <ActivePremium
                                premiums={premiums}
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