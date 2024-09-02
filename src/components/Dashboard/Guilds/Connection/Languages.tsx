import { FaX } from "react-icons/fa6";
import DefaultInput from "../../../../components/Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";
import { type ConnectionBody, Languages } from "../../../../types";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { type ChangeEvent, type Dispatch, useState } from "react";

interface Props {
	setBody: Dispatch<ConnectionBody>;
	body: ConnectionBody;
}

export default function JoinConnectionLanguage({ setBody, body }: Props) {
	const [query, setQuery] = useState("");
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const l = useLanguage();

	const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleChangeLanguage = (key: keyof typeof Languages) => {
		setBody({ ...body, language: { language: Languages[key], key } });
		onClose();
	};

	const languages = Object.entries(Languages);

	return (
		<div className="flex flex-col gap-2 w-full h-full">
			<div className="text-neutral-300 flex gap-1">
				<div>{l.dashboard.guilds.connections.languageTitle}</div>
			</div>
			<div className="flex gap-1 items-center h-full">
				<button
					onClick={onOpen}
					className="p-3 bg-neutral-900/50 transition rounded-lg text-start w-full"
				>
					{body.language?.key === "" && body.language?.language === "" ? (
						l.dashboard.guilds.connections.languageclick
					) : (
						<div className="w-full flex gap-2 items-center">
							<span>{body.language?.language}</span>
						</div>
					)}
				</button>
				{body.language?.key !== "" && (
					<button
						className="px-3 bg-neutral-900/50 transition rounded-lg hover:bg-neutral-900
				min-h-12"
						onClick={() =>
							setBody({
								...body,
								language: { language: "", key: "" },
							})
						}
					>
						<FaX />
					</button>
				)}
			</div>
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
					<ModalHeader className="flex flex-col gap-1 bg-neutral-800">
						{l.dashboard.guilds.connections.language}
					</ModalHeader>
					<ModalBody>
						<DefaultInput
							value={query}
							placeholder="english"
							type="text"
							obrigatory
							label={l.dashboard.guilds.connections.searchForLanguage}
							onChange={handleChangeQuery}
						/>
						<div className="bg-neutral-800 w-full h-full flex flex-col gap-2 max-h-64 overflow-y-auto items-start">
							{languages
								.filter(
									([key, language]) =>
										key.toLowerCase().includes(query.toLowerCase()) ||
										language.toLowerCase().includes(query.toLowerCase()),
								)
								.map(([key, language]) => (
									<button
										className="flex items-center gap-2 p-3 transition hover:bg-neutral-700 w-full rounded-lg text-start"
										key={key}
										onClick={() =>
											handleChangeLanguage(key as keyof typeof Languages)
										}
									>
										<span>{language}</span>
									</button>
								))}
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}
