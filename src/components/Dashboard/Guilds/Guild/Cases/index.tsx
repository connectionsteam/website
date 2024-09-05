import type {
	AnyCase,
	GuildPayload,
	ModsFiltersStructure,
} from "../../../../../types";
import CaseCard from "./Card";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { useEffect, useState } from "react";
import { api } from "../../../../../utils/api";
import { IoFilter } from "react-icons/io5";
import { Modal, useDisclosure } from "@nextui-org/modal";
import ModsFilters from "./Filters";
import DeskModsFilters from "./DeskFilters";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DISCOR_ID_PATTERN } from "../Mods/Modal";

interface Props {
	guild: GuildPayload;
}

export default function Cases({ guild }: Props) {
	const l = useLanguage();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [guildCases, setGuildCases] = useState<AnyCase[] | null>(null);
	const [cases, setCases] = useState<AnyCase[]>([]);
	const [loading, setLoading] = useState<string | null>(null);
	const [user, setUser] = useState<string | null>(null);
	const [error, setError] = useState(false);
	const [filters, setFilters] = useState<ModsFiltersStructure>({
		mod_id: null,
		type: null,
		target_id: null,
		connection: null,
	});

	const fetchCase = async (caseId: string) => {
		if (cases.find((c) => c.id === caseId)) return;

		setLoading(caseId);

		const { data } = await api.get(`/guilds/${guild.id}/cases/${caseId}`);

		setCases((prevCases) => [
			...prevCases.filter((caseItem) => caseItem.id !== caseId),
			data,
		]);

		setLoading(null);
	};

	const submitUser = (user: string) => {
		if (!new RegExp(DISCOR_ID_PATTERN).test(user)) return setError(true);

		setFilters({ ...filters, target_id: user });
	};

	useEffect(() => {
		const fetchCases = async () => {
			const query = new URLSearchParams();

			if (filters.mod_id !== null) query.append("moderator_id", filters.mod_id);
			if (user !== null)
				query.append("target_id", user);
			if (filters.type !== null) query.append("type", filters.type.toString());
			if (filters.connection !== null)
				query.append("connection", filters.connection);

			const { data } = await api.get(
				`/guilds/${guild.id}/cases?${query.toString()}`,
			);

			setGuildCases(data);
		};

		fetchCases();
	}, [filters]);

	return (
		<div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
			<div className="flex items-start gap-4">
				<div className="flex flex-col w-4/6 tablet:w-full">
					<div className="flex items-end">
						<div className="flex flex-grow flex-col">
							<h1 className="font-bold text-xl">
								{l.dashboard.guilds.cases.title}
							</h1>
							<span className="text-neutral-300 mb-4">
								{l.dashboard.guilds.cases.description}
							</span>
						</div>
						<button
							onClick={onOpen}
							className="p-2 transition hover:bg-neutral-900 bg-neutral-900/50 rounded-lg relative h-9 mb-2 tabletdesk:hidden"
						>
							{(filters.mod_id ||
								user ||
								filters.type === 0 ||
								filters.type === 1 ||
								filters.connection) && (
								<div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
							)}
							<IoFilter size={20} />
						</button>
						<Modal
							classNames={{
								closeButton: "transition hover:bg-neutral-700",
								wrapper: "overflow-y-hidden",
								base: "max-h-screen overflow-y-auto",
							}}
							isOpen={isOpen}
							onOpenChange={onOpenChange}
						>
							<ModsFilters
								filters={filters}
								setFilters={setFilters}
								guild={guild}
							/>
						</Modal>
					</div>
					<div className="w-full flex flex-col gap-4 h-full">
						<div className="flex flex-col gap-4 h-full">
							{!guildCases ? (
								<div className="flex flex-col items-center justify-center min-h-[400px]">
									<AiOutlineLoading3Quarters
										className="animate-spin"
										size={30}
									/>
								</div>
							) : guildCases.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4">
									<span className="text-xl font-semibold text-center">
										{l.dashboard.guilds.cases.noCases}
									</span>
									<span className="text-sm text-neutral-400 text-center">
										{l.dashboard.guilds.cases.nocasesbruh}
									</span>
								</div>
							) : (
								guildCases.map((caseItem, index) => {
									const caseDetail = cases?.find((c) => c.id === caseItem.id);

									return (
										<div
											onClick={() => fetchCase(caseItem.id)}
											key={caseItem.id}
										>
											<CaseCard
												key={index}
												loading={loading === caseItem.id}
												caseItem={caseDetail || caseItem}
											/>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
				<div className="flex px-2 items-center justify-center tablet:hidden w-80">
					<DeskModsFilters
						error={error}
						submitUser={submitUser}
						setError={setError}
						user={user}
						setUser={setUser}
						filters={filters}
						setFilters={setFilters}
						guild={guild}
					/>
				</div>
			</div>
		</div>
	);
}
