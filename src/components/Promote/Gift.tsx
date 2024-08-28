import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import DefaultInput from "../Mixed/Input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import DefaultButton from "../Mixed/Button";
import { useLanguage } from "../../hooks/useLanguage";
import { useState } from "react";
import { api } from "../../utils/api";
import { LuGift } from "react-icons/lu";

export default function PromotedGiftModal({
	onClose,
}: { onClose: () => void }) {
	const [id, setId] = useState("");
	const [code, setCode] = useState("");
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

		if (code.trim() === "") {
			setLoading({
				...loading,
				state: false,
			});

			return setErrors([...errors, "code"]);
		}

		try {
			await api.put(`/codes/${code}/gift/${id}`);

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
		} catch (error: any) {
			setLoading({
				...loading,
				state: false,
			});

			setErrors(["id", "code"]);
		}
	};

	return (
		<ModalContent className="bg-neutral-800 text-white">
			<ModalHeader className="pb-1">{l.promote.gift.title}</ModalHeader>
			<ModalBody>
				<DefaultInput
					onChange={(event) => {
						setId(event.target.value);
						setErrors([]);
					}}
					placeholder={l.promote.gift.inputs.idplaceholder}
					type="text"
					value={id}
					label={l.promote.gift.inputs.id}
					error={errors.includes("id")}
				/>
				<DefaultInput
					onChange={(event) => {
						setCode(event.target.value);
						setErrors([]);
					}}
					placeholder={l.promote.gift.inputs.codeplaceholder}
					type="text"
					value={code}
					label={l.promote.gift.inputs.code}
					error={errors.includes("code")}
				/>
				{submited && (
					<span className="text-green-500">{l.promote.gift.codeInvited}</span>
				)}
				{errors.length > 0 ? (
					<div className="text-red-500">{l.errors.wrongGift}</div>
				) : null}
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
				<DefaultButton
					pink
					onClick={sendInvite}
					disabled={loading.state}
					divclass="w-fit"
					className="p-3"
				>
					{loading.state && (
						<AiOutlineLoading3Quarters className="animate-spin" size={20} />
					)}
					{loading.check && (
						<FaCheckCircle className="text-white-500" size={20} />
					)}
					{!loading.check && !loading.state && <LuGift />}
					<span>{l.promote.gift.inputs.button}</span>
				</DefaultButton>
			</ModalFooter>
		</ModalContent>
	);
}
