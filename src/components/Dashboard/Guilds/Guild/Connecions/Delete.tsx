import { useLanguage } from "../../../../../hooks/useLanguage";
import type { ConnectedConnectionPayload } from "../../../../../types";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { AiOutlineDisconnect } from "react-icons/ai";
import { LuTrash } from "react-icons/lu";

interface Props {
	connection: ConnectedConnectionPayload;
	onRemove: () => void;
}

export const DeleteConnectedConnection = ({ connection, onRemove }: Props) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const l = useLanguage();

	const handleDelete = async () => {
		onRemove();
		onClose();
	};

	return (
		<>
			<button onClick={onOpen} className="hover:text-red-500 transition">
				<LuTrash size={18} />
			</button>
			<Modal
				classNames={{
					closeButton: "transition hover:bg-neutral-700",
					wrapper: "overflow-y-hidden",
					base: "max-h-screen overflow-y-auto",
				}}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent className="bg-neutral-800 text-white">
					<ModalHeader className="pb-1 font-bold">
						<span>{l.dashboard.guilds.connections.disconnect.title}</span>
					</ModalHeader>
					<ModalBody className="flex gap-2">
						<div>
							{l.dashboard.guilds.connections.disconnect.disconnectConfirm}{" "}
							<strong>{connection.name}</strong>?
						</div>
					</ModalBody>
					<ModalFooter
						className="flex w-full justify-end border-t rounded-t-xl
                    border-neutral-700 mt-2"
					>
						<button
							onClick={onClose}
							className="rounded-lg bg-neutral-700 transition hover:bg-neutral-700/50 
                            p-2 px-3"
						>
							{l.dashboard.misc.cancel}
						</button>
						<button
							onClick={handleDelete}
							className="flex gap-2 font-semibold items-center text-center 
                            bg-red-500 transition hover:bg-red-600 p-2 px-3 rounded-lg"
						>
							<AiOutlineDisconnect className="mb-0.5" size={18} />
							<span className="text-center">
								{l.dashboard.guilds.connections.disconnect.disconnect}
							</span>
						</button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
