import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Switch,
} from "@nextui-org/react";
import { useLanguage } from "../../../../hooks/useLanguage";
import { HiHashtag } from "react-icons/hi";
import {
	GuildChannelsPayload,
	GuildPayload,
	LogsFlag,
} from "../../../../types";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";

interface Props {
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	channels: GuildChannelsPayload[];
	actualGuild: GuildPayload;
	setModifications: (modifications: boolean) => void;
	reportMessage: boolean;
	setReportMessage: (reportMessage: boolean) => void;
}

export default function GuildLogs({
	guild,
	setGuild,
	channels,
	actualGuild,
	setModifications,
	reportMessage,
	setReportMessage,
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
	};
	const handleFlagChange = (flag: LogsFlag) => () => {
		const { flags } = guild.logs;

		const updatedFlags = flags.includes(flag)
			? flags.filter((f) => f !== flag)
			: [...flags, flag];

		if (
			flag === LogsFlag.LogReports &&
			!updatedFlags.includes(LogsFlag.LogReports)
		) {
			if (!actualGuild.logs.flags.includes(LogsFlag.LogReports)) {
				setReportMessage(true);
			} else {
				setReportMessage(true);
			}
		} else {
			if (updatedFlags.includes(LogsFlag.LogReports)) {
				setReportMessage(false);
			}
		}

		const areFlagsEqual =
			actualGuild.logs.flags.length === updatedFlags.length &&
			actualGuild.logs.flags.every((tag) => updatedFlags.includes(tag));

		setModifications(!areFlagsEqual);

		if (updatedFlags.includes(LogsFlag.LogAny)) {
			return setGuild({
				...guild,
				logs: {
					...guild.logs,
					flags: [LogsFlag.LogAny],
				},
			});
		}

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
												? channels.find((channel) => channel.id === categoryId)!
														.name.length > 30
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
											isDisabled={
												guild.logs.flags.includes(LogsFlag.LogAny) &&
												flag !== LogsFlag.LogAny
											}
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
			{reportMessage && (
				<div className="bg-yellow-600/20 rounded-lg p-3 flex gap-2 items-center mobile:flex-col">
					<IoIosWarning className="fill-yellow-300" size={30} />
					<span>{l.dashboard.guilds.info.logs.reportMessage}</span>
				</div>
			)}
		</div>
	);
}
