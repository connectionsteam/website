import { useLanguage } from "../../hooks/useLanguage";
import { motion } from "framer-motion";
import Avatar from "../Mixed/Avatar";
import { LuExternalLink } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

interface Props {
	author: {
		avatar: string;
		username: string;
	};
	delay: number;
	server: string;
	message: string;
	hour: string;
	response?: boolean;
	compact: boolean;
}

export default function ConnectionsEmbed({
	author,
	delay,
	server,
	message,
	hour,
	response,
	compact,
}: Props) {
	const l = useLanguage();

	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay }}
			className="flex items-start gap-2 px-2"
		>
			{compact ? (
				<>
					<div className="min-w-10 min-h-10">
						<Avatar src={author.avatar} className="w-10 h-10" />
					</div>
					<div className="flex flex-col w-full">
						<div className="flex gap-1">
							<div className="flex gap-1 items-center justify-center">
								<span className="font-bold">{author.username}</span>
								<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-0.5 items-center font-bold">
									<span>APP</span>
								</div>
							</div>
							<span className="text-neutral-400 text-xs mt-1">
								{l.home.embeds.hour} {hour}
							</span>
						</div>
						<span className="text-neutral-200">{message}</span>
						<button
							className="bg-neutral-900/50 hover:bg-neutral-900 transition p-2
					rounded-lg flex items-center gap-2 w-fit text-sm mt-1"
						>
							<span>{l.notifications.seeMessage}</span>
							<LuExternalLink />
						</button>
					</div>
				</>
			) : (
				<>
					<div className="min-w-10 min-h-10">
						<Avatar src="/avatars/connections.png" className="w-10 h-10" />
					</div>
					<div className="flex gap-1 flex-col w-full">
						<div className="flex gap-1">
							<div className="flex gap-1 items-center justify-center">
								<span className="font-bold">Connections</span>
								<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-0.5 items-center font-bold">
									<FaCheck />
									<span>APP</span>
								</div>
							</div>
							<span className="text-neutral-400 text-xs mt-1">
								{l.home.embeds.hour} {hour}
							</span>
						</div>
						<div className="bg-neutral-900/50 rounded-lg p-3 flex flex-col gap-2 w-full">
							<div className="flex gap-2 items-center w-full">
								<div className="min-w-7 min-h-7">
									<Avatar src={author.avatar} className="w-7 h-7" />
								</div>
								<span className="font-bold">{author.username}</span>
							</div>
							<span className="text-neutral-200">{message}</span>
							<div className="flex gap-2 items-center rounded-lg">
								<div className="min-w-6 min-h-6">
									<Avatar
										src={`/guilds/${response ? "spyei" : "unreal"}.png`}
										className="w-6 h-6"
									/>
								</div>
								<span className="text-sm">{server}</span>
							</div>
						</div>
					</div>
				</>
			)}
		</motion.div>
	);
}
