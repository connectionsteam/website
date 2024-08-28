"use client";
import DefaultInput from "../../../../components/Mixed/Input";
import type {
	ConnectionBody,
	GuildChannelsPayload,
	GuildPayload,
	Premium,
} from "../../../../types";
import { api } from "../../../../utils/api";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConnectionChannels from "./Channels";
import JoinConnectionLanguage from "./Languages";
import { useLanguage } from "../../../../hooks/useLanguage";
import { useDisclosure } from "@nextui-org/modal";
import PremiumPopUp from "../../../../components/Premium/PopUp";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	guild: GuildPayload;
	channels: GuildChannelsPayload[];
	onClose: () => void;
	setGuild: (guild: GuildPayload) => void;
	premium: Premium;
}

export default function GuildConnectConnection({
	guild,
	channels,
	onClose,
	setGuild,
	premium,
}: Props) {
	const l = useLanguage();
	const [body, setBody] = useState<ConnectionBody>({
		channel: {
			id: "",
			name: "",
			position: 0,
			nsfw: false,
			parent_id: "",
		},
		name: "",
		language: {
			language: "",
			key: "",
		},
	});
	const [errors, setErrors] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [sonner, setSonner] = useState(false);
	const {
		isOpen: isPremiumOpen,
		onOpen: onPremiumOpen,
		onOpenChange: onPremiumChange,
		onClose: onPremiumClose,
	} = useDisclosure();
	const [tab, setTab] = useState<"public" | "private">("public");

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				joinConnection();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [body, guild]);

	const joinConnection = async () => {
		if (guild.connections.length >= premium.maxConnections) {
			setSonner(false);
			setTimeout(() => setSonner(true), 0);

			return onPremiumOpen();
		}

		setLoading(true);

		try {
			const reqBody = {
				channelId: body.channel.id,
				name: body.name,
				language: body.language?.key,
			};

			if (body.language?.key === "" && body.language?.language === "") {
				delete reqBody.language;
			}

			if (reqBody.name.length < 1 || reqBody.name.length > 16) {
				setErrors([...errors, "name"]);

				return setLoading(false);
			}

			if (reqBody.channelId === "") {
				setErrors([...errors, "channel"]);

				return setLoading(false);
			}

			const privateReqBody = {
				language: reqBody.language,
				channelId: reqBody.channelId,
			};

			if (privateReqBody.language === "") {
				delete privateReqBody.language;
			}

			const { data } = await api.put(
				body.hashInvite
					? `/guilds/${guild.id}/connections/${body.name}/invites/${body.hashInvite}`
					: `/guilds/${guild.id}/connections`,
				body.hashInvite ? privateReqBody : reqBody,
			);

			setLoading(false);
			onClose();
			setGuild({
				...guild,
				connections: [
					...guild.connections.filter((c) => c.name !== data.name),
					{
						...data,
					},
				],
			});
		} catch (error: any) {
			setLoading(false);

			const { code } = error.response.data;

			if (code === 2001) return setErrors(["unknown"]);

			return setErrors(["generic"]);
		}
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="relative w-full flex transition">
				{["public", "private"].map((name: string, index) => (
					<>
						<button
							key={index}
							onClick={() => setTab(name as "public" | "private")}
							className="text-white px-4 rounded-lg py-2 
                        cursor-pointer transition-colors duration-300 
                        gap-2 flex z-20 items-center justify-center w-[50%]"
						>
							<span>
								{index === 0
									? l.dashboard.guilds.connections.public
									: l.dashboard.guilds.connections.private}
							</span>
						</button>
						<motion.div
							key={index}
							animate={{
								width: "50%",
								x: tab === "public" ? 0 : "100%",
								y: 3,
							}}
							transition={{
								type: "spring",
								bounce: 0.3,
								duration: 0.5,
							}}
							className="absolute bg-neutral-700 z-10 h-[84%] 
                        w-12 rounded-lg -translate-y-1/2 -translate-x-1"
						></motion.div>
					</>
				))}
			</div>
			<DefaultInput
				value={body.name}
				obrigatory
				error={errors.includes("name")}
				onChange={(event) => {
					setBody({ ...body, name: event.target.value });
					setErrors([]);
				}}
				label={l.dashboard.guilds.connections.connectionName}
				type="text"
				placeholder={l.dashboard.guilds.connections.connectionPlaceholder}
			/>
			<AnimatePresence>
				{tab === "private" && (
					<motion.div
						key={tab}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
					>
						<DefaultInput
							value={body.hashInvite || ""}
							obrigatory
							onChange={(event) =>
								setBody({ ...body, hashInvite: event.target.value })
							}
							label={l.dashboard.guilds.connections.hashLabel}
							type="text"
							placeholder={l.dashboard.guilds.connections.hashPlaceholder}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<JoinConnectionLanguage setBody={setBody} body={body} />
			<ConnectionChannels
				setBody={setBody}
				body={body}
				channels={channels}
				connections={guild.connections}
			/>
			{errors.length > 0 ? (
				<div>
					{errors.includes("name") ? (
						<div className="text-red-500">{l.errors.wrongConName}</div>
					) : null}
					{errors.includes("unknown") ? (
						<div className="text-red-500">{l.errors.unknownConnection}</div>
					) : null}
					{errors.includes("channel") ? (
						<div className="text-red-500">{l.errors.needChannel}</div>
					) : null}
					{errors.includes("generic") ? (
						<div className="text-red-500">{l.errors.generic}</div>
					) : null}
				</div>
			) : null}
			<div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
				<button
					disabled={loading}
					onClick={joinConnection}
					className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg
                        bg-neutral-800 hover:bg-transparent transition 
                        ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}
				>
					{loading ? (
						<div className="flex gap-2 items-center w-full justify-center">
							<AiOutlineLoading3Quarters className="animate-spin" />
							<span className="font-semibold">
								{l.dashboard.guilds.connections.connecting}
							</span>
						</div>
					) : (
						<span className="font-semibold">
							{l.dashboard.guilds.connections.connect}
						</span>
					)}
				</button>
			</div>
			<PremiumPopUp
				isOpen={isPremiumOpen}
				sonner={sonner}
				onChange={onPremiumChange}
				onClose={onPremiumClose}
				limitText={`Você chegou no limite de conexões de ${guild.connections.length}/${premium.maxConnections}`}
				limit={guild.connections.length === 50}
				text="Parece que você chegou no seu limite de conexões..."
			/>
		</div>
	);
}
