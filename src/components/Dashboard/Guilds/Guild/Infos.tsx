import {
	GuildChannelsPayload,
	GuildPayload,
	GuildThreadsPayload,
	LogsFlag,
	Premium,
} from "../../../../types";
import GuildMods from "./Mods";
import Threads from "./Threads";
import { useLanguage } from "../../../../hooks/useLanguage";
import { Switch } from "@nextui-org/switch";
import { useEffect, useState } from "react";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { HiHashtag } from "react-icons/hi";

interface Props {
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	threads: GuildThreadsPayload[];
	setThreads: (threads: GuildThreadsPayload[]) => void;
	premium: Premium;
	modifications: boolean;
	setModifications: (modifications: boolean) => void;
	actualGuild: GuildPayload;
	channels: GuildChannelsPayload[];
}

export default function Infos({
	guild,
	setGuild,
	threads,
	setThreads,
	premium,
	actualGuild,
	setModifications,
	channels,
}: Props) {
	const l = useLanguage();
	const [groupedChannels, setGroupedChannels] =
		useState<Record<string, GuildChannelsPayload[]>>();

	const flagsDescriptions: Record<
		LogsFlag,
		{
			title: string;
			description: string;
		}
	> = {
		[LogsFlag.LogAny]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.anyLog.title,
			description: l.dashboard.guilds.info.logs.logsbuttons.anyLog.description,
		},
		[LogsFlag.LogBans]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.bansLog.title,
			description: l.dashboard.guilds.info.logs.logsbuttons.bansLog.description,
		},
		[LogsFlag.LogConnections]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.connectionsLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.connectionsLog.description,
		},
		[LogsFlag.LogLocks]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.locksLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.locksLog.description,
		},
		[LogsFlag.LogMessages]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.messagesLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.messagesLog.description,
		},
		[LogsFlag.LogNotes]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.notesLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.notesLog.description,
		},
		[LogsFlag.LogPurges]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.purgesLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.purgesLog.description,
		},
		[LogsFlag.LogReports]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.reportsLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.reportsLog.description,
		},
		[LogsFlag.LogTimeouts]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.timeoutsLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.timeoutsLog.description,
		},
		[LogsFlag.LogMessageDelete]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.messageDeleteLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.messageDeleteLog.description,
		},
		[LogsFlag.LogMessageUpdate]: {
			title: l.dashboard.guilds.info.logs.logsbuttons.messageUpdateLog.title,
			description:
				l.dashboard.guilds.info.logs.logsbuttons.messageUpdateLog.description,
		},
	};

	const handleFlagChange = (flag: LogsFlag) => () => {
		setModifications(true);

		const { flags } = guild.logs;

		const updatedFlags = flags.includes(flag)
			? flags.filter((f) => f !== flag)
			: [...flags, flag];

		setGuild({
			...guild,
			logs: { ...guild.logs, flags: updatedFlags },
		});
	};

	const changeChannel = (channel: GuildChannelsPayload) => () => {
		if (channel.id === guild.logs.channelId) return;

		if (channel.id === actualGuild.logs.channelId) {
			setModifications(false);
		} else {
			setModifications(true);
		}

		setGuild({
			...guild,
			logs: {
				...guild.logs,
				channelId: channel.id,
			},
		});
	};

	useEffect(() => {
		const groupChannelsByCategory = () => {
			const grouped: Record<string, GuildChannelsPayload[]> = {};

			channels.map((channel) => {
				const parentId = channel.parent_id || "";

				if (!grouped[parentId]) {
					grouped[parentId] = [];
				}

				grouped[parentId].push(channel);
			});

			if (grouped[""]) {
				delete grouped[""];
			}

			return setGroupedChannels(grouped);
		};

		groupChannelsByCategory();
	}, [channels]);

	const logsChannel = channels.find(({ id }) => id === guild.logs?.channelId);

	return (
		<div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
			<div className="flex flex-col gap-3">
				<div className="flex gap-2 mobile:flex-col">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<span className="font-bold text-lg">
								{l.dashboard.guilds.info.prefix}
							</span>
							<span>{l.dashboard.guilds.info.prefixdescription}</span>
						</div>
						<div className="flex gap-1">
							<input
								placeholder={l.connection.filters.typehere}
								maxLength={6}
								className="rounded-lg p-3 max-w-32 outline-none bg-neutral-900/50"
								value={guild.prefix !== undefined ? guild.prefix : "c."}
								onChange={(e) => {
									if (e.target.value === (actualGuild.prefix ?? "c.")) {
										setModifications(false);
									} else {
										setModifications(true);
									}

									setGuild({
										...guild,
										prefix: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<span className="font-bold text-lg">
								{l.dashboard.guilds.info.metadata.title}
							</span>
							<span>{l.dashboard.guilds.info.metadata.description}</span>
						</div>
						<div className="flex gap-1">
							<input
								type="number"
								min={3}
								max={900}
								className="rounded-lg p-3 max-w-32 outline-none bg-neutral-900/50"
								value={guild.metadata.maxCharsPerMessage ?? 700}
								onChange={(e) => {
									if (
										parseInt(e.target.value) ===
										(actualGuild.metadata.maxCharsPerMessage ?? 700)
									) {
										setModifications(false);
									} else {
										setModifications(true);
									}

									setGuild({
										...guild,
										metadata: {
											maxCharsPerMessage: parseInt(e.target.value),
										},
									});
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-lg">
						{l.dashboard.guilds.info.logs.title}
					</span>
					<span>{l.dashboard.guilds.info.logs.description}</span>
				</div>
				<div className="bg-neutral-800">
					<Dropdown className="text-white bg-neutral-800">
						<DropdownTrigger
							className="w-fit bg-neutral-900/50 p-3 rounded-lg 
						transition hover:bg-neutral-900 cursor-pointer"
						>
							{logsChannel ? (
								<div className="flex items-center gap-1">
									<HiHashtag fill="#d946ef" />
									<span>{logsChannel.name}</span>
								</div>
							) : (
								<span>{l.dashboard.guilds.info.logs.button}</span>
							)}
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Channels"
							className="max-h-56 min-w-52 items-start overflow-auto flex justify-start"
						>
							{Object.entries(groupedChannels ? groupedChannels : {}).map(
								([categoryId, categoryChannels]) => (
									<DropdownSection
										aria-label="Channel"
										className="w-full"
										classNames={{
											heading: "p-2 text-neutral-400",
										}}
										key={categoryId}
										title={
											categoryId !== ""
												? channels.find((channel) => channel.id === categoryId)
														?.name
													? channels.find(
															(channel) => channel.id === categoryId,
														)!.name.length > 30
														? channels
																.find((channel) => channel.id === categoryId)
																?.name.slice(0, 30) + "..."
														: channels.find(
																(channel) => channel.id === categoryId,
															)?.name
													: undefined
												: undefined
										}
									>
										{categoryChannels.map((channel) => (
											<DropdownItem
												aria-label="ChannelItem"
												classNames={{
													title: "flex items-center gap-1",
												}}
												onClick={changeChannel(channel)}
												className="hover:bg-neutral-900/50 transition p-3 disabled:opacity-50"
												key={channel.id}
											>
												<HiHashtag />
												<span>
													{channel.name.length > 30
														? channel.name.slice(0, 30) + "..."
														: channel.name}
												</span>
											</DropdownItem>
										))}
									</DropdownSection>
								),
							)}
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-lg">
						{l.dashboard.guilds.info.connections.title}
					</span>
					<span>{l.dashboard.guilds.info.connections.description}</span>
				</div>
				<div className="gap-4 grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 items-start">
					{Object.values(LogsFlag)
						.filter((flag) => typeof flag === "number")
						.map((flag, index) => {
							const flagAsNumber = flag as unknown as LogsFlag;

							return (
								<div
									key={index}
									className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-900/50 
									h-full place-content-center"
								>
									<div className="flex items-center gap-1">
										<div className="relative">
											<Switch
												color="secondary"
												isSelected={guild.logs.flags.includes(flagAsNumber)}
												onChange={handleFlagChange(flagAsNumber)}
											/>
										</div>
										<span className="font-bold">
											{flagsDescriptions[flagAsNumber].title}
										</span>
									</div>
									<span className="text-sm text-neutral-300">
										{flagsDescriptions[flagAsNumber].description}
									</span>
								</div>
							);
						})}
				</div>
				<div className="w-full flex tablet:flex-col gap-4">
					<GuildMods
						actualGuild={actualGuild}
						setModifications={setModifications}
						premium={premium}
						setGuild={setGuild}
						guild={guild}
					/>
					<Threads
						setModifications={setModifications}
						setGuild={setGuild}
						premium={premium}
						setThreads={setThreads}
						guild={guild}
						threads={threads}
					/>
				</div>
			</div>
		</div>
	);
}
