import type { TeamPayload } from "../../../../types";
import { motion } from "framer-motion";
import type { TeamState } from "..";
import Avatar from "../../../Mixed/Avatar";
import Link from "next/link";
import DeleteTeam from "./Delete";

interface Props {
	team: TeamPayload;
	index: number;
	setTeamProps: (teamProps: TeamState) => void;
	teamProps: TeamState;
	handleDeleteTeam: () => void;
}

export default function TeamCard({
	team,
	index,
	setTeamProps,
	teamProps,
	handleDeleteTeam,
}: Props) {
	return (
		<motion.div
			key={team.id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ delay: index * 0.1, duration: 0.09 }}
			onMouseEnter={() => setTeamProps({ ...teamProps, hover: team.id })}
			onMouseLeave={() => setTeamProps({ ...teamProps, hover: null })}
			className="w-full relative"
		>
			<DeleteTeam
				id={team.name}
				open={teamProps.hover === team.id}
				handleRemove={handleDeleteTeam}
			/>
			<Link
				href={`/dashboard/team/${team.id}`}
				className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 
                hover:bg-neutral-700 transition relative w-full h-full"
			>
				<Avatar
					className="w-12 h-12"
					src={team.iconURL || ""}
					key={team.name}
				/>
				<div className="flex flex-col gap-1 text-start">
					<span className="font-bold text-lg">{team.name}</span>
				</div>
			</Link>
		</motion.div>
	);
}
