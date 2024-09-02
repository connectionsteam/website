import Avatar from "../../../../components/Mixed/Avatar";
import {
	ConnectedConnectionFlags,
	type ConnectedConnectionPayload,
	type GuildChannelsPayload,
	GuildPayload,
} from "../../../../types";
import BlockedWords from "./BlockedWords";
import type { Dispatch, SetStateAction } from "react";
import GuildConnectionFlags from "./Flags";
import Image from "next/image";
import { HiHashtag } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLanguage } from "../../../../hooks/useLanguage";
import Link from "next/link";
import Head from "next/head";
import capitalize from "../../../../utils/capitalize";

interface Props {
	guildId: string;
	channels: GuildChannelsPayload[];
	connection: ConnectedConnectionPayload;
	setConnection: Dispatch<SetStateAction<ConnectedConnectionPayload>>;
}

export default function GuildEditConnection({
	channels,
	connection,
	setConnection,
	guildId,
}: Props) {
	const l = useLanguage();

	return (
		<>
			<Head>
				<title>{connection.name}</title>
				<meta name="og:image" content={connection.icon} />
				<meta name="og:title" content={connection.name} />
				<meta name="theme-color" content="#D946EF" />
			</Head>
			<div className="relative w-full">
				{connection.flags.includes(ConnectedConnectionFlags.Frozen) && (
					<Image
						width={200}
						height={50}
						src="/backgrounds/frozenborder.png"
						alt="Frozen border"
						className="absolute -top-5 -right-4 z-0"
					/>
				)}
				<div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
					<div className="flex gap-4 items-center">
						<Link
							href={`/guild/${guildId}`}
							className="flex gap-2 items-center bg-neutral-900/50 p-2 text-sm 
                        rounded-lg transition hover:bg-neutral-900"
						>
							<BiLeftArrowAlt />
							<span>{l.dashboard.guilds.connections.infos.back}</span>
						</Link>
						<h1 className="font-bold text-xl">
							{l.dashboard.guilds.connections.infos.title} {connection.name}
						</h1>
					</div>
					<div className="flex flex-col gap-6">
						<div className="flex gap-3">
							<Avatar className="w-16 h-16" src={connection.icon || ""} />
							<div className="flex gap-1 flex-col">
								<span className="font-bold text-lg">{connection.name}</span>
								<div className="text-neutral-300">{connection.description}</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="font-bold text-xl">
								{l.dashboard.guilds.connections.infos.informations}
							</h1>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-1">
									<div>
										{l.dashboard.guilds.connections.infos.blockedWords}:
									</div>
									<span className="text-neutral-300">
										{connection.blockwords && connection.blockwords.length > 0
											? connection.blockwords.join(", ")
											: l.dashboard.guilds.connections.infos.none}
									</span>
								</div>
								<div className="flex gap-1">
									<div className="text-start">
										{l.dashboard.guilds.connections.infos.flags}:
									</div>
									<span className="text-neutral-300">
										{connection.flags.length > 0
											? connection.flags.map((flag) => capitalize(flag)).join(", ")
											: l.dashboard.guilds.connections.infos.none}
									</span>
								</div>
								<div className="flex gap-1">
									<div className="text-start">
										{l.dashboard.guilds.connections.infos.channel}:
									</div>
									<div
										className="text-neutral-300 flex gap-2 bg-neutral-900/50 
                                rounded-lg p-1 text-sm items-center"
									>
										<HiHashtag />
										<span>
											{
												channels.find(
													(channel) => channel.id === connection.channelId,
												)?.name
											}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="font-bold text-xl">
								{l.dashboard.guilds.connections.infos.configure}
							</h1>
							<div className="flex flex-col gap-3">
								<BlockedWords
									setConnection={setConnection}
									guildId={guildId}
									connection={connection}
								/>
								<GuildConnectionFlags
									setConnection={setConnection}
									guildId={guildId}
									connection={connection}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
