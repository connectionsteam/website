import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { type ChangeEvent, type Dispatch, type SetStateAction, useState } from "react";
import type { RequestPost, TeamPayload } from "../../../../types";
import DefaultInput from "../../../../components/Mixed/Input";
import CreateTeam from "./Create";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	teams: TeamPayload[];
	setTeams: Dispatch<SetStateAction<TeamPayload[]>>;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onClose: () => void;
}

export default function CreateTeamForm({
	teams,
	setTeams,
	isOpen,
	onOpenChange,
	onClose,
}: Props) {
	const l = useLanguage();
	const [post, setPost] = useState<RequestPost>({
		name: "",
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const setPostValues = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		key: string,
	) => {
		setPost({
			...post,
			[key]: event.target.value,
		});
		setErrors({
			...errors,
			[key]: "",
		});
	};

	return (
		<>
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
					<ModalHeader className="flex flex-col gap-1 bg-neutral-800 pb-1">
						{l.dashboard.teams.createTeam}
					</ModalHeader>
					<ModalBody>
						<DefaultInput
							obrigatory
							maxChars={20}
							minChars={3}
							value={post.name}
							label={l.dashboard.teams.team.form.name}
							type="text"
							error={errors.name === "name"}
							placeholder={l.dashboard.teams.team.form.placeholder}
							onChange={(e) => setPostValues(e, "name")}
						/>
						<DefaultInput
							label={l.dashboard.teams.team.form.icon}
							type="text"
							error={errors.avatar === "avatar"}
							placeholder="https://i.imgur.com/EXQVxqQ.png"
							onChange={(e) => setPostValues(e, "icon")}
						/>
						{errors.api && <div className="text-red-500">{errors.api}</div>}
					</ModalBody>
					<ModalFooter className="w-full">
						<CreateTeam
							setTeams={setTeams}
							teams={teams}
							errors={errors}
							post={post}
							setErrors={setErrors}
							onClose={onClose}
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
