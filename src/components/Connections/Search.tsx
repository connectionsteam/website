import { AnimatePresence, motion } from "framer-motion";
import type { ConnectionsPageFilters, ConnectionsPageStructure } from "../../types";
import { useLanguage } from "../../hooks/useLanguage";
import { RiHashtag } from "react-icons/ri";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";
import DefaultInput from "../Mixed/Input";
import ConnectionPageCard from "./Card";
import debounce from "../../utils/debounce";

interface Props {
	actualConnections: ConnectionsPageStructure[];
	filters: ConnectionsPageFilters;
	setFilters: (filters: ConnectionsPageFilters) => void;
	query: string;
	setQuery: (query: string) => void;
	setSubmited: (submited: boolean) => void;
	queryInput: string;
}

export default function SearchConnection({
	actualConnections,
	setFilters,
	filters,
	query,
	setQuery,
	setSubmited,
	queryInput,
}: Props) {
	const l = useLanguage();
	const panelRef = useRef<HTMLDivElement | null>(null);
	const [connections, setConnections] = useState<ConnectionsPageStructure[]>(
		actualConnections.slice(0, 6),
	);
	const [loading, setLoading] = useState(false);
	const [panel, setPanel] = useState(false);

	const debouncedFetchConnections = useCallback(
		debounce(async (query: string) => {
			setLoading(true);

			const { data } = await api.get(`/connections?query=${query}&end_at=6`);

			setConnections(data);

			setLoading(false);
		}, 500),
		[],
	);

	useEffect(() => {
		debouncedFetchConnections(query);
	}, [query, debouncedFetchConnections]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef &&
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setPanel(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && queryInput !== "") {
				setFilters({
					...filters,
					query: query,
					search: true,
				});
				setPanel(false);
				setSubmited(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [query, setFilters]);

	return (
		<div>
			<div
				className={`bg-neutral-800 rounded-lg border-2 transition 
                ${panel ? "border-neutral-300" : "border-neutral-900"}`}
			>
				<input
					placeholder={l.connection.search}
					onClick={() => setPanel(true)}
					onChange={(e) => {
						if (!panel) setPanel(true);
						setQuery(e.target.value.toLowerCase());
						setFilters({
							...filters,
							query: e.target.value.toLowerCase(),
							search: false,
						});
					}}
					type="string"
					className="bg-neutral-800 rounded-lg outline-none p-4 w-full"
				/>
			</div>
			<AnimatePresence>
				{panel && (
					<motion.div
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -30 }}
						ref={panelRef}
						className="flex flex-col gap-2 absolute w-full h-full min-h-[50vh] rounded-lg 
                        z-50 bottom-0 top-16 left-0 right-0 border-2 bg-neutral-900 
                        border-neutral-800 p-8 overflow-y-auto shadow-neutral-800 shadow-lg mobile:h-[70vh]"
					>
						<div className="flex w-full flex-col gap-3">
							<span className="font-bold text-2xl">{l.connection.title}</span>
							<div className="flex w-full flex-col gap-4 h-full">
								<div className="flex w-full">
									<AnimatePresence mode="wait">
										<motion.div
											className={`grid gap-3 w-full 
                                            ${
																							connections.length <= 0
																								? "grid-cols-1 tablet:grid-cols-1"
																								: "grid-cols-2 mobile:grid-cols-1"
																						}`}
										>
											{!loading ? (
												connections.length <= 0 ? (
													<div
														className="w-full flex py-6 font-bold 
                                                text-center items-center justify-center"
													>
														<span>{l.connection.noConnections}</span>
													</div>
												) : (
													connections.map((connection, index) => (
														<ConnectionPageCard
															connection={connection}
															key={index}
														/>
													))
												)
											) : (
												Array.from({ length: 3 }, (_, index) => (
													<div
														className="p-3 rounded-lg bg-neutral-800 
                                                items-center flex transition"
														key={index}
													>
														<div className="flex gap-3">
															<div
																className="w-12 h-12 rounded-full 
                                                        bg-neutral-700 animate-pulse"
															/>
															<div className="flex flex-col gap-2">
																<div
																	className="w-32 rounded-full h-4 
                                                            bg-neutral-700 animate-pulse"
																></div>
																<div
																	className="rounded-lg bg-neutral-700
                                                            p-2.5 w-10 animate-pulse"
																></div>
															</div>
														</div>
													</div>
												))
											)}
										</motion.div>
									</AnimatePresence>
								</div>
								<div className="flex gap-1 overflow-x-auto">
									{l.connection.tags.map((tag, index) => (
										<button
											onClick={() => setFilters({ ...filters, tag: tag })}
											key={index}
											className="p-1 px-2 flex gap-2 items-center 
                                            bg-neutral-800 rounded-lg min-h-6"
										>
											<RiHashtag fill="#d946ef" />
											<span className="whitespace-nowrap">{tag}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
