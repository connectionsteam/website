import { Input } from "@nextui-org/input";
import Link from "next/link";
import { ChangeEvent, useContext, useState } from "react";
import { GuildPayload } from "@/types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import { LuCrown, LuPlusCircle } from "react-icons/lu";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import Avatar from "@/components/Mixed/Avatar";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

const url = "https://discord.com/oauth2/authorize?client_id=1243234162077470802";

export default function GuildsComponent({ guilds }: { guilds: GuildPayload[] | null }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { language } = useContext(LanguageContext);

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">{languages[language].dashboard.guilds.title}</h1>
                <span className="text-neutral-300">{languages[language].dashboard.guilds.description}</span>
            </div>
            <Input classNames={{
                inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
            }} onChange={handleChangeQuery} type="string" label={languages[language].dashboard.misc.filterGuilds} />
            <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                {guilds ? (
                    guilds.filter((guild) => guild.id.includes(searchQuery) || guild.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
                        .map((guild, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative w-full ${"premium" in guild ? "p-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500" : ""} `}
                            >

                                {"premium" in guild && (
                                    <div className="absolute z-10 -top-2 -left-2">
                                        <HiSparkles className="fill-yellow-500" size={28} />
                                        <StarDust />
                                    </div>
                                )}
                                <Link
                                    href={`/guild/${guild.id}`}
                                    className={`flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition relative w-full h-full`}
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
                <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                    <a
                        target="_blank" href={url}
                        className="flex items-center justify-center gap-2 p-5 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition"
                    >
                        <LuPlusCircle size={23} />
                        <span>{languages[language].dashboard.guilds.addServer}</span>
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