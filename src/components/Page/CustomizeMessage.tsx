import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { Switch } from "@nextui-org/switch";
import { InitialPageConnectionFlags } from "../../types";
import { act, useEffect, useState } from "react";
import EditedConnectionsEmbed, {
	CustomizeUserProps,
} from "./EditedConnectionsEmbed";

interface Props {
	compactMode: boolean;
	setCompactMode: (compactMode: boolean) => void;
	author: CustomizeUserProps;
}

export default function CustomizeMessage({
	compactMode,
	setCompactMode,
	author,
}: Props) {
	const l = useLanguage();
	const [activeFlags, setActiveFlags] = useState<InitialPageConnectionFlags[]>(
		[],
	);

	const flagsDescriptions = {
		[InitialPageConnectionFlags.AllowFiles]: {
			title: l.dashboard.guilds.connections.flags.allowFiles,
			description: l.dashboard.guilds.connections.flags.allowFilesDescription,
		},
		[InitialPageConnectionFlags.AllowLinks]: {
			title: l.dashboard.guilds.connections.flags.allowLinks,
			description: l.dashboard.guilds.connections.flags.allowLinksDescription,
		},
		[InitialPageConnectionFlags.NoIndentification]: {
			title: l.dashboard.guilds.connections.flags.noIndentification,
			description:
				l.dashboard.guilds.connections.flags.noIndentificationDescription,
		},
		[InitialPageConnectionFlags.AutoTranslate]: {
			title: l.dashboard.guilds.connections.flags.autoTranslate,
			description:
				l.dashboard.guilds.connections.flags.autoTranslateDescription,
		},
		[InitialPageConnectionFlags.AllowEmojis]: {
			title: l.dashboard.guilds.connections.flags.allowEmojis,
			description: l.dashboard.guilds.connections.flags.allowEmojisDescription,
		},
		[InitialPageConnectionFlags.CompactModeEnabled]: {
			title: l.dashboard.guilds.connections.flags.compactModeEnabled,
			description:
				l.dashboard.guilds.connections.flags.compactModeEnabledDescription,
		},
	};

	useEffect(() => {
		setActiveFlags([
			InitialPageConnectionFlags.AllowEmojis,
			InitialPageConnectionFlags.AllowLinks,
		]);
	}, []);

	const handleChangeFlag = (flag: InitialPageConnectionFlags) => () => {
		if (flag === "COMPACT_MODE") setCompactMode(!compactMode);

		if (activeFlags.includes(flag)) {
			setActiveFlags(activeFlags.filter((f) => f !== flag));
		} else {
			setActiveFlags([...activeFlags, flag]);
		}
	};

	return (
		<div className="p-10 w-full h-screen tablet:h-auto relative flex items-center justify-center flex-col">
			<div className="flex text-white flex-col items-center justiify-center gap-6 text-center">
				<div className="flex flex-col gap-4">
					<h1 className="font-extrabold text-4xl">{l.home.custom.title}</h1>
					<span className="max-w-[800px]">{l.home.custom.description}</span>
				</div>
				<div className="flex flex-col gap-6 items-center justify-center">
					<div className="w-fit min-w-80">
						<EditedConnectionsEmbed author={author} flags={activeFlags} />
					</div>
					<div className="flex flex-wrap gap-6 tablet:flex-col items-center justify-start">
						{Object.values(InitialPageConnectionFlags).map((flag, index) => (
							<motion.div
								initial={{ opacity: 0, y: -30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * index }}
								key={index}
								className="flex flex-col gap-1 p-3 rounded-lg 
                                        bg-neutral-900 justify-center max-w-96 tablet:w-full"
							>
								<div className="flex items-center gap-1">
									<div className="relative">
										<Switch
											isSelected={activeFlags.includes(flag)}
											isDisabled={
												flag === InitialPageConnectionFlags.NoIndentification &&
												activeFlags.includes(
													InitialPageConnectionFlags.CompactModeEnabled,
												)
											}
											onChange={handleChangeFlag(flag)}
											color="secondary"
										/>
									</div>
									<span className="font-bold">
										{flagsDescriptions[flag].title}
									</span>
								</div>
								<span className="text-sm text-neutral-300 text-start">
									{flagsDescriptions[flag].description}
								</span>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
