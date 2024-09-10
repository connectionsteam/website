import { LuExternalLink, LuFile } from "react-icons/lu";
import { useLanguage } from "../../hooks/useLanguage";
import { InitialPageConnectionFlags as flagsType } from "../../types";
import Avatar from "../Mixed/Avatar";
import { ReactNode, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import { languages } from "../../locale";
import { motion, AnimatePresence } from "framer-motion";

export interface CustomizeUserProps {
	avatar: string;
	username: string;
	hour: string;
	flags?: flagsType[];
}

interface Props {
	flags: flagsType[];
	author: CustomizeUserProps;
}

interface ConnectionsEmbedProps {
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

export default function EditedConnectionsEmbed({ flags, author }: Props) {
	const l = useLanguage();

	return (
		<div className="flex gap-2 w-full tablet:flex-col items-start justify-center">
			<div className="bg-neutral-800 p-3 rounded-lg flex flex-col gap-2 h-fit w-full">
				<div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50 h-fit">
					<Image
						width={40}
						height={40}
						src="/guilds/spyei.png"
						alt="Spyei's Guild"
						className="rounded-full"
					/>
					<span className="text-lg font-semibold">
						{l.home.conversation.spyei.server}
					</span>
				</div>
				<UserEmbed
					flags={flags}
					avatar={author.avatar}
					username={author.username}
					hour={author.hour}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full h-fit">
				<div className="bg-neutral-800 p-3 rounded-lg flex flex-col gap-3 h-fit w-[120%] tablet:w-full">
					<div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50 h-fit">
						<Image
							width={40}
							height={40}
							src="/guilds/unreal.png"
							alt="Unreal's Guild"
							className="rounded-full"
						/>
						<span className="text-lg font-semibold">
							{l.home.conversation.unreal.server}
						</span>
					</div>
					<ConnectionsEmbed flags={flags} author={author} hour={author.hour} />
				</div>
			</div>
		</div>
	);
}

function ConnectionsEmbed({ hour, author, flags }: ConnectionsEmbedProps) {
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

	console.log(translatedContent, l.language);

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
		<div className="flex items-start gap-2 py-2 h-fit">
			{flags.includes(flagsType.CompactModeEnabled) ? (
				<>
					<div className="min-w-10 min-h-10">
						<Avatar src={author.avatar} className="w-10 h-10" />
					</div>
					<div className="flex flex-col w-full">
						<div className="flex gap-1">
							<div className="flex gap-1 items-center justify-center">
								<span className="font-bold">{author.username}</span>
								<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-0.5 items-center">
									<FaCheck />
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
										{...animation}
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
								<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-0.5 items-center">
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
								{!flags.includes(flagsType.NoIndentification) && (
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
									{...animation}
									className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg 
flex-col border-neutral-700 border-2"
								>
									<LuFile />
									<span className="text-neutral-300">{l.home.file}</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</>
			)}
		</div>
	);
}

function UserEmbed({ avatar, username, hour }: CustomizeUserProps) {
	const l = useLanguage();

	return (
		<div className="flex items-start gap-3 p-2 h-fit">
			<div className="min-w-10 min-h-10">
				<Avatar src={avatar} className="w-10 h-10" />
			</div>
			<div className="flex flex-col text-start">
				<div className="flex gap-1 items-center">
					<span className="font-bold">{username}</span>
					<span className="text-neutral-400 text-xs mt-1">
						{l.home.embeds.hour} {hour}
					</span>
				</div>
				<div className="flex flex-col ">
					{l.home.conversation.spyei.message}
					<span>😃😁</span>
					<a
						className="text-blue-500 underline"
						href="https://squarecloud.app/"
						target="_blank"
						rel="noreferrer"
					>
						https://squarecloud.app/
					</a>
					<div
						className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg 
flex-col border-neutral-700 border-2 mt-1"
					>
						<LuFile size={18} />
						<span className="text-neutral-300 text-sm">{l.home.file}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
