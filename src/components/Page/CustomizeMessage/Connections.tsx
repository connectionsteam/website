import { ReactNode, useEffect, useState } from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import { CustomizeUserProps } from "./Embed";
import { InitialPageConnectionFlags as flagsType } from "../../../types";
import { AnimatePresence, motion } from "framer-motion";
import { languages } from "../../../locale";
import Avatar from "../../Mixed/Avatar";
import { FaCheck } from "react-icons/fa6";
import { LuExternalLink, LuFile } from "react-icons/lu";

interface Props {
	author: CustomizeUserProps;
	hour: string;
	flags: flagsType[];
}

const animation = {
	initial: { opacity: 0, x: 10 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -10 },
	transition: { duration: 0.2 },
};

export default function ConnectionsEmbed({ hour, author, flags }: Props) {
	const l = useLanguage();
	const [translatedContent, setTranslatedContent] = useState("");

	const content: Partial<Record<flagsType, ReactNode>> = {
		[flagsType.AllowEmojis]: <motion.div {...animation}>😃😁</motion.div>,
		[flagsType.AllowLinks]: (
			<motion.a
				{...animation}
				className="text-blue-500 underline"
				href="https://squarecloud.app/"
				target="_blank"
				rel="noreferrer"
			>
				https://squarecloud.app/
			</motion.a>
		),
	};

	const renderMessage = () =>
		flags!
			.sort((a, b) => {
				if (a === flagsType.AllowEmojis) return -1;
				if (b === flagsType.AllowEmojis) return 1;

				return 0;
			})
			.map((flag) => content[flag]);

	useEffect(() => {
		if (flags.includes(flagsType.AutoTranslate)) {
			if (l.language === "en-US")
				setTranslatedContent(
					languages["pt-BR"].home.conversation.spyei.message,
				);
			if (l.language === "pt-BR")
				setTranslatedContent(
					languages["en-US"].home.conversation.spyei.message,
				);
		} else {
			setTranslatedContent(
				languages[l.language].home.conversation.spyei.message,
			);
		}
	}, [l.language, flags]);

	return (
		<div className="flex gap-2 py-2 h-full items-center">
			{flags.includes(flagsType.CompactModeEnabled) ? (
				<div className="flex items-start gap-2">
					<div>
						<div className="min-w-10 min-h-10">
							<Avatar src={author.avatar} className="w-10 h-10" />
						</div>
					</div>
					<div className="flex flex-col w-full">
						<div className="flex gap-1 flex-wrap">
							<div className="flex gap-1 justify-start flex-wrap">
								<span className="font-bold">{author.username}</span>
								{flags.includes(flagsType.AllowOrigin) && (
									<motion.span {...animation}>({l.home.embeds.fromSpyei})</motion.span>
								)}
								<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-0.5 items-center font-bold">
									<span>APP</span>
								</div>
							</div>
							<span className="text-neutral-400 text-xs mt-1">
								{l.home.embeds.hour} {hour}
							</span>
						</div>
						<div className="text-start flex flex-col">
							{translatedContent}
							<AnimatePresence>{renderMessage()}</AnimatePresence>
							<AnimatePresence>
								{flags.includes(flagsType.AllowFiles) && (
									<motion.div
										initial={{ opacity: 0, x: 10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.2 }}
										className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg 
flex-col border-neutral-700 border-2"
									>
										<LuFile />
										<span className="text-neutral-300">{l.home.file}</span>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<button
							className="bg-neutral-900/50 hover:bg-neutral-900 transition p-2
rounded-lg flex items-center gap-2 w-fit text-sm mt-1"
						>
							<span>{l.notifications.seeMessage}</span>
							<LuExternalLink />
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-start gap-2">
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
							<div className="text-start flex flex-col">
								{translatedContent}
								{renderMessage()}
							</div>
							<AnimatePresence>
								{flags.includes(flagsType.AllowOrigin) && (
									<motion.div
										{...animation}
										className="flex gap-2 items-center rounded-lg"
									>
										<div className="min-w-6 min-h-6">
											<Avatar src="/guilds/spyei.png" className="w-6 h-6" />
										</div>
										<span className="text-sm">
											{l.home.conversation.spyei.server}
										</span>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<AnimatePresence>
							{flags.includes(flagsType.AllowFiles) && (
								<motion.div
									initial={{ opacity: 0, x: 10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.2 }}
									className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg 
flex-col border-neutral-700 border-2"
								>
									<LuFile />
									<span className="text-neutral-300">{l.home.file}</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			)}
		</div>
	);
}
