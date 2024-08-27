import { useState } from "react";
import type { TeamPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import DefaultInput from "../../../Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
	team: TeamPayload;
	onClose: () => void;
	teamID: string;
}

export default function InviteMember({ team, onClose, teamID }: Props) {
	const [id, setId] = useState("");
	const l = useLanguage();
	const [submited, setSubmited] = useState(false);
	const [loading, setLoading] = useState({
		state: false,
		check: false,
	});
	const [errors, setErrors] = useState<string[]>([]);

	const sendInvite = async () => {
		setLoading({
			state: true,
			check: false,
		});

		if (id.trim() === "") {
			setLoading({
				...loading,
				state: false,
			});

			return setErrors([...errors, "id"]);
		}

		if (team.members.some((member) => member.id === id)) {
			setErrors([...errors, "alreadymember"]);

			return setLoading({
				...loading,
				state: false,
			});
		}

		if (team.members.length === 3) {
			setErrors([...errors, "maxmembers"]);

			return setLoading({
				...loading,
				state: false,
			});
		}

		try {
			await api.put(`/teams/${teamID}/members?member=${id}`);

			setLoading({
				state: false,
				check: true,
			});

			setErrors([]);

			setSubmited(true);

			setTimeout(() => {
				setLoading({
					state: false,
					check: false,
				});
			}, 2000);
		} catch {
			setLoading({
				...loading,
				state: false,
			});
			setErrors([...errors, "id"]);
		}
	};

	return (
		<ModalContent className="bg-neutral-800 text-white">
			<ModalHeader className="pb-1">
				{l.dashboard.teams.members.invite.title}
			</ModalHeader>
			<ModalBody>
				<DefaultInput
					onChange={(event) => setId(event.target.value)}
					placeholder={l.dashboard.teams.members.invite.placeholder}
					type="text"
					label={l.dashboard.teams.members.invite.memberId}
					error={errors.includes("id")}
				/>
				{errors.includes("alreadymember") && (
					<span className="text-red-500">
						{l.dashboard.teams.members.invite.alreadyMember}
					</span>
				)}
				{errors.includes("maxmembers") && (
					<span className="text-red-500">
						{l.dashboard.teams.members.invite.maxMembers}
					</span>
				)}
				{submited && (
					<span className="text-green-500">
						{l.dashboard.teams.members.invite.success}
					</span>
				)}
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
					onClick={sendInvite}
					disabled={loading.state}
					className="flex gap-2 font-semibold items-center text-center bg-green-500 
                    transition hover:bg-green-600 p-2 px-3 rounded-lg disabled:hover:bg-green-500"
				>
					<span>{l.dashboard.teams.members.invite.sendInvite}</span>
					{loading.state && (
						<AiOutlineLoading3Quarters className="animate-spin" size={20} />
					)}
					{loading.check && (
						<FaCheckCircle className="text-white-500" size={20} />
					)}
				</button>
			</ModalFooter>
		</ModalContent>
	);
}
