import { useEffect, useState } from "react";
import type { ConnectionPayload, TeamPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import DefaultInput from "../../../Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";
import Avatar from "../../../Mixed/Avatar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
	team: TeamPayload;
	onClose: () => void;
	teamID: string;
	setTeam: (team: TeamPayload) => void;
}

export default function AddTeamConnection({
	team,
	onClose,
	teamID,
	setTeam,
}: Props) {
	const l = useLanguage();
	const [loading, setLoading] = useState({
		state: false,
		check: false,
		loader: "",
	});
	const [errors, setErrors] = useState<string[]>([]);

	const [connections, setConnections] = useState<ConnectionPayload[]>();
	const [query, setQuery] = useState("");

	useEffect(() => {
		const fetchConnections = async () => {
			const { data } = await api.get("/users/@me/connections");

			setConnections(data);
		};

		fetchConnections();
	}, []);

	const handlAddConnection = (connection: ConnectionPayload) => async () => {
		setLoading({
			loader: connection.name,
			state: true,
			check: false,
		});

		if (team.children.length === 5) {
			setErrors([...errors, "maxconnections"]);

			return setLoading({
				...loading,
				state: false,
			});
		}

		try {
			const {
				data: { name, icon, description },
			} = await api.put(`/teams/${teamID}/connections/${connection.name}`);

			setLoading({
				loader: connection.name,
				state: false,
				check: true,
			});

			setErrors([]);
			setTeam({
				...team,
				children: [...team.children, { name, description, icon }],
			});

			setTimeout(() => {
				setLoading({
					loader: "",
					state: false,
					check: false,
				});

				setConnections(connections?.filter((c) => c.name !== connection.name));
			}, 500);
		} catch (error: any) {
			const { code } = error.response.data;

			setLoading({
				...loading,
				state: false,
			});

			if (code === 9007) {
				return setErrors([...errors, "alreadymember"]);
			}
		}
	};

	const filteredConnections = connections?.filter(
		(connection) =>
			!connection.teamId &&
			(connection.name.toLowerCase().includes(query.toLowerCase()) ||
				connection.name.includes(query) ||
				connection.description?.toLowerCase().includes(query.toLowerCase()) ||
				connection.creatorId?.includes(query)),
	);

	return (
		<ModalContent className="bg-neutral-800 text-white">
			<ModalHeader className="pb-1 flex flex-col gap-1">
				<h2>{l.dashboard.teams.connections.modal.title}</h2>
				<span className="text-neutral-300 font-normal">
					{l.dashboard.teams.connections.modal.description}
				</span>
			</ModalHeader>
			<ModalBody className="mb-2">
				<DefaultInput
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={l.dashboard.misc.filterConnections}
					type="text"
				/>
				<div className="flex flex-col gap-2">
					{filteredConnections ? (
						filteredConnections.length === 0 ? (
							<div className="h-32 flex items-center justify-center">
								<span className="font-semibold">
									{l.dashboard.teams.connections.noConnectionsFound}
								</span>
							</div>
						) : (
							filteredConnections.map((connection) => (
								<button
									disabled={(loading.state || loading.check)}
									onClick={handlAddConnection(connection)}
									key={connection.name}
									className="flex gap-2 items-center p-2 rounded-lg hover:bg-neutral-900 
									bg-neutral-900/50 transition disabled:hover:bg-neutral-900/50"
								>
									<div className="min-w-12 h-12">
										<Avatar
											className="w-12 h-12"
											src={connection.icon || ""}
											key={connection.name}
										/>
									</div>
									<div className="flex flex-col text-start flex-grow">
										<span className="font-bold text-lg">{connection.name}</span>
										{connection.description && (
											<span className="text-neutral-300 text-sm">
												{connection.description.length > 30
													? connection.description.slice(0, 30) + "..."
													: connection.description}
											</span>
										)}
									</div>
									{loading.state && loading.loader === connection.name && (
										<AiOutlineLoading3Quarters
											className="animate-spin"
											size={16}
										/>
									)}
									{loading.check && loading.loader === connection.name && (
										<FaCheckCircle className="text-green-500" size={16} />
									)}
								</button>
							))
						)
					) : (
						Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className="bg-neutral-900/50 p-3 rounded-lg flex flex-col gap-2 w-full"
							>
								{Array.from({ length: 2 }).map((_, index) => (
									<div
										key={index}
										className="w-full h-6 bg-neutral-700 animate-pulse rounded-full"
									></div>
								))}
								<div className="text-neutral-300">
									{new Date(Date.now()).toLocaleString(l.language)}
								</div>
							</div>
						))
					)}
				</div>
				{errors.includes("maxconnections") ? (
					<div className="text-red-500">{l.errors.teamMaxConnections}</div>
				) : null}
			</ModalBody>
		</ModalContent>
	);
}
