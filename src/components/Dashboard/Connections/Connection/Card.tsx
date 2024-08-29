import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import type { ConnectionState } from "..";
import type { ConnectionPayload } from "../../../../types";
import DeleteConnection from "./DeleteConnection";
import Avatar from "../../../../components/Mixed/Avatar";
import Link from "next/link";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	connection: ConnectionPayload;
	connectionProps: ConnectionState;
	setConnectionProps: Dispatch<SetStateAction<ConnectionState>>;
	index: number;
	handleDeleteConnection: () => void;
	loading: boolean;
}

export default function ConnectionCard({
	connection,
	connectionProps,
	setConnectionProps,
	index,
	handleDeleteConnection,
	loading,
}: Props) {
	const l = useLanguage();

	return (
		<AnimatePresence key={index}>
			{connectionProps.removing !== connection.name ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ delay: index * 0.1, duration: 0.09 }}
					onMouseEnter={() =>
						setConnectionProps({ ...connectionProps, hover: connection.name })
					}
					onMouseLeave={() =>
						setConnectionProps({ ...connectionProps, hover: null })
					}
					className="w-full relative"
				>
					<DeleteConnection
						loading={loading}
						handleRemove={handleDeleteConnection}
						open={connectionProps.hover === connection.name}
						id={connection.name}
					/>
					<Link
						href={`/dashboard/connection/${connection.name}`}
						className={`flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 
							transition relative w-full h-full ${"promotingSince" in connection ? "border-2 border-rose-600" : ""}`}
					>
						{"promotingSince" in connection && (
							<div className="absolute px-2 font-semibold -top-2 text-sm flex rounded-full bg-rose-600 right-3">
								{l.connection.promoted}
							</div>
						)}
						<Avatar
							className="w-12 h-12"
							src={connection.icon || ""}
							key={connection.name}
						/>
						<div className="flex flex-col text-start">
							<span className="font-bold text-lg">{connection.name}</span>
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
			) : null}
		</AnimatePresence>
	);
}
