import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";
import CreateConnection from "./CreateConnection";
import type { ConnectionPayload, RequestPost } from "../../../../types";
import DefaultInput from "../../../../components/Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	connections: ConnectionPayload[];
	setConnections: Dispatch<SetStateAction<ConnectionPayload[]>>;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onClose: () => void;
}

export default function CreateConnectionForm({
	connections,
	setConnections,
	isOpen,
	onOpenChange,
	onClose,
}: Props) {
	const l = useLanguage();
	const [post, setPost] = useState<RequestPost>({
		name: null!,
	});
	const [errors, setErrors] = useState<string[]>([]);

	const setPostValues = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		key: string,
	) => {
		setPost({
			...post,
			[key]: event.target.value,
		});

		setErrors([]);
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
					<ModalHeader className="flex flex-col gap-1 bg-neutral-800">
						{l.dashboard.connections.addConnection}
					</ModalHeader>
					<ModalBody>
						<DefaultInput
							obrigatory
							maxChars={15}
							minChars={1}
							error={errors.includes("name")}
							value={post.name}
							label={l.dashboard.connections.connection.form.name}
							type="text"
							placeholder={
								l.dashboard.connections.connection.form.placeholders.name
							}
							onChange={(e) => setPostValues(e, "name")}
						/>
						<DefaultInput
							maxChars={50}
							minChars={20}
							error={errors.includes("description")}
							value={post.description}
							label={l.dashboard.connections.connection.form.description}
							type="text"
							placeholder={
								l.dashboard.connections.connection.form.placeholders.description
							}
							onChange={(e) => setPostValues(e, "description")}
						/>
						<DefaultInput
							label={l.dashboard.connections.connection.form.icon}
							type="text"
							error={errors.includes("icon")}
							placeholder="https://i.imgur.com/EXQVxqQ.png"
							onChange={(e) => setPostValues(e, "icon")}
						/>
						<DefaultInput
							label={l.dashboard.connections.connection.form.maxConnections}
							type="number"
							placeholder="5"
							onChange={(e) => setPostValues(e, "maxConnections")}
						/>
						{errors.length > 0 ? (
							<div className="text-red-500">
								{errors.includes("name") && l.errors.wrongConName}
								{errors.includes("description") && l.errors.wrongDesc}
								{errors.includes("icon") && l.errors.wrongIcon}
								{errors.includes("maxConnections") && l.errors.maxConnections}
								{errors.includes("alreadyExists") && l.errors.alreadyExists}
								{errors.includes("invalidConnectionName") &&
									l.errors.invalidConnectionName}
							</div>
						) : null}
					</ModalBody>
					<ModalFooter className="w-full">
						<CreateConnection
							setConnections={setConnections}
							connections={connections}
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
