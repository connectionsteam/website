import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { api } from "../../../../utils/api";
import {
	DiscordMember,
	type GuildPayload,
	type GuildThreadsPayload,
	ModPermType,
} from "../../../../types";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	modifications: boolean;
	setModifications: (modifications: boolean) => void;
	guild: GuildPayload;
	actualGuild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	changedTab: boolean;
	setActualGuild: (guild: GuildPayload) => void;
	setThreads: (threads: GuildThreadsPayload[]) => void;
}

export default function GuildModifications({
	setModifications,
	guild,
	actualGuild,
	setGuild,
	changedTab,
	setActualGuild,
	setThreads,
}: Props) {
	const [loading, setLoading] = useState({ loading: false, check: false });
	const l = useLanguage();

	const patchChanges = async () => {
		const { mods, delete_threads_ids: deleteThreadsId, prefix } = guild;

		const mappedMods =
			mods
				.filter((mod) => mod.type !== ModPermType.PhysicalOwner)
				.map((mod) => ({
					id: mod.id,
					type: mod.type,
				})) ?? [];

		setLoading({ loading: true, check: false });

		const body = {
			mods: mappedMods,
			deleteThreadsId,
			prefix: prefix ?? undefined,
		};

		for (const i in body) {
			if (!body[i as keyof typeof body]) {
				delete body[i as keyof typeof body];
			}
		}

		const {
			data: { mods: guildMods, threads: guildThreads },
		} = await api.patch<GuildPayload>(`/guilds/${guild.id}`, body);

		const updatedMods = guildMods.map((mod) => {
			const originalMod = guild.mods.find((original) => original.id === mod.id);
			return {
				...mod,
				avatar: originalMod?.avatar ?? null,
				username: originalMod?.username ?? null,
			};
		});

		setActualGuild({
			...actualGuild,
			threads: guildThreads,
			//@ts-expect-error Missing keyowrd purposely
			mods: updatedMods,
			prefix: prefix === undefined || prefix === "" ? "c" : prefix,
		});

		setGuild({
			...guild,
			//@ts-expect-error Missing keyowrd purposely
			mods: updatedMods,
			prefix: prefix === undefined || prefix === "" ? "c" : prefix,
		});

		setLoading({ ...loading, check: true });

		setTimeout(() => {
			setLoading({ ...loading, check: false });
			setModifications(false);
		}, 1000);
	};

	const resetChanges = () => {
		setGuild({
			...guild,
			prefix: actualGuild.prefix,
			mods: actualGuild.mods,
		});
		setThreads(guild.threads as GuildThreadsPayload[]);
		setModifications(false);
	};

	return (
		<div
			className={`p-3 bg-neutral-800 transition border-2 border-neutral-700 
            rounded-lg justify-center flex gap-2 items-center px-4 w-full max-w-[1100px] 
          shadow-neutral-700 shadow-md ${changedTab ? "border-red-500" : ""} tablet:w-[98vw]
            mobile:flex-col`}
		>
			<div className="flex flex-grow gap-2 items-center mobile:text-center">
				<IoIosWarning className="fill-yellow-300 size-8" />
				<span>{l.dashboard.guilds.modifications.changes}</span>
			</div>
			<div className="flex gap-3 items-center mobile:flex-col-reverse">
				<button
					className="transition hover:underline mobile:text-sm"
					onClick={resetChanges}
				>
					<span>{l.dashboard.guilds.modifications.reset}</span>
				</button>
				<button
					disabled={loading.check || loading.loading}
					className="flex gap-2 items-center bg-green-500 rounded-lg transition 
                    hover:bg-green-600 px-4 p-2 disabled:hover:bg-green-500 mobile:text-sm 
                    mobile:w-full text-center mobile:justify-center"
					onClick={patchChanges}
				>
					<span>{l.dashboard.guilds.info.save}</span>
					{loading.loading && (
						<AiOutlineLoading3Quarters className="animate-spin" size={18} />
					)}
					{loading.check && <FaCheckCircle className="text-white" size={18} />}
				</button>
			</div>
		</div>
	);
}
