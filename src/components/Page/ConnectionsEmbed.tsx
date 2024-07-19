import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    author: {
        avatar: string;
        username: string;
    };
    delay: number;
    server: string;
    message: string;
}

export default function ConnectionsEmbed({ author, delay, server, message }: Props) {
    const l = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-start gap-3 px-2"
        >
            <Image
                width={40}
                height={40}
                src="/avatars/connections.png"
                alt="Connections's Avatar"
                className="rounded-full"
            />
            <div className="flex gap-1 flex-col w-full">
                <div className="flex gap-1">
                    <div className="flex gap-1 items-center justify-center">
                        <span className="font-bold">Connections</span>
                        <div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs">
                            APP
                        </div>
                    </div>
                    <span className="text-neutral-400 text-xs mt-1">
                        {l.home.embeds.hour}
                    </span>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-3 flex flex-col gap-2 w-full">
                    <div className="flex gap-2 items-center w-full">
                        <Image
                            width={28}
                            height={28}
                            src={author.avatar}
                            alt="Unreal's Avatar"
                            className="rounded-full"
                        />
                        <span className="font-bold">{author.username}</span>
                    </div>
                    <span className="text-neutral-200">{message}</span>
                    <div className="flex gap-2 items-center rounded-lg">
                        <Image
                            width={24}
                            height={24}
                            src="/guilds/unreal.png"
                            alt="Spyei's Guild"
                            className="rounded-full"
                        />
                        <span className="text-sm">{server}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}