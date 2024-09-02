import { Input } from "@nextui-org/input";
import {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";
import type { ConnectionPayload } from "../../../types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import CreateConnectionForm from "./Connection/FormCreateConnection";
import { api } from "../../../utils/api";
import ConnectionCard from "./Connection/Card";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useLanguage } from "../../../hooks/useLanguage";
import DefaultButton from "../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";
import { useDisclosure } from "@nextui-org/modal";

interface Props {
	connections: ConnectionPayload[] | null;
	setConnections: Dispatch<SetStateAction<ConnectionPayload[] | null>>;
}

export interface ConnectionState {
	connection: ConnectionPayload | null;
	hover: string | null;
	removing: string | null;
}

export default function ConnectionsComponent({
	connections,
	setConnections,
}: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const l = useLanguage();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);
	const [connectionProps, setConnectionProps] = useState<ConnectionState>({
		connection: null!,
		hover: null,
		removing: null,
	});

	const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleDeleteConnection = async () => {
		setLoading(true);

		await api.delete(`/connections/${connectionProps.hover}`);

		setLoading(false);

		setConnections(
			connections!.filter(
				(connection) => connection.name !== connectionProps.hover,
			),
		);
	};

	const filter = (connection: ConnectionPayload) => {
		const advancedQuery = searchQuery.toLowerCase();

		return (
			connection.name.toLowerCase().includes(advancedQuery) ||
			connection.description?.toLowerCase().includes(advancedQuery) ||
			connection.creatorId?.includes(searchQuery)
		);
	};

	return (
		<>
			<Head>
				<title>{l.dashboard.connections.title}</title>
			</Head>
			<div className="flex w-full items-start flex-col gap-4 tablet:px-3">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-3xl">
						{l.dashboard.connections.title}
					</h1>
					<span className="text-neutral-300">
						{l.dashboard.connections.description}
					</span>
				</div>
				<div className="flex w-full h-full gap-1">
					<Input
						classNames={{
							inputWrapper:
								"rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
						}}
						onChange={handleChangeQuery}
						type="string"
						label={l.dashboard.misc.filterConnections}
					/>
					<DefaultButton onClick={onOpen} divclass="w-fit" className="w-[52px]">
						<LuPlusCircle size={20} />
					</DefaultButton>
				</div>
				{connections ? (
					connections.filter(filter).length === 0 ? (
						<div className="flex w-full items-center justify-center">
							<div className="min-h-[30vh] text-lg items-center font-bold justify-center flex text-center">
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
								{connections.filter(filter).map((connection, index) => (
									<ConnectionCard
										loading={loading}
										handleDeleteConnection={handleDeleteConnection}
										key={index}
										connection={connection}
										connectionProps={connectionProps}
										setConnectionProps={setConnectionProps}
										index={index}
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
				{connections && (
					<CreateConnectionForm
						setConnections={
							setConnections as Dispatch<SetStateAction<ConnectionPayload[]>>
						}
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						onClose={onClose}
						connections={connections}
					/>
				)}
			</div>
		</>
	);
}
