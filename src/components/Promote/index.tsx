import { ReactNode, useContext, useEffect, useState } from "react";
import { ConnectionPayload } from "../../types";
import DefaultLayout from "../Mixed/Layout";
import { api } from "../../utils/api";
import Head from "next/head";
import Avatar from "../Mixed/Avatar";
import { cn } from "../../utils/cn";
import { UserContext } from "../../contexts/User";
import DefaultButton from "../Mixed/Button";
import { motion } from "framer-motion";
import { LuGift, LuShoppingCart } from "react-icons/lu";
import { useLanguage } from "../../hooks/useLanguage";

export default function PromoteComponent() {
    const [connection, setConnection] = useState<ConnectionPayload>();
    const { user } = useContext(UserContext);
    const l = useLanguage();

    useEffect(() => {
        const fetchConnection = async () => {
            const { data } = await api.get("/users/@me/connections/random");

            setConnection(data);
        };

        fetchConnection();
    }, []);

    return (
        <DefaultLayout className="items-center justify-center flex">
            <Head>
                <title>{l.promote.title}</title>
            </Head>
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold text-lg">{l.promote.title}</span>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 
            to-rose-700 text-5xl font-bold">
                    Promoted
                </h1>
                <span className="font-bold text-xl">{l.promote.description}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <span className="font-bold text-xl">{l.promote.benefits}</span>
                <div className="grid grid-cols-2 gap-4 max-w-[900px]">
                    <Container delay={0}>
                        <div>
                            <span className="font-bold text-lg">{l.promote.priorityConnection.title}</span>
                            <p className="text-neutral-300">{l.promote.priorityConnection.description}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-lg p-0.5 relative">
                                <span className="absolute -top-2 right-3 px-3 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full">
                                    {l.promote.priorityConnection.button}
                                </span>
                                <div className="flex gap-3 bg-[#1F1F1F] rounded-lg p-3 items-center">
                                    <div className="h-9 min-w-9">
                                        <Avatar className="h-9 w-9" src={connection?.icon || ""} />
                                    </div>
                                    <span className="font-semibold">{connection?.name}</span>
                                </div>
                            </div>
                            <div className="bg-[#1F1F1F] rounded-lg w-full h-12"></div>
                            <div className="bg-[#1F1F1F] rounded-lg w-full h-6 rounded-b-none"></div>
                        </div>
                    </Container>
                    <Container delay={0.3}>
                        <div className="absolute -z-10 shadow-[0_0px_100px_rgba(8,_112,_184,_0.7)] shadow-rose-700 right-0 rounded-lg top-0 w-32 h-32 opacity-50"></div>
                        <div>
                            <span className="font-bold text-lg">{l.promote.auditLog.title}</span>
                            <p className="text-neutral-300">{l.promote.auditLog.description}</p>
                        </div>
                        <div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-4">
                            <div className="h-10 min-w-10">
                                <Avatar className="h-10 w-10" src={
                                    user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` :
                                        ""
                                } />
                            </div>
                            <div>
                                <span className="font-semibold">{user?.username ?? "Fulano"}</span>
                                {l.promote.auditLog.logEntry.updatedIcon}
                                <span className="font-semibold">https://i.imgur.com/XsRaBXp_d.webp</span>
                            </div>
                        </div>
                        <div className="bg-neutral-900/50 rounded-lg w-full h-16"></div>
                        <div className="bg-neutral-900/50 rounded-lg w-full h-6 rounded-b-none"></div>
                    </Container>
                    <Container delay={0.6}>
                        <div className="absolute -z-10 shadow-[0_0px_100px_rgba(8,_112,_184,_0.2)] shadow-rose-700 left-0 rounded-lg bottom-0 w-32 h-32 opacity-50"></div>
                        <div>
                            <span className="font-bold text-lg">{l.promote.metrics.title}</span>
                            <p className="text-neutral-300">{l.promote.metrics.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">{l.promote.metrics.access.title}</span>
                            <div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-3">
                                <div className="flex gap-1 font-semibold">
                                    <span className="text-[#0DF228]">+ 1.2k</span>
                                    <span>{l.promote.metrics.access.recentAccesses}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">{l.promote.metrics.connections.title}</span>
                            <div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-3 rounded-b-none">
                                <div className="flex gap-1 font-semibold">
                                    <span className="text-[#0DF228]">+ 465</span>
                                    <span>{l.promote.metrics.connections.recentConnections}</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                    <Container delay={0.9}>
                        <div>
                            <span className="font-bold text-lg">{l.promote.cooldownReduction.title}</span>
                            <p className="text-neutral-300">{l.promote.cooldownReduction.description}</p>
                        </div>
                        <div className="flex items-center justify-center h-full flex-col gap-2">
                            <div className="flex flex-col gap-1 text-center">
                                <div className="text-sm text-red-500 font-semibold">
                                    {l.promote.cooldownReduction.before}
                                </div>
                                <div className="text-2xl text-[#0DF228] font-semibold">
                                    {l.promote.cooldownReduction.after}
                                </div>
                            </div>
                            <DefaultButton pink className="w-40 flex items-center justify-center py-3" divclass="w-fit">
                                {l.promote.cooldownReduction.button}
                            </DefaultButton>
                        </div>
                    </Container>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 flex-col">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <span className="font-bold text-lg">{l.promote.buy.description}</span>
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 
                    to-rose-700 text-4xl font-bold">
                            {l.promote.buy.price}
                        </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <DefaultButton pink className="w-40 flex items-center justify-center py-3 shadow-rose-700 shadow-[0_0px_20px_rgba(8,_112,_184,_0.7)]" divclass="w-fit">
                            <LuShoppingCart />
                            <span>{l.promote.buy.button}</span>
                        </DefaultButton>
                        <button className="w-40 flex items-center justify-center py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition gap-2">
                            <LuGift />
                            <span>{l.promote.buy.gift}</span>
                        </button>
                    </div>
                    <span className="text-neutral-300 max-w-[600px] text-center">{l.promote.expiration}</span>
                </div>
            </div>
        </DefaultLayout>
    )
}

function Container({ children, classoid, delay }: { children: ReactNode, classoid?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay }}
            className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-lg p-0.5 relative z-20"
        >
            <div className={cn("flex flex-col gap-2 p-4 pb-0 bg-neutral-800 rounded-lg h-full z-20", classoid)}>
                {children}
            </div>
        </motion.div>
    )
}