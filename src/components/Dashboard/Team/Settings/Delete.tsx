import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/router";
import { useLanguage } from "../../../../hooks/useLanguage";
import { api } from "../../../../utils/api";
import type { TeamPayload } from "../../../../types";

export default function DeleteTeam({
	team,
	teamID,
}: { team: TeamPayload; teamID: string }) {
	const l = useLanguage();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { push } = useRouter();

	const handleDeleteConnection = async () => {
		await api.delete(`/teams/${teamID}`);

		onClose();
		push("/dashboard");
	};

	return (
		<div className="w-full p-3 border-2 border-red-500 rounded-lg flex-col gap-3 flex">
			<div className="flex flex-col gap-1">
				<span className="font-bold text-xl">
					{l.dashboard.teams.settings.delete.title}
				</span>
				<p className="text-neutral-300">
					{l.dashboard.teams.settings.delete.descriptionpage}
				</p>
			</div>
			<button
				onClick={onOpen}
				className="transition bg-red-500 rounded-lg hover:bg-red-600 flex gap-2 
                p-3 items-center max-w-32 justify-center"
			>
				<LuTrash size={18} />
				<span>{l.dashboard.connections.delete.button}</span>
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
						<span>{l.dashboard.teams.settings.delete.title}</span>
					</ModalHeader>
					<ModalBody className="flex gap-2">
						<div>
							{l.dashboard.teams.settings.delete.description}{" "}
							<strong>{team.name}</strong>?
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
							onClick={handleDeleteConnection}
							className="flex gap-2 font-semibold items-center text-center 
                            bg-red-500 transition hover:bg-red-600 p-2 px-3 rounded-lg"
						>
							<LuTrash className="mb-0.5" size={18} />
							<span className="text-center">
								{l.dashboard.connections.delete.button}
							</span>
						</button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}
