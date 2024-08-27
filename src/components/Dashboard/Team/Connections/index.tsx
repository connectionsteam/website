import type { TeamPayload } from "../../../../types";
import { AnimatePresence, motion } from "framer-motion";
import DefaultInput from "../../../Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";
import DefaultButton from "../../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";
import { useContext, useState } from "react";
import { Modal, useDisclosure } from "@nextui-org/modal";
import Avatar from "../../../Mixed/Avatar";
import { UserContext } from "../../../../contexts/User";
import Link from "next/link";
import DeleteTeamConnection from "./Delete";
import type { ConnectionState } from "../../Connections";
import { api } from "../../../../utils/api";
import AddTeamConnection from "./Add";

interface Props {
	team: TeamPayload;
	setTeam: (team: TeamPayload) => void;
	teamID: string;
}

export default function TeamConnections({
	team: { children: connections },
	team,
	setTeam,
	teamID,
}: Props) {
	const l = useLanguage();
	const { user: loggedUser } = useContext(UserContext);
	const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
	const [query, setQuery] = useState("");
	const [connectionProps, setConnectionProps] = useState<ConnectionState>({
		connection: null!,
		hover: null,
		removing: null,
	});

	const handleDeleteConnection = async () => {
		setConnectionProps({ ...connectionProps, removing: connectionProps.hover });

		await api.delete(`/teams/${teamID}/connections/${connectionProps.hover}`);

		setTeam({
			...team,
			children: team.children.filter((c) => c.name !== connectionProps.hover),
		});
		setConnectionProps({ ...connectionProps, removing: null });
	};

	const filteredConnections = connections
		? connections.filter(
				(connection) =>
					connection.name.toLowerCase().includes(query.toLowerCase()) ||
					connection.description?.toLowerCase().includes(query.toLowerCase()),
			)
		: [];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-2"
		>
			<div className="flex flex-col">
				<h1 className="font-bold text-2xl">
					{l.dashboard.teams.connections.title}
				</h1>
				<span className="text-neutral-300">
					{l.dashboard.teams.connections.description}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-end">
					<DefaultInput
						onChange={(event) => setQuery(event.target.value)}
						placeholder={l.dashboard.teams.connections.placeholder}
						type="text"
						label={l.dashboard.teams.connections.filterConnections}
					/>
					<DefaultButton
						onClick={onOpen}
						divclass="w-fit h-[51px]"
						className="w-[52px]"
					>
						<LuPlusCircle size={20} />
					</DefaultButton>
				</div>
				<div className="flex flex-col gap-2">
					<AnimatePresence mode="wait">
						{filteredConnections.length > 0 ? (
							filteredConnections.map((connection, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.1 }}
									onMouseEnter={() => {
										if (loggedUser?.id !== team.creatorId) return;

										setConnectionProps({
											...connectionProps,
											hover: connection.name,
										});
									}}
									onMouseLeave={() =>
										setConnectionProps({ ...connectionProps, hover: null })
									}
									className="w-full relative"
								>
									<DeleteTeamConnection
										handleRemove={handleDeleteConnection}
										open={connectionProps.hover === connection.name}
										id={connection.name}
									/>
									<Link
										href={`/dashboard/connection/${connection.name}`}
										className="flex gap-3 text-start w-full rounded-lg p-3 
                                        bg-neutral-900/50 hover:bg-neutral-900 transition"
									>
										<Avatar className="w-12 h-12" src={connection.icon ?? ""} />
										<div className="flex flex-col gap-1 text-start">
											<span className="font-bold text-lg">
												{connection.name}
											</span>
											{connection.description && (
												<span className="text-neutral-300 text-sm">
													{connection.description.length > 30
														? connection.description.slice(0, 30) + "..."
														: connection.description}
												</span>
											)}
										</div>
									</Link>
								</motion.div>
							))
						) : (
							<div className="min-h-[30vh] text-lg items-center font-bold justify-center flex text-center">
								{query === "" ? (
									<div className="flex flex-col">
										<div>{l.dashboard.teams.connections.noConnections}</div>
										<div className="text-sm text-neutral-300 font-normal flex gap-1">
											<p>
												{l.dashboard.teams.connections.noConnectionsDescription}
											</p>
											<span className="font-semibold">+</span>
										</div>
									</div>
								) : (
									l.dashboard.teams.connections.noConnectionsFound
								)}
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>
			<Modal
				classNames={{
					closeButton: "transition hover:bg-neutral-700",
					wrapper: "overflow-y-hidden",
					base: "max-h-screen overflow-y-auto",
				}}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<AddTeamConnection
					setTeam={setTeam}
					team={team}
					onClose={onClose}
					teamID={teamID}
				/>
			</Modal>
		</motion.div>
	);
}
