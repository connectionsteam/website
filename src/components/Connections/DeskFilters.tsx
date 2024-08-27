import { useLanguage } from "../../hooks/useLanguage";
import { HiHashtag } from "react-icons/hi";
import { motion } from "framer-motion";
import type { ConnectionsPageFilters } from "../../types";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

interface Props {
	filters: ConnectionsPageFilters;
	setFilters: (filters: ConnectionsPageFilters) => void;
	setSubmited: (submited: boolean) => void;
}

export default function DeskConnectionsFilters({
	filters,
	setFilters,
	setSubmited,
}: Props) {
	const l = useLanguage();

	const handleChangeSort = (filtersort: string) => {
		const { sort } = filters;

		if (filtersort === sort) return;

		setFilters({ ...filters, sort: filtersort });
		setSubmited(true);
	};

	const handleResetFilters = () => {
		if (Object.values(filters).filter((value) => value !== "").length <= 1)
			return;

		setFilters({
			tag: "",
			sort: "",
			query: "",
			search: false,
		});

		setSubmited(true);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" && filters.tag !== "") {
				setSubmited(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [filters]);

	return (
		<div className="text-white">
			<div className="flex items-center pb-0">
				<div className="flex flex-col gap-1 font-bold text-lg flex-grow">
					{l.connection.filters.title}
				</div>
				<button className="text-blue-500"></button>
			</div>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2 text-start bg-neutral-900/50 w-full rounded-lg py-2">
					<div className="flex flex-col gap-2">
						<div className="font-semibold">{l.connection.filters.sort}</div>
						<div className="flex flex-col w-full text-start items-start justify-start relative">
							<button
								className="w-full rounded-lg transition p-2 text-start flex
                            items-center gap-2 z-20"
								onClick={() => handleChangeSort("")}
							>
								<FaFireAlt />
								{l.connection.filters.votes}
							</button>
							<button
								className="w-full rounded-lg transition p-2 text-start items-center gap-2
                                flex z-20"
								onClick={() => handleChangeSort("new")}
							>
								<BsStars />
								{l.connection.filters.creationDate}
							</button>
							<motion.div
								animate={{
									y: filters.sort === "" ? 0 : "100%",
									width: "100%",
								}}
								transition={{
									type: "spring",
									bounce: 0.3,
									duration: 0.5,
								}}
								className="absolute bg-neutral-800 z-10 h-10 w-12 rounded-xl 
                                -translate-y-1/2 -translate-x-1"
							></motion.div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-semibold">Tag</div>
						<div className="flex gap-1 items-center rounded-lg bg-neutral-800">
							<div className="flex gap-1 items-center h-full">
								<div className="flex items-center rounded-lg bg-neutral-700/50 m-2 mr-0 px-1">
									<HiHashtag className="fill-fuchsia-500" size={20} />
									<input
										className="outline-none w-full rounded-lg p-2 bg-transparent"
										value={filters.tag}
										onChange={(e) =>
											setFilters({ ...filters, tag: e.target.value })
										}
										placeholder={l.connection.filters.typehere}
										type="text"
									/>
								</div>
								<button
									onClick={() => {
										if (filters.tag === "") return;
										setSubmited(true);
									}}
									className="flex items-center h-full p-2 justify-center pl-0"
								>
									<div
										className="bg-neutral-700/50 h-full rounded-lg text-center 
                                    items-center flex justify-center p-2.5 transition hover:bg-neutral-700/100"
									>
										<BiSearch />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full gap-2 flex-col">
				<button
					onClick={handleResetFilters}
					className="flex gap-2 items-center 
                    justify-center font-semibold border-blue-500 border-2 
                    transition hover:bg-blue-500 p-2 rounded-lg px-4"
				>
					{l.connection.filters.reset}
				</button>
			</div>
		</div>
	);
}
