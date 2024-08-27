import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import type { ConnectionBody, GuildPayload } from "../../../types";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Avatar from "../../Mixed/Avatar";
import { useState } from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import ConnectionsPageChannels from "../../Connection/Options";

interface Props {
	isOpen: boolean;
	code: {
		name: string;
		code: string;
	};
	onOpenChange: (open: boolean) => void;
	guilds: GuildPayload[];
}

export default function JoinPrivateConnectionModal({
	isOpen,
	onOpenChange,
	code: { name, code },
	guilds,
}: Props) {
	const l = useLanguage();
	const [guild, setGuild] = useState<GuildPayload>();
	const [body, setBody] = useState<ConnectionBody>({
		channel: {
			id: "",
			name: "",
			position: 0,
			nsfw: false,
			parent_id: "",
		},
		name,
		hashInvite: code,
		language: {
			language: "",
			key: "",
		},
	});

	return (
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
					{l.connection.joinPrivateConnection} {name}
				</ModalHeader>
				<ModalBody className="mb-2">
					<div className="flex w-full flex-col gap-4">
						<div className="flex flex-col gap-1 w-full">
							<span className="text-neutral-300 flex gap-1">
								{l.connection.connectionServer}
							</span>
							{guilds ? (
								<Dropdown className="bg-neutral-800 text-white w-full max-h-56 overflow-x-auto">
									<DropdownTrigger>
										<button className="w-full rounded-lg bg-neutral-900/50 p-3 text-start">
											{guild ? (
												<div className="flex items-center gap-2">
													<Avatar
														className="w-8 h-8"
														src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
													/>
													<span className="font-bold">{guild.name}</span>
												</div>
											) : (
												l.connection.connectionServerPlaceholder
											)}
										</button>
									</DropdownTrigger>
									<DropdownMenu
										className="w-full flex flex-col gap-1"
										aria-label="guilds"
									>
										{guilds
											.filter(
												(guild) =>
													!guild.connections.map((c) => c.name).includes(name),
											)
											.map((guild) => (
												<DropdownItem
													aria-label={guild.name}
													classNames={{
														title: "flex items-center gap-1",
													}}
													className="hover:bg-neutral-900 transition p-3 w-full bg-neutral-800"
													key={guild.id}
													onClick={() => setGuild(guild)}
												>
													<div className="flex items-center gap-2">
														<Avatar
															className="w-8 h-8"
															src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
														/>
														<span className="font-bold">{guild.name}</span>
													</div>
												</DropdownItem>
											))}
									</DropdownMenu>
								</Dropdown>
							) : (
								<div className="w-full rounded-lg bg-neutral-900/50 p-6"></div>
							)}
						</div>
						{guild && (
							<ConnectionsPageChannels
								setBody={setBody}
								body={body}
								guild={guild}
							/>
						)}
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
