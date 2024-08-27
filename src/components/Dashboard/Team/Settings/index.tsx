import { useLanguage } from "../../../../hooks/useLanguage";
import type { TeamPayload } from "../../../../types";
import { motion } from "framer-motion";
import DeleteTeam from "./Delete";
import TransferTeamOwner from "./TransferOwner";
import { Modal, useDisclosure } from "@nextui-org/modal";

interface Props {
	team: TeamPayload;
	setTeam: (team: TeamPayload) => void;
	setActiveTab: (tab: string) => void;
	teamID: string;
}

export default function TeamSettings({
	team,
	setTeam,
	setActiveTab,
	teamID,
}: Props) {
	const l = useLanguage();
	const { onOpen, isOpen, onOpenChange } = useDisclosure();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				<div>
					<h1 className="font-bold text-xl">
						{l.dashboard.teams.settings.transfer.title}
					</h1>
					<span className="text-neutral-300">
						{l.dashboard.teams.settings.transfer.description}
					</span>
				</div>
				<button
					className="rounded-lg bg-neutral-900/50 w-fit p-3 px-4 transition 
                    hover:bg-neutral-900"
					onClick={onOpen}
				>
					{l.dashboard.teams.settings.transfer.button}
				</button>
			</div>
			<DeleteTeam teamID={teamID} team={team} />
			<Modal
				classNames={{
					closeButton: "transition hover:bg-neutral-700",
					wrapper: "overflow-y-hidden",
					base: "max-h-screen overflow-y-auto",
				}}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<TransferTeamOwner
					teamID={teamID}
					team={team}
					setTeam={setTeam}
					setActiveTab={setActiveTab}
				/>
			</Modal>
		</motion.div>
	);
}
