"use client";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Image from "next/image";
import { HiHashtag } from "react-icons/hi";
import TypingAnimation from "../ui/Type";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import UserEmbed from "./UserEmbed";
import ConnectionsEmbed from "./ConnectionsEmbed";
import { ConnectedConnectionFlags, InitialPageConnectedConnectionFlags } from "@/types";
import { Switch } from "@nextui-org/switch";
import DefaultButton from "../Mixed/Button";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { LuPlusCircle } from "react-icons/lu"
import { BackgroundColoredGradient } from "../ui/BgGradient";
import Link from "next/link";

export default function Page() {
    const l = useLanguage();
    const url = "https://discord.com/oauth2/authorize?client_id=1243234162077470802";
    const flagsDescriptions = {
        [ConnectedConnectionFlags.CompactModeEnabled]: {
            title: l.dashboard.guilds.connections.flags.compactModeEnabled,
            description: l.dashboard.guilds.connections.flags.compactModeEnabledDescription,
        },
        [ConnectedConnectionFlags.AutoTranslate]: {
            title: l.dashboard.guilds.connections.flags.autoTranslate,
            description: l.dashboard.guilds.connections.flags.autoTranslateDescription,
        },
        [ConnectedConnectionFlags.NoIndentification]: {
            title: l.dashboard.guilds.connections.flags.noIndentification,
            description: l.dashboard.guilds.connections.flags.noIndentificationDescription,
        },
        [ConnectedConnectionFlags.AllowLinks]: {
            title: l.dashboard.guilds.connections.flags.allowLinks,
            description: l.dashboard.guilds.connections.flags.allowLinksDescription,
        },
        [ConnectedConnectionFlags.AllowOrigin]: {
            title: l.dashboard.guilds.connections.flags.allowOrigin,
            description: l.dashboard.guilds.connections.flags.allowOriginDescription,
        },
        [ConnectedConnectionFlags.AllowFiles]: {
            title: l.dashboard.guilds.connections.flags.allowFiles,
            description: l.dashboard.guilds.connections.flags.allowFilesDescription,
        }
    };

    return (
        <div className="flex justify-center items-center tablet:mt-20 overflow-x-hidden">
            <div className="flex flex-col max-w-[1100px] text-white">
                <div className="tablet:flex-col flex h-screen tablet:h-auto items-center w-full gap-6 bg-dot-neutral-800/[0.6]">
                    <div className="flex flex-col gap-4 w-[62%] items-start justify-start tablet:items-center tablet:justify-center mobile:w-full">
                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r
                        from-fuchsia-500 to-indigo-500 mobile:text-4xl">
                            Connections
                        </h1>
                        <p className="text-neutral-300 text-lg mobile:text-sm tablet:text-center">
                            {l.home.description}
                        </p>
                        <div className="flex gap-2 items-center w-full tablet:flex-col mobile:max-w-[318px]">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                className="tablet:w-full w-37"
                            >
                                <DefaultButton
                                    href="/dashboard"
                                    className="items-center justify-start p-3 px-8 tablet:w-full w-36"
                                    divclass="tablet:w-full w-37"
                                >
                                    <TbLayoutDashboardFilled />
                                    <span>Painel</span>
                                </DefaultButton>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="w-full"
                            >
                                <a
                                    target="_blank"
                                    href={url}
                                    className="bg-neutral-800 flex items-center justify-start
                            p-4 px-5 rounded-lg transition w-full gap-3 hover:bg-neutral-700"
                                >
                                    <LuPlusCircle size={20} />
                                    <span>Adicionar Connections</span>
                                </a>
                            </motion.div>
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
                <div
                    className="p-10 w-full bg-neutral-900 h-screen tablet:h-auto 
                    bg-grid-small-white/[0.2] relative flex items-center justify-center flex-col"
                >
                    <div className="absolute pointer-events-none inset-0 flex items-center 
                    justify-center bg-neutral-900 
                    [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 0.9, y: 0 }}
                        className="flex text-white flex-col items-center justiify-center gap-3 text-center"
                    >
                        <div className="flex flex-col gap-2">
                            <h1 className="font-extrabold text-4xl">Totalmente customizavel</h1>
                            <span className="max-w-[800px]">
                                Connections é um bot totalmente personalizável, onde 90% dos recursos
                                podem ser ajustados conforme suas preferências, permitindo que você
                                o configure exatamente do seu jeito.
                            </span>
                        </div>
                        <div className="gap-4 grid grid-cols-2 tablet:grid-cols-1 text-start">
                            <AnimatePresence mode="wait">
                                {Object.values(InitialPageConnectedConnectionFlags).map((flag, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        key={index}
                                        className="flex flex-col gap-1 p-3 rounded-lg 
                                        bg-neutral-900 h-full place-content-center max-w-96">
                                        <div className="flex items-center gap-1">
                                            <div className="relative">
                                                <Switch color="secondary" />
                                            </div>
                                            <span className="font-bold">
                                                {flagsDescriptions[flag].title}
                                            </span>
                                        </div>
                                        <span className="text-sm text-neutral-300">
                                            {flagsDescriptions[flag].description}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="bg-neutral-900 p-3 rounded-lg items-center justify-center text-center w-full">
                            <span>E muito mais opções!</span>
                        </div>
                    </motion.div>
                </div>
                <div
                    className="flex items-center justify-center w-full tablet:w-screen tablet:px-3 
                    h-[60vh] bg-dot-neutral-800/[0.5]"
                >
                    <BackgroundColoredGradient>
                        <div className="bg-neutral-900 rounded-lg w-full p-8 flex items-center justify-center flex-col">
                            <div className="justify-center py-4 flex-col text-center items-center gap-2 mobile:w-full w-[76%] flex">
                                <motion.h1
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="font-bold text-3xl mobile:text-xl"
                                >
                                    Adicione o Connections
                                </motion.h1>
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-neutral-300"
                                >
                                    Um bot moderno e exclusivo de conexões para engajar seu servidor e torná-lo mais ativo
                                </motion.span>
                            </div>
                            <div className="border-neutral-800 flex tablet:flex-col tablet:gap-2">
                                <Link
                                    className="hover:bg-neutral-800 transition 
                                        rounded-lg rounded-r-none p-4 w-56 border-2 border-neutral-800
                                        border-r-0 flex items-center justify-start gap-2
                                        tablet:w-full tablet:rounded-lg tablet:border-2"
                                    href="/dashboard"
                                >
                                    <TbLayoutDashboardFilled />
                                    <span className="text-neutral-300 text-lg font-bold">
                                        Painel
                                    </span>
                                </Link>
                                <a
                                    target="_blank"
                                    href={url}
                                    className="hover:bg-neutral-800 transition
                                        rounded-lg rounded-l-none p-4 border-2 border-neutral-800 
                                        w-72 flex gap-2 items-center justify-start font-bold
                                        tablet:rounded-lg tablet:border-2 tablet:w-full mobile:text-sm"
                                >
                                    <LuPlusCircle size={20} />
                                    <span>Adicionar Connections</span>
                                </a>
                            </div>
                        </div>
                    </BackgroundColoredGradient>
                </div>
            </div>
            <div className="absolute bottom-2 flex justify-center items-center mobile:hidden">
                <MdKeyboardDoubleArrowDown className="text-neutral-300 text-3xl animate-bounce" />
            </div>
        </div>
    )
}