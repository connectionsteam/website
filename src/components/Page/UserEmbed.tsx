import { useLanguage } from "../../hooks/useLanguage";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    author: {
        avatar: string;
        username: string;
    };
    delay: number;
    message: string;
}

export default function UserEmbed({ author, delay, message }: Props) {
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
                src={author.avatar}
                alt="Unreal's Avatar"
                className="rounded-full"
            />
            <div className="flex flex-col">
                <div className="flex gap-1">
                    <span className="font-bold">{author.username}</span>
                    <span className="text-neutral-400 text-xs mt-1">
                        {l.home.embeds.hour}
                    </span>
                </div>
                <span>{message}</span>
            </div>
        </motion.div>
    )
}