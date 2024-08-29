import { useLanguage } from "../../hooks/useLanguage";
import { motion } from "framer-motion";
import Image from "next/image";
import Avatar from "../Mixed/Avatar";

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
			<div className="min-w-10 min-h-10">
				<Avatar src={author.avatar} className="w-10 h-10" />
			</div>
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
	);
}
