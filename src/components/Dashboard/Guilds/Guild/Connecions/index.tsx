import { useState } from "react";
import type {
	ConnectedConnectionsState,
	GuildChannelsPayload,
	GuildPayload,
	Premium,
} from "../../../../../types";
import ConnectionsSkeleton from "../../../ConnectionsSkeleton";
import { LuPlusCircle } from "react-icons/lu";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import GuildConnectConnection from "../../Connection/Connect";
import ConnectedConnnectionCard from "./Card";
import { api } from "../../../../../utils/api";
import { useLanguage } from "../../../../../hooks/useLanguage";

interface Props {
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	channels: GuildChannelsPayload[];
	premium: Premium;
}

export default function Connections({
	guild,
	setGuild,
	channels,
	premium,
}: Props) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const l = useLanguage();
	const [connectionProps, setConnectionProps] =
		useState<ConnectedConnectionsState>({
			hover: null,
			removing: null,
		});

	const handleRemoveConnection = async (connectionName: string) => {
		setConnectionProps({ ...connectionProps, removing: connectionName });

		await api.delete(`/guilds/${guild.id}/connections/${connectionName}`);

		setTimeout(() => {
			setGuild({
				...guild,
				connections: guild.connections.filter(
					(connection) => connection.name !== connectionName,
				),
			});

			setConnectionProps({ ...connectionProps, removing: null });
		}, 500);
	};

	return (
		<div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
			<div className="flex flex-col">
				<div className="flex gap-1 items-end">
					<h1 className="font-semibold text-xl">
						{l.dashboard.connections.title}
					</h1>
					<div className="text-neutral-300">
						{guild.connections.length}/<span>{premium.maxConnections}</span>
					</div>
				</div>
				<span className="text-neutral-300">
					{l.dashboard.connections.description}
				</span>
			</div>
			<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
				{guild.connections ? (
					guild.connections.map((connection) => (
						<ConnectedConnnectionCard
							connection={connection}
							guild={guild}
							handleRemoveConnection={handleRemoveConnection}
							setConnectionProps={setConnectionProps}
							connectionProps={connectionProps}
							key={connection.name}
						/>
					))
				) : (
					<ConnectionsSkeleton />
				)}
				<div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
					<button
						onClick={onOpen}
						className="flex items-center justify-center gap-2 p-5 h-full w-full 
                        rounded-lg bg-neutral-800 hover:bg-transparent transition"
					>
						<LuPlusCircle size={26} />
						<span>{l.dashboard.connections.addConnection}</span>
					</button>
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
							{l.dashboard.connections.connectToConnection}
						</ModalHeader>
						<ModalBody>
							<GuildConnectConnection
								premium={premium}
								setGuild={setGuild}
								onClose={onClose}
								channels={channels}
								guild={guild}
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
}
