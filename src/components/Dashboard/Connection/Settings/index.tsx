import { motion } from "framer-motion";
import type { ConnectionPayload } from "../../../../types";
import DeleteConnectionPage from "./Delete";
import JoinPrivateConnectionModal from "../JoinPrivateConnection";
import ConnectionPrivateInvite from "./Invite";
import { useLanguage } from "../../../../hooks/useLanguage";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

interface Props {
	connection: ConnectionPayload;
	setConnection: (connection: ConnectionPayload) => void;
	editedConnection: Partial<ConnectionPayload>;
	setEditedConnection: (editedConnection: Partial<ConnectionPayload>) => void;
}

export default function DashboardConnectionSettings({
	connection,
	setConnection,
	editedConnection,
	setEditedConnection,
}: Props) {
	const l = useLanguage();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-5"
		>
			<div>
				<h1 className="font-bold text-xl">
					{l.dashboard.connections.settings.title}
				</h1>
				<span className="text-neutral-300">
					{l.dashboard.connections.settings.description}
				</span>
			</div>
			<div className="flex flex-col">
				<h1
					className="mobile:text-4xl text-3xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-pink-600 to-rose-700"
				>
					Promoted
				</h1>
				<span>{l.dashboard.connections.settings.promoted}</span>
				<Link
					className="p-3 rounded-lg bg-neutral-900/50 transition hover:bg-neutral-900 w-fit
                    flex gap-2 items-center mt-2"
					href="/subscriptions"
				>
					<span>{l.dashboard.connections.settings.subscriptions}</span>
					<LuExternalLink />
				</Link>
			</div>
			<ConnectionPrivateInvite
				connection={connection}
				editedConnection={editedConnection}
				setEditedConnection={setEditedConnection}
				setConnection={setConnection}
			/>
			<DeleteConnectionPage id={connection.name} />
		</motion.div>
	);
}
