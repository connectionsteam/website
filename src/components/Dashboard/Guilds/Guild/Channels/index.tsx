import { RiHashtag } from "react-icons/ri";
import { useLanguage } from "../../../../../hooks/useLanguage";
import {
	ConnectedConnectionFlags,
	type GuildChannelsPayload,
	type GuildPayload,
} from "../../../../../types";
import { LuLock, LuUnlock } from "react-icons/lu";
import Avatar from "../../../../Mixed/Avatar";
import { api } from "../../../../../utils/api";
import Link from "next/link";

interface Props {
	channels: GuildChannelsPayload[];
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
}

export default function Channels({ channels, guild, setGuild }: Props) {
	const l = useLanguage();

	const handleToggleLocked = (connectionName: string) => async () => {
		const connection = guild.connections.find(
			(connection) => connection.name === connectionName,
		);

		if (!connection) return;

		const { flags } = connection;

		if (flags.includes(ConnectedConnectionFlags.Frozen)) return;

		const filteredFlags = flags.includes(ConnectedConnectionFlags.Locked)
			? flags.filter(
					(flag) => flag !== ConnectedConnectionFlags.Locked,
				)
			: [...flags, ConnectedConnectionFlags.Locked];

		await api.patch(`/guilds/${guild.id}/connections/${connection.name}`, {
			flags: filteredFlags,
		});

		setGuild({
			...guild,
			connections: guild.connections.map((connection) =>
				connection.name === connectionName
					? { ...connection, flags: filteredFlags }
					: connection,
			),
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
			<div className="flex flex-col gap-3">
				{guild.connections.map((connection) => {
					const channel = channels.find(
						(channel) => channel.id === connection.channelId,
					);

					if (!channel) return null;

					return connection ? (
						<div className="group" key={channel.id}>
							<Link
								href={`/guild/${guild.id}/connection/${connection.name}`}
								className="bg-neutral-900/50 rounded-lg w-fit p-3 rounded-b-none
                                flex gap-3 items-center mobile:w-full group-hover:bg-neutral-900 transition"
							>
								<div className="min-w-8 min-h-8">
									<Avatar className="w-8 h-8" src={connection.icon} />
								</div>
								<span className="font-bold text-lg">{connection.name}</span>
							</Link>
							<button
								onClick={handleToggleLocked(connection.name)}
								className="w-full flex gap-2 rounded-lg bg-neutral-900/50 p-3
                                    items-center pr-0 rounded-t-none rounded-tr-lg mobile:rounded-tr-none
                                    group-hover:bg-neutral-900 transition"
							>
								<div
									className="font-bold text-start flex gap-2 items-center
                                    flex-grow"
								>
									<div className="w-4 h-4">
										<RiHashtag fill="#d946ef" />
									</div>
									<span>{channel.name}</span>
								</div>
								<div className="flex gap-2 items-center pr-3 relative">
									{connection.flags.includes(
										ConnectedConnectionFlags.Frozen,
									) && (
										<div
											className="absolute top-0 left-0 w-[34px] h-full 
                                                bg-gradient-to-tr from-cyan-300 via-sky-200
                                                to-sky-500 rounded-lg z-50"
										></div>
									)}
									<div
										className={`transition text-black rounded-lg flex 
                                                    gap-2 p-1 items-center w-full
                                                    ${connection.flags.includes(ConnectedConnectionFlags.Locked)
														? "bg-red-500"
														: "bg-green-500"
													}
                                                    `}
									>
										{connection.flags.includes(
											ConnectedConnectionFlags.Locked,
										) ? (
											<LuLock size={26} />
										) : (
											<LuUnlock size={26} />
										)}
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
