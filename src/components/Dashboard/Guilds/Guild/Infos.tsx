import type {
	GuildPayload,
	GuildThreadsPayload,
	Premium,
} from "../../../../types";
import GuildMods from "./Mods";
import Threads from "./Threads";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	threads: GuildThreadsPayload[];
	setThreads: (threads: GuildThreadsPayload[]) => void;
	premium: Premium;
	modifications: boolean;
	setModifications: (modifications: boolean) => void;
	actualGuild: GuildPayload;
}

export default function Infos({
	guild,
	setGuild,
	threads,
	setThreads,
	premium,
	actualGuild,
	setModifications,
}: Props) {
	const l = useLanguage();

	return (
		<div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<span className="font-bold text-lg">
						{l.dashboard.guilds.info.prefix}
					</span>
					<span>{l.dashboard.guilds.info.prefixdescription}</span>
				</div>
				<div className="flex gap-1">
					<input
						className="rounded-lg p-3 max-w-32 outline-none bg-neutral-900/50"
						value={guild.prefix !== undefined ? guild.prefix : "c"}
						onChange={(e) => {
							if (e.target.value === actualGuild.prefix) {
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
