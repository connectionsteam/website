import type {
	ConnectionBody,
	GuildChannelsPayload,
	GuildPayload,
} from "../../types";
import ConnectionChannels from "../Dashboard/Guilds/Connection/Channels";
import JoinConnectionLanguage from "../Dashboard/Guilds/Connection/Languages";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import usePremium from "../../hooks/usePremium";
import PremiumPopUp from "../Premium/PopUp";
import { useDisclosure } from "@nextui-org/modal";

interface Props {
	setBody: Dispatch<SetStateAction<ConnectionBody>>;
	body: ConnectionBody;
	guild: GuildPayload;
}

export default function ConnectionsPageChannels({
	setBody,
	body,
	guild,
}: Props) {
	const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
	const { premium } = usePremium(guild);
	const [errors, setErrors] = useState<string[]>([]);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const l = useLanguage();

	useEffect(() => {
		const fetchChannels = async () => {
			const { data } = await api.get(`/guilds/${guild.id}/channels`);

			setChannels(data);
		};

		fetchChannels();
	}, [guild.id]);

	const joinConnection = async () => {
		if (!premium) return;

		setLoading(true);

		const reqBody = {
			channelId: body.channel.id,
			name: body.name,
			language: body.language?.key,
		};

		if (premium.maxConnections <= guild.connections.length) {
			return onOpen();
		}

		if (body.language?.key === "" && body.language?.language === "") {
			delete reqBody.language;
		}

		if (body.channel.id === "") {
			setLoading(false);
			
			return setErrors([
				...errors.filter((error) => error !== l.errors.chooseAnChannel),
				l.errors.chooseAnChannel
			])
		}

		await api.put(`/guilds/${guild!.id}/connections`, reqBody);

		setLoading(false);

		router.push(`/guild/${guild!.id}/connection/${body.name}`);
	};

	return (
		<>
			<JoinConnectionLanguage body={body} setBody={setBody} />
			<ConnectionChannels
				channels={channels}
				setBody={setBody}
				body={body}
				connections={guild.connections}
			/>
			{errors.length > 0 ? (
				<div className="text-red-500">{errors.join(", ")}</div>
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
				{premium ? (
					<PremiumPopUp
						isOpen={isOpen}
						onChange={onOpenChange}
						onClose={onClose}
						limitText={l.limits.connections}
						limit={premium.maxConnections <= guild.connections.length}
						text={l.limits.connectionsText}
					/>
				) : null}
			</div>
		</>
	);
}
