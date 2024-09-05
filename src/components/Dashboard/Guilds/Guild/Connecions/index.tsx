import { useState } from "react";
import type {
	ConnectedConnectionPayload,
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
import DefaultButton from "../../../../Mixed/Button";
import { Input } from "@nextui-org/input";
import { AnimatePresence } from "framer-motion";

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
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [connectionProps, setConnectionProps] =
		useState<ConnectedConnectionsState>({
			hover: null,
			removing: null,
		});

	const handleRemoveConnection = async (connectionName: string) => {
		setConnectionProps({ ...connectionProps, removing: connectionName });

		setLoading(true);

		await api.delete(`/guilds/${guild.id}/connections/${connectionName}`);

		setLoading(false);

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

	const filter = (connection: ConnectedConnectionPayload) => {
		const advancedQuery = searchQuery.toLowerCase();

		return (
			connection.name.toLowerCase().includes(advancedQuery) ||
			connection.description?.toLowerCase().includes(advancedQuery)
		);
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
			<div className="flex w-full h-full gap-1">
				<input
					className="bg-neutral-900/50 w-full rounded-lg p-3 outline-none"
					onChange={(e) => setSearchQuery(e.target.value)}
					type="string"
					placeholder={l.dashboard.misc.filterConnections}
				/>
				<DefaultButton onClick={onOpen} divclass="w-fit" className="w-[52px]">
					<LuPlusCircle size={20} />
				</DefaultButton>
			</div>
			{guild.connections ? (
				guild.connections.filter(filter).length === 0 ? (
					<div className="flex w-full items-center justify-center">
						<div className="min-h-[20vh] text-lg items-center font-bold justify-center flex text-center">
							{searchQuery === "" ? (
								<div className="flex flex-col">
									<div>{l.dashboard.connections.noConnections}</div>
									<div className="text-sm text-neutral-300 font-normal flex gap-1">
										<p>{l.dashboard.connections.noConnectionsDescription}</p>
										<span className="font-semibold">+</span>
									</div>
								</div>
							) : (
								l.dashboard.connections.noConnectionsFound
							)}
						</div>
					</div>
				) : (
					<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
						<AnimatePresence>
							{guild.connections.filter(filter).map((connection) => (
								<ConnectedConnnectionCard
									loading={loading}
									connection={connection}
									guild={guild}
									handleRemoveConnection={handleRemoveConnection}
									setConnectionProps={setConnectionProps}
									connectionProps={connectionProps}
									key={connection.name}
								/>
							))}
						</AnimatePresence>
					</div>
				)
			) : (
				<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
					<ConnectionsSkeleton />
				</div>
			)}
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
						{l.dashboard.connections.connectToConnection}
					</ModalHeader>
					<ModalBody className="mb-2">
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
	);
}
