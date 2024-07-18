"use client";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import DefaultLayout from "../Mixed/Layout";
import Image from "next/image";
import { HiHashtag } from "react-icons/hi";
import TypingAnimation from "../ui/Type";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import UserEmbed from "./UserEmbed";
import ConnectionsEmbedProps from "./ConnectionsEmbed";
import ConnectionsEmbed from "./ConnectionsEmbed";
import { ConnectedConnectionFlags } from "@/types";
import { Switch } from "@nextui-org/switch";
import DefaultButton from "../Mixed/Button";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { LuPlusCircle } from "react-icons/lu";

export default function Page() {
    const l = useLanguage();

    const flagsDescriptions = {
        [ConnectedConnectionFlags.Locked]: {
            title: l.dashboard.guilds.connections.flags.locked,
            description: l.dashboard.guilds.connections.flags.lockedDescription,
        },
        [ConnectedConnectionFlags.Frozen]: {
            title: l.dashboard.guilds.connections.flags.frozen,
            description: l.dashboard.guilds.connections.flags.frozenDescription,
        },
        [ConnectedConnectionFlags.AllowFiles]: {
            title: l.dashboard.guilds.connections.flags.allowFiles,
            description: l.dashboard.guilds.connections.flags.allowFilesDescription,
        },
        [ConnectedConnectionFlags.AllowInvites]: {
            title: l.dashboard.guilds.connections.flags.allowInvites,
            description: l.dashboard.guilds.connections.flags.allowInvitesDescription,
        },
        [ConnectedConnectionFlags.AllowLinks]: {
            title: l.dashboard.guilds.connections.flags.allowLinks,
            description: l.dashboard.guilds.connections.flags.allowLinksDescription,
        },
        [ConnectedConnectionFlags.NoIndentification]: {
            title: l.dashboard.guilds.connections.flags.noIndentification,
            description: l.dashboard.guilds.connections.flags.noIndentificationDescription,
        },
        [ConnectedConnectionFlags.AllowOrigin]: {
            title: l.dashboard.guilds.connections.flags.allowOrigin,
            description: l.dashboard.guilds.connections.flags.allowOriginDescription,
        },
        [ConnectedConnectionFlags.AllowEmojis]: {
            title: l.dashboard.guilds.connections.flags.allowEmojis,
            description: l.dashboard.guilds.connections.flags.allowEmojisDescription,
        },
        [ConnectedConnectionFlags.CompactModeEnabled]: {
            title: l.dashboard.guilds.connections.flags.compactModeEnabled,
            description: l.dashboard.guilds.connections.flags.compactModeEnabledDescription,
        }
    };

    return (
        <div className="flex justify-center items-center tablet:mt-20">
            <div className="flex flex-col max-w-[1100px] text-white">
                <div className="tablet:flex-col flex h-screen mobile:h-auto items-center w-full gap-6">
                    <div className="flex flex-col gap-4 w-[62%] items-start justify-start tablet:items-center tablet:justify-center">
                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r
                        from-fuchsia-500 to-indigo-500">
                            Connections
                        </h1>
                        <p className="text-neutral-300 text-lg mobile:text-xs tablet:text-center">
                            {l.home.description}
                        </p>
                        <div className="flex gap-2 items-center w-full">
                            <DefaultButton href="/dashboard" className="items-center justify-start p-3 px-8">
                                <TbLayoutDashboardFilled />
                                <span>Painel</span>
                            </DefaultButton>
                            <button className="bg-neutral-800 flex items-center justify-start
                            p-4 px-5 rounded-lg transition w-full gap-3">
                                <LuPlusCircle size={20} />
                                <span>Adicionar Connections</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-start mobile w-full tablet:justify-center tablet:items-center mobile:flex-col">
                        <div className="bg-neutral-800 flex flex-col rounded-lg p-3">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50">
                                    <Image
                                        width={40}
                                        height={40}
                                        src="/guilds/spyei.png"
                                        alt="Spyei's Guild"
                                        className="rounded-full"
                                    />
                                    <span className="text-lg font-semibold">Servidor de spyei</span>
                                </div>
                                <div className="flex flex-col gap-2 border-l-neutral-700 border-l-2">
                                    <div className="text-neutral-400 flex items-center gap-2 px-1">
                                        <HiHashtag />
                                        <span>canal-conectado</span>
                                    </div>
                                    <div className="flex items-start gap-3 px-2">
                                        <Image
                                            width={40}
                                            height={40}
                                            src="/avatars/spyei.png"
                                            alt="Spyei's Avatar"
                                            className="rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex gap-1">
                                                <span className="font-bold">Spyei</span>
                                                <span className="text-neutral-400 text-xs mt-1">Hoje às 16:28</span>
                                            </div>
                                            <TypingAnimation
                                                duration={50}
                                                className="text-neutral-200 text-base text-start font-normal"
                                                text="Eae mano, como vai?"
                                            />
                                        </div>
                                    </div>
                                    <ConnectionsEmbed
                                        author={{
                                            avatar: "/avatars/unreal.png",
                                            username: "unreal"
                                        }}
                                        delay={5}
                                        server="Servidor de unreal"
                                        message="Estou bem!"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-neutral-800 flex flex-col rounded-lg p-3">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50">
                                    <Image
                                        width={40}
                                        height={40}
                                        src="/guilds/unreal.png"
                                        alt="Spyei's Guild"
                                        className="rounded-full"
                                    />
                                    <span className="text-lg font-semibold">Servidor de unreal</span>
                                </div>
                                <div className="flex flex-col gap-2 border-l-neutral-700 border-l-2 relative">
                                    <div className="text-neutral-400 flex items-center gap-2 px-1">
                                        <HiHashtag />
                                        <span>canal-conectado</span>
                                    </div>
                                    <ConnectionsEmbed
                                        author={{
                                            avatar: "/avatars/spyei.png",
                                            username: "spyei"
                                        }}
                                        delay={1.5}
                                        server="Servidor de spyei"
                                        message="Eae mano, como vai?"
                                    />
                                    <UserEmbed
                                        author={{
                                            avatar: "/avatars/unreal.png",
                                            username: "Unreal"
                                        }}
                                        delay={4.5}
                                        message="Estou bem!"
                                    />
                                    <motion.div
                                        initial={{ display: "none" }}
                                        animate={{ display: "block", transitionEnd: { display: "none" } }}
                                        exit={{ display: "none" }}
                                        transition={{ delay: 2.5, duration: 2 }}
                                        className="flex items-start gap-3 px-2 absolute bottom-0"
                                    >
                                        <div className="flex gap-1 items-center">
                                            <div className="flex text-center gap-1 w-[25px]">
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="rounded-full bg-white"
                                                        initial={{ opacity: 0.3, height: "4px", width: "4px" }}
                                                        animate={{ opacity: 1, height: "5px", width: "5px" }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 1,
                                                            repeatType: "loop",
                                                            delay: i * 0.1
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <span>Unreal está digitando</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-10 w-full bg-neutral-900 bg-grid-small-white/[0.1] relative flex items-center justify-center">
                    <div className="absolute pointer-events-none inset-0 flex items-center 
                    justify-center bg-neutral-900 
                    [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
                    <div className="flex text-white flex-col items-center justiify-center gap-6 text-center">
                        <div className="flex flex-col gap-2 ">
                            <h1 className="font-extrabold text-4xl">Totalmente customizavel</h1>
                            <span className="max-w-[800px]">
                                Connections é um bot totalmente personalizável, onde 90% dos recursos
                                podem ser ajustados conforme suas preferências, permitindo que você
                                o configure exatamente do seu jeito.
                            </span>
                        </div>
                        <div className="gap-4 grid grid-cols-2 tablet:grid-cols-1 text-start">
                            {Object.values(ConnectedConnectionFlags).map((flag, index) =>
                                (flag !== ConnectedConnectionFlags.Locked) && (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-1 p-3 rounded-lg 
                                        bg-neutral-900 h-full place-content-center max-w-96">
                                        <div className="flex items-center gap-1">
                                            <div className="relative">
                                                <Switch color="secondary" />
                                            </div>
                                            <span className="font-bold">{flagsDescriptions[flag].title}</span>
                                        </div>
                                        <span className="text-sm text-neutral-300">{flagsDescriptions[flag].description}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-2 flex justify-center items-center mobile:hidden">
                <MdKeyboardDoubleArrowDown className="text-neutral-300 text-3xl animate-bounce" />
            </div>
        </div>
    )
}
