import { useLanguage } from "../../../../hooks/useLanguage";
import type { ConnectionPayload } from "../../../../types";
import { AnimatePresence, motion } from "framer-motion";
import DefaultInput from "../../../Mixed/Input";
import ConnectionModifications from "../Modifications";
import ConnectionEditTag from "./Tags";
import { useEffect, useState } from "react";
import Avatar from "../../../Mixed/Avatar";
import { FaCheck } from "react-icons/fa6";
import Markdown from "../../../Mixed/Markdown";

interface Props {
	connection: ConnectionPayload;
	setConnection: (connection: ConnectionPayload) => void;
	modifications: boolean;
	setModifications: (modifications: boolean) => void;
	changedTab: boolean;
	editedConnection: Partial<ConnectionPayload>;
	setEditedConnection: (editedConnection: Partial<ConnectionPayload>) => void;
}

export default function EditDashboardConnection({
	connection,
	setConnection,
	modifications,
	setModifications,
	changedTab,
	editedConnection,
	setEditedConnection,
}: Props) {
	const l = useLanguage();
	const [livePreview, setLivePreview] = useState(false);
	const [hour, setHour] = useState("");

	useEffect(() => {
		const now = new Date(Date.now());
		const spplitedDate = now
			.toLocaleString(l.language)
			.split(", ")[1]
			.split(":");

		setHour(`${spplitedDate[0]}:${spplitedDate[1]}`);
	}, [l.language]);

	const handleChangeKey = (key: string, value: string) => {
		if (connection[key as keyof ConnectionPayload] === value) {
			setModifications(false);
		} else {
			setModifications(true);
		}

		setEditedConnection({
			...editedConnection,
			[key]: value,
		});
	};

	return (
		<motion.div
			initial={{ opacity: changedTab ? 1 : 0 }}
			animate={{ opacity: 1 }}
			className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-4"
		>
			<div>
				<h1 className="font-bold text-xl">
					{l.dashboard.connections.edit.title}
				</h1>
				<span className="text-neutral-300">
					{l.dashboard.connections.edit.description}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<DefaultInput
					maxChars={16}
					minChars={1}
					value={editedConnection.name}
					label={l.dashboard.connections.connection.form.name}
					type="text"
					placeholder={
						l.dashboard.connections.connection.form.placeholders.name
					}
					onChange={(e) => handleChangeKey("name", e.target.value)}
				/>
				<DefaultInput
					type="text"
					label={l.dashboard.connections.edit.condescription}
					placeholder={
						editedConnection.description ||
						l.dashboard.connections.edit.condescriptionPlaceholder
					}
					maxChars={50}
					minChars={20}
					value={editedConnection.description}
					onChange={(e) => handleChangeKey("description", e.target.value)}
				/>
				<DefaultInput
					type="text"
					label={l.dashboard.connections.edit.icon}
					value={editedConnection.icon}
					placeholder={
						editedConnection.icon ||
						l.dashboard.connections.edit.iconPlaceholder
					}
					onChange={(e) => handleChangeKey("icon", e.target.value)}
				/>
				<ConnectionEditTag
					editedConnection={editedConnection}
					setEditedConnection={setEditedConnection}
					modifications={modifications}
					setModifications={setModifications}
					connection={connection}
				/>
				<div>
					<span>{l.dashboard.connections.edit.rules.title}</span>
					<div className="flex gap-2 h-full flex-col">
						<span className="text-neutral-300">
							{l.dashboard.connections.edit.rules.description}
						</span>
						<div className="grid gap-1 grid-cols-2 w-full mobile:grid-cols-1">
							<div className="relative w-full">
								<span className="absolute text-neutral-300 right-4 text-sm">
									{(editedConnection.rules ?? "").length}/700
								</span>
								<textarea
									minLength={25}
									maxLength={700}
									className="w-full p-3 bg-neutral-900/50 outline-none rounded-lg h-full py-5"
									value={editedConnection.rules ?? ""}
									placeholder={l.connection.filters.typehere}
									onChange={(e) => {
										handleChangeKey("rules", e.target.value);
										e.target.style.height = "auto";
										e.target.style.height = `${e.target.scrollHeight}px`;
									}}
									rows={10}
								/>
							</div>
							{livePreview && (
								<div className="h-full w-full rounded-lg bg-[#313338] p-3 flex gap-2">
									<div className="min-w-10 min-h-10">
										<Avatar
											src="/avatars/connections.png"
											className="w-10 h-10"
										/>
									</div>
									<div className="flex gap-1 flex-col w-full">
										<div className="flex gap-1">
											<div className="flex gap-1 items-center justify-center">
												<span className="font-bold">Connections</span>
												<div className="rounded-md text-white bg-blue-500 px-2 py-[1px] text-xs flex gap-1 items-center font-bold">
													<FaCheck />
													<span>APP</span>
												</div>
											</div>
											<span className="text-neutral-400 text-xs mt-1">
												{l.home.embeds.hour} {hour}
											</span>
										</div>
										<div
											className={`bg-neutral-900/50 rounded-lg p-3 flex flex-col 
									gap-2 w-full ${(editedConnection.rules ?? "").split(" ", 2).length > 1 ? "break-words" : "break-all"}`}
										>
											<div>
												<Markdown markdown={editedConnection.rules ?? ""} />
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<button
						onClick={() => setLivePreview(!livePreview)}
						className="p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900
			transition w-fit mt-2"
					>
						{l.dashboard.connections.edit.rules.preview}
					</button>
				</div>
			</div>
			<AnimatePresence>
				{modifications && (
					<motion.div
						initial={changedTab ? {} : { opacity: 0, y: 200 }}
						animate={
							changedTab
								? {
										x: [0, -10, 10, -10, 10, -5, 5, 0],
										transition: {
											duration: 0.4,
											ease: "easeInOut",
										},
									}
								: { opacity: 1, y: -10 }
						}
						transition={
							changedTab
								? {
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "loop",
									}
								: undefined
						}
						exit={{ opacity: 0, y: 200 }}
						className="fixed bottom-0 right-0 w-full flex flex-col 
                        gap-4 items-center z-50"
					>
						<ConnectionModifications
							changedTab={changedTab}
							connection={connection}
							editedConnection={editedConnection}
							setEditedConnection={setEditedConnection}
							setConnection={setConnection}
							setModifications={setModifications}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

// ajeitar esse bug maldito de puxar para baixo quando ele tenta mudar de aba
