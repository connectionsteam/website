import { useState } from "react";
import type { MenuProps } from "../Mods";
import { useLanguage } from "../../../../../hooks/useLanguage";
import type { ThreadsProps } from ".";
import type { GuildPayload, GuildThreadsPayload } from "../../../../../types";
import DeleteThread from "./Menu";

interface Props extends ThreadsProps {
	thread: GuildThreadsPayload;
	setGuild: (guild: GuildPayload) => void;
	setModifications: (modifications: boolean) => void;
}

export default function Thread({
	thread,
	setThreads,
	threads,
	guild,
	setGuild,
	setModifications,
}: Props) {
	const l = useLanguage();

	const [menu, setMenu] = useState<MenuProps>({
		hover: null,
		removing: null,
	});

	const handleRemoveThread = async () => {
		setMenu({ ...menu, removing: thread.id });

		const filtredThreads = threads.filter(
			(threada) => threada.id !== thread.id,
		);

		const delete_threads_ids = threads
			.filter((threada) => threada.id === thread.id)
			.map(() => {
				return {
					id: thread.id,
					parentId: thread.originId,
				};
			});

		setGuild({
			...guild,
			delete_threads_ids,
		});

		setThreads(filtredThreads);

		setModifications(true);

		setMenu({ ...menu, removing: null });
	};

	return (
		<div
			onMouseEnter={() => setMenu({ ...menu, hover: thread.id })}
			onMouseLeave={() => setMenu({ ...menu, hover: "" })}
			className="relative"
		>
			<div className="w-full relative tabletdesk:invisible">
				<DeleteThread
					thread={thread}
					open={true}
					handleRemove={handleRemoveThread}
				/>
			</div>
			<DeleteThread
				thread={thread}
				open={menu.hover === thread.id}
				handleRemove={handleRemoveThread}
			/>
			<div className="flex gap-2 items-center bg-neutral-900/50 rounded-lg p-3 break-all">
				<div className="flex flex-col gap-1">
					<div className="flex gap-1 mobile:flex-col">
						<div className="font-semibold">
							{l.dashboard.guilds.threads.thread.originId}:
						</div>
						<span className="text-neutral-300">{thread.originId}</span>
					</div>
					<div className="flex gap-1 mobile:flex-col">
						<div className="font-semibold">
							{l.dashboard.guilds.threads.thread.creatorId}:
						</div>
						<span className="text-neutral-300">{thread.creatorId}</span>
					</div>
					<div className="flex items-start text-start gap-2 mobile:flex-col">
						<span className="font-semibold">
							{l.dashboard.guilds.threads.thread.channels}:
						</span>
						<span className="text-neutral-300">
							{thread.children.join(", ")}
						</span>
					</div>
					<div className="text-sm text-neutral-300 flex gap-1 mobile:flex-col">
						<div className="font-semibold">
							{l.dashboard.guilds.threads.thread.created}:
						</div>
						<span className="text-neutral-300">
							{new Date(thread.createdTimestamp).toLocaleString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
