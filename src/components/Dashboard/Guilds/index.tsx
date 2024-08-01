import { Input } from "@nextui-org/input";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { GuildPayload } from "@/types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import { LuPlusCircle } from "react-icons/lu";
import Avatar from "@/components/Mixed/Avatar";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";
import { MdOutlineSync } from "react-icons/md";
import { useLanguage } from "@/hooks/useLanguage";

const url = "https://discord.com/oauth2/authorize?client_id=1243234162077470802";

interface Props {
    guilds: GuildPayload[] | null;
    fetchGuilds: () => void;
}

export default function GuildsComponent({ guilds, fetchGuilds }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [clicked, setClicked] = useState(false);
    const l = useLanguage();

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">
                    {l.dashboard.guilds.title}
                </h1>
                <span className="text-neutral-300">
                    {l.dashboard.guilds.description}
                </span>
            </div>
            <div className="flex w-full h-full gap-1">
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} onChange={handleChangeQuery} type="string" label={l.dashboard.misc.filterGuilds} />
                <button
                    onClick={() => {
                        fetchGuilds();
                        setClicked(true);
                        setTimeout(() => setClicked(false), 1000);
                    }}
                    className="w-14 bg-neutral-800 rounded-lg items-center flex justify-center
                    group hover:bg-neutral-700 transition"
                >
                    <MdOutlineSync
                        className={`${clicked ? "rotate-[360deg]" : ""} transition`}
                        size={20}
                    />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                {guilds ? (
                    guilds
                        .filter((guild) => guild.id.includes(searchQuery)
                            || guild.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
                        .map((guild, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative w-full 
                                    ${"premium" in guild ?
                                        "p-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500" : ""} 
                                    `}
                            >

                                {"premium" in guild && (
                                    <div className="absolute z-10 -top-2 -left-2">
                                        <HiSparkles className="fill-yellow-500" size={28} />
                                        <StarDust />
                                    </div>
                                )}
                                <Link
                                    href={`/guild/${guild.id}`}
                                    className="flex items-center gap-2 p-3 rounded-lg 
                                        bg-neutral-800 hover:bg-neutral-700 transition relative w-full h-full"
                                >
                                    <Avatar
                                        className="w-12 h-12"
                                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                        key={guild.id}
                                    />
                                    <div className="flex flex-col gap-1 text-start">
                                        <span className="font-bold text-lg">{guild.name}</span>
                                        <span className="text-neutral-300 text-sm">{guild.id}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                ) : <ConnectionsSkeleton />}
                <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 
                to-indigo-500 rounded-lg w-full">
                    <a
                        target="_blank" href={url}
                        className="flex items-center justify-center gap-2 p-5 
                        h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition"
                    >
                        <LuPlusCircle size={23} />
                        <span>{l.dashboard.guilds.addServer}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

const StarDust = () => {
    const particles = Array.from({ length: 10 });

    return (
        <>
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 1, y: 0, x: 0 }}
                    animate={{ opacity: 0, y: 50, x: (Math.random() - 0.1) * 40 }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 0.5 }}
                >
                    <div className="absolute bg-yellow-500 h-1 w-1 rotate-45 left-2 -top-1" />
                </motion.div>
            ))}
        </>
    );
};