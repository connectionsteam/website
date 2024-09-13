import { useEffect, useState, useRef } from "react";
import DefaultLayout from "../Mixed/Layout";
import type { ConnectionsPageStructure, GuildPayload } from "../../types";
import { api } from "../../utils/api";
import { useLanguage } from "../../hooks/useLanguage";
import { LuGrid, LuList } from "react-icons/lu";
import { motion } from "framer-motion";
import ConnectionsPageCard from "./Connection";
import { useIsClient } from "../../contexts/Client";
import { RiHashtag } from "react-icons/ri";
import { Modal, useDisclosure } from "@nextui-org/modal";
import SearchConnection from "./Search";
import { IoFilter } from "react-icons/io5";
import Filters from "./Filters";
import DeskConnectionsFilters from "./DeskFilters";
import DefaultButton from "../Mixed/Button";
import { VscTriangleUp } from "react-icons/vsc";
import ConnectionSkeleton from "./Connection/Skeleton";

export default function ConnectionsPageComponent() {
	const l = useLanguage();

	if (!useIsClient()) return null;

	const [connections, setConnections] = useState<ConnectionsPageStructure[]>(
		[],
	);
	const [page, setPage] = useState(0);
	const [guilds, setGuilds] = useState<GuildPayload[]>();
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [queryInput, setQueryInput] = useState("");
	const [firstLoading, setFirstLoading] = useState(true);
	const [options, setOptions] = useState(() => {
		const savedLayout = localStorage.getItem("layout");
		return savedLayout ? { layout: savedLayout } : { layout: "grid" };
	});
	const [filters, setFilters] = useState({
		tag: "",
		sort: "",
		query: "",
		search: queryInput === "" ? true : false,
	});
	const [submited, setSubmited] = useState(false);

	const queryParams = new URLSearchParams();
	if (filters.tag !== "") queryParams.set("tag", filters.tag.toLowerCase());
	if (filters.query !== "" && filters.search)
		queryParams.set("query", filters.query.toLowerCase());
	if (filters.sort !== "") queryParams.set("sort", filters.sort.toLowerCase());

	const observer = useRef<IntersectionObserver | null>(null);
	const lastConnectionElementRef = useRef<HTMLDivElement | null>(null);

	const handleToggleLayout = () => {
		setOptions((prevOptions) => {
			const newLayout = prevOptions.layout === "grid" ? "list" : "grid";
			localStorage.setItem("layout", newLayout);
			return { layout: newLayout };
		});
	};

	console.log(connections.map((a) => a.name));

	const fetchConnections = async (page = 0, append = false) => {
		setLoading(true);

		const { data } = await api.get(
			`/connections?${queryParams}&start_at=${page * 18}&end_at=${(page + 1) * 18}`,
		);

		if (data.length === 0) {
			if (filters.tag !== "" && submited) {
				setConnections(data);
			}
			setHasMore(false);
		} else {
			setConnections((prevConnections) =>
				append ? [...prevConnections, ...data] : data,
			);
		}

		setFirstLoading(false);
		setLoading(false);
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	useEffect(() => {
		if (!submited) return;

		setSubmited(false);
		fetchConnections();
	}, [submited]);

	useEffect(() => {
		if (page > 0) {
			fetchConnections(page, true);
		}
	}, [page]);

	useEffect(() => {
		if (loading || !hasMore) return;

		if (observer.current) {
			observer.current.disconnect();
		}

		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) setPage((prevPage) => prevPage + 1);
		}, options);

		if (lastConnectionElementRef.current) {
			observer.current.observe(lastConnectionElementRef.current);
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [loading, connections, hasMore]);

	useEffect(() => {
		const fetchGuilds = async () => {
			const { data } = await api.get(`/users/@me/guilds`);

			setGuilds(data);
		};

		fetchGuilds();
	}, []);

	console.log(filters);

	return (
		<DefaultLayout>
			<div className="flex flex-col w-full gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-3xl font-bold">{l.connection.title}</h1>
					<span className="text-neutral-300">{l.connection.description}</span>
				</div>
				<div className="w-full relative h-full">
					{
						<SearchConnection
							queryInput={queryInput}
							setSubmited={setSubmited}
							query={queryInput}
							setQuery={setQueryInput}
							filters={filters}
							setFilters={setFilters}
							actualConnections={connections}
						/>
					}
				</div>
				<div className="w-full flex items-center justify-center gap-2 h-full">
					<div className="flex gap-1 overflow-x-auto flex-grow">
						{l.connection.tags.map((tag, index) => (
							<button
								onClick={() => {
									setFilters({ ...filters, tag });
									setSubmited(true);
								}}
								key={index}
								className="p-1 px-2 flex gap-2 items-center bg-neutral-800 rounded-lg"
							>
								<RiHashtag fill="#d946ef" />
								<span className="whitespace-nowrap">{tag}</span>
							</button>
						))}
					</div>
					<div className="p-1 flex gap-2 items-center bg-neutral-800 rounded-lg relative h-full mobile:hidden">
						<motion.div
							animate={{ opacity: 1, x: options.layout === "list" ? -1 : 38 }}
							className="absolute bg-neutral-700 z-0 w-9 h-[90%] rounded-lg"
						/>
						<button
							className="rounded-lg transition p-2 flex gap-2 z-10"
							onClick={handleToggleLayout}
						>
							<LuList />
						</button>
						<button
							className="rounded-lg transition p-2 flex gap-2 z-10"
							onClick={handleToggleLayout}
						>
							<LuGrid />
						</button>
					</div>
					<div className="p-1 flex gap-2 items-center bg-neutral-800 rounded-lg h-full tabletdesk:hidden">
						<button
							onClick={onOpen}
							className="p-2 transition hover:bg-neutral-700 rounded-lg relative"
						>
							{(filters.tag !== "" || filters.sort !== "") && (
								<div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
							)}
							<IoFilter />
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
							<Filters
								closeForm={onClose}
								setSubmited={setSubmited}
								filters={filters}
								setFilters={setFilters}
							/>
						</Modal>
					</div>
				</div>
				<div
					className={`flex gap-4 w-full ${connections.length === 0 ? "items-center" : "items-start"}`}
				>
					<div className="flex w-full">
						<div
							className={
								options.layout === "grid"
									? `grid grid-cols-2 gap-3 w-full mobile:grid-cols-1`
									: "flex flex-col gap-2 w-full h-full items-center justify-center"
							}
						>
							{loading && firstLoading ? (
								Array.from({ length: 16 }).map((_, index) => (
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -30 }}
										transition={{ delay: 0.03 * index, duration: 0.03 }}
									>
										<ConnectionSkeleton
											key={index}
											grid={options.layout === "grid"}
										/>
									</motion.div>
								))
							) : connections.length === 0 ? (
								<div className="text-center">
									<span className="font-semibold">
										{l.connection.noConnections}
									</span>
									<p className="text-neutral-300 text-sm">
										Tente resetar os filtros ou buscar por uma tag mais famosa
									</p>
								</div>
							) : (
								connections.map((connection, index) => (
									<ConnectionsPageCard
										guilds={guilds ? guilds : []}
										connections={connections}
										layout={options.layout}
										key={index}
										connection={connection}
										index={index}
										ref={
											index === connections.length - 1
												? lastConnectionElementRef
												: null
										}
									/>
								))
							)}
							{loading &&
								!firstLoading &&
								Array.from({ length: 16 }).map((_, index) => (
									<ConnectionSkeleton key={index} />
								))}
						</div>
					</div>
					<div className="flex-col flex px-2 items-center justify-center tablet:hidden w-96 gap-4">
						<DeskConnectionsFilters
							setSubmited={setSubmited}
							filters={filters}
							setFilters={setFilters}
						/>
						<div
							className="flex flex-col items-center justify-center gap-2 
                        bg-neutral-800 p-3 rounded-lg w-full"
						>
							<div className="flex flex-col items-center justify-center gap-2 w-full">
								<div
									className="bg-neutral-900/50 border-1 rounded-lg p-3 
                                border-rose-700 w-full flex gap-2 items-center"
								>
									<div className="bg-neutral-700 rounded-full min-w-7 h-7"></div>
									<div className="bg-neutral-700 rounded-lg w-full h-2"></div>
								</div>
								<div className="bg-neutral-900/50 rounded-lg p-3 w-full flex gap-2 items-center">
									<div className="bg-neutral-700 rounded-full min-w-7 h-7"></div>
									<div className="bg-neutral-700 rounded-lg w-full h-2"></div>
								</div>
							</div>
							<div>
								<h2 className="font-bold text-xl text-center">
									{l.connection.wantPromoted}
								</h2>
								<span className="text-neutral-300">
									{l.connection.wantpromotedDescription}
								</span>
							</div>
							<DefaultButton notarget href="/promote" className="p-3" pink>
								<VscTriangleUp size={18} />
								<span>{l.connection.promote}</span>
							</DefaultButton>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
