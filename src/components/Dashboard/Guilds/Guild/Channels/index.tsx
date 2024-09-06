import { RiHashtag } from "react-icons/ri";
import { useLanguage } from "../../../../../hooks/useLanguage";
import {
	ConnectedConnectionFlags,
	ConnectedConnectionPayload,
	type GuildChannelsPayload,
	type GuildPayload,
} from "../../../../../types";
import { LuLock, LuUnlock } from "react-icons/lu";
import Avatar from "../../../../Mixed/Avatar";
import { api } from "../../../../../utils/api";
import { motion } from "framer-motion";

interface Props {
	channels: GuildChannelsPayload[];
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	setModifications: (modifications: boolean) => void;
}

export default function Channels({ channels, guild, setGuild }: Props) {
	const l = useLanguage();

	const handleToggleLocked =
		(connection: ConnectedConnectionPayload) => async () => {
			if (connection.flags.includes(ConnectedConnectionFlags.Frozen)) return;

			const lockedAt = connection.lockedAt ? null : Date.now();

			const { data } = await api.patch(
				`/guilds/${guild.id}/connections/${connection.name}`,
				{
					lockedAt,
				},
			);

			const mappedConnections = guild.connections.map((conn) =>
				conn.name === connection.name
					? { ...conn, lockedAt: data.lockedAt }
					: conn,
			);

			setGuild({
				...guild,
				connections: mappedConnections,
			});
		};

	return (
		<div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
			<div className="flex flex-col">
				<h1 className="font-bold text-xl">
					{l.dashboard.guilds.channels.title}
				</h1>
				<span className="text-neutral-300">
					{l.dashboard.guilds.channels.description}
				</span>
			</div>
			<div className="flex flex-col gap-5">
				{guild.connections.map((connection) => {
					const channel = channels.find(
						(channel) => channel.id === connection.channelId,
					);

					if (!channel) return null;

					return connection ? (
						<div
							className="group flex flex-col gap-3 rounded-lg bg-neutral-900/50 p-3"
							key={channel.id}
						>
							<div className="flex gap-2 items-center">
								<div className="min-w-10 min-h-10">
									<Avatar className="w-10 h-10" src={connection.icon} />
								</div>
								<span className="font-bold text-lg">{connection.name}</span>
							</div>
							<button
								onClick={handleToggleLocked(connection)}
								className="w-full flex gap-2 ml-2 bg-neutral-800 p-2 rounded-lg"
							>
								<div
									className="font-semibold text-start flex gap-2 items-center
                                    flex-grow"
								>
									<div className="p-2 bg-neutral-900/50 rounded-lg">
										<RiHashtag fill="#d946ef" />
									</div>
									<span>{channel.name.length > 20 ? channel.name.slice(0, 20) + "..." : channel.name}</span>
								</div>
								<div className="flex gap-2 items-center relative">
									{connection.flags.includes(
										ConnectedConnectionFlags.Frozen,
									) && (
										<div
											className="absolute top-0 left-0 w-[34px] h-full 
                                                bg-gradient-to-tr from-cyan-300 via-sky-200
                                                to-sky-500 rounded-lg z-50"
										></div>
									)}
									<motion.div
										animate={{ x: !connection.lockedAt ? "134%" : 1 }}
										transition={{
											type: "spring",
											bounce: 0.2,
											duration: 0.5,
										}}
										className={`absolute w-8 h-full
										${connection.lockedAt ? "bg-red-500" : "bg-green-500"}
										rounded-lg transition-colors z-10`}
									/>
									<div className="w-full z-20 p-1">
										<LuLock size={26} />
									</div>
									<div className="w-full z-20 p-1">
										<LuUnlock size={26} />
									</div>
								</div>
							</button>
						</div>
					) : null;
				})}
			</div>
		</div>
	);
}
