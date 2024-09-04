import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { api } from "../../../../utils/api";
import {
	type GuildPayload,
	type GuildThreadsPayload,
	LogsFlag,
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

interface PatchChangesBody {
	mods?: {
		id: string;
		type: ModPermType;
	}[];
	deleteThreadsId:
		| {
				id: string;
				parentId: string;
		  }[]
		| undefined;
	prefix: string | undefined;
	logs?: {
		channelId: string;
		flags: LogsFlag[];
	};
	metadata: {
		maxCharsPerMessage?: number;
	};
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
	const [errors, setErrors] = useState<string[]>([]);
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

		let body: PatchChangesBody = {
			metadata: {
				maxCharsPerMessage: guild.metadata.maxCharsPerMessage ?? 700,
			},
			deleteThreadsId,
			prefix: prefix ?? undefined,
			logs: {
				flags: guild.logs.flags.map((flag) => Number(flag)),
				channelId: guild.logs.channelId as string,
			},
		};

		const modsAreDifferent =
			JSON.stringify(mappedMods) !==
			JSON.stringify(
				actualGuild.mods.map((mod) => ({ id: mod.id, type: mod.type })),
			);

		if (modsAreDifferent) {
			body.mods = mappedMods;
		}

		if (
			body.metadata.maxCharsPerMessage &&
			(body.metadata.maxCharsPerMessage < 3 ||
				body.metadata.maxCharsPerMessage > 900)
		) {
			setLoading({ ...loading, check: false });

			return setErrors(["maxCharsPerMessage"]);
		}

		for (const i in body) {
			if (!body[i as keyof typeof body]) {
				delete body[i as keyof typeof body];
			}
		}

		try {
			const {
				data: { mods: guildMods, threads: guildThreads },
			} = await api.patch<GuildPayload>(`/guilds/${guild.id}`, body);

			const updatedMods = guildMods.map((mod) => {
				const originalMod = guild.mods.find(
					(original) => original.id === mod.id,
				);
				return {
					...mod,
					avatar: originalMod?.avatar ?? null,
					username: originalMod?.username ?? null,
				};
			});

			setActualGuild({
				...actualGuild,
				threads: guildThreads,
				logs: {
					flags: guild.logs.flags,
					channelId: guild.logs.channelId,
				},
				metadata: {
					maxCharsPerMessage: guild.metadata?.maxCharsPerMessage ?? 700,
				},
				//@ts-expect-error Missing keyowrd purposely
				mods: updatedMods,
				prefix: prefix === undefined || prefix === "" ? "c." : prefix,
			});

			setGuild({
				...guild,
				logs: {
					flags: guild.logs.flags,
					channelId: guild.logs.channelId,
				},
				metadata: {
					maxCharsPerMessage: guild.metadata?.maxCharsPerMessage ?? 700,
				},
				//@ts-expect-error Missing keyowrd purposely
				mods: updatedMods,
				prefix: prefix === undefined || prefix === "" ? "c." : prefix,
			});

			setLoading({ ...loading, check: true });

			setTimeout(() => {
				setLoading({ ...loading, check: false });
				setModifications(false);
			}, 500);
		} catch (error) {
			setLoading({ loading: false, check: false });
			
			if (
				body.metadata.maxCharsPerMessage &&
				(body.metadata.maxCharsPerMessage < 3 ||
					body.metadata.maxCharsPerMessage > 900)
			) {	
				return setErrors(["maxCharsPerMessage"]);
			}

			setErrors(["generic"]);
		}
	};

	const resetChanges = () => {
		setGuild({
			...guild,
			logs: {
				flags: actualGuild.logs.flags,
				channelId: actualGuild.logs.channelId,
			},
			metadata: {
				maxCharsPerMessage: actualGuild.metadata?.maxCharsPerMessage ?? 700,
			},
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
          shadow-neutral-700 shadow-md ${changedTab ? "border-red-500" : ""} tablet:w-[98vw] flex-col`}
		>
			<div className="flex w-full mobile:flex-col gap-2 items-center">
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
						{loading.check && (
							<FaCheckCircle className="text-white" size={18} />
						)}
					</button>
				</div>
			</div>
			{errors.includes("generics") ? (
				<div className="text-red-500">{l.errors.generic}</div>
			) : null}
			{errors.includes("maxCharsPerMessage") ? (
				<div className="text-red-500">{l.errors.maxCharsPerMessage}</div>
			) : null}
		</div>
	);
}
