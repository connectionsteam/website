import { AnimatePresence, motion } from "framer-motion";
import type { ConnectedConnectionPayload } from "../../../../../types";
import { DeleteConnectedConnection } from "./Delete";

interface Props {
	connection: ConnectedConnectionPayload;
	open: boolean;
	onRemove: () => void;
	loading: boolean;
}

export default function FloatingMenu({ connection, open, onRemove, loading }: Props) {
	return (
		<AnimatePresence key={connection.name}>
			{open ? (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="absolute top-0 right-0 z-50"
				>
					<div className="bg-neutral-800 p-2 rounded-lg">
						<div className="flex items-center gap-2">
							<DeleteConnectedConnection
								loading={loading}
								onRemove={onRemove}
								connection={connection}
							/>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
