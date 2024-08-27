import { useLanguage } from "../../hooks/useLanguage";
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { HiHashtag } from "react-icons/hi";
import { motion } from "framer-motion";
import type { ConnectionsPageFilters } from "../../types";
import { BiSearch } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

interface Props {
	filters: ConnectionsPageFilters;
	setFilters: (filters: ConnectionsPageFilters) => void;
	setSubmited: (submited: boolean) => void;
	closeForm: () => void;
}

export default function Filters({
	filters,
	setFilters,
	setSubmited,
	closeForm,
}: Props) {
	const l = useLanguage();

	const handleChangeSort = (filtersort: string) => {
		const { sort } = filters;

		if (filtersort === sort) return;

		setFilters({ ...filters, sort: filtersort });
		closeForm();
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

	return (
		<ModalContent className="text-white bg-neutral-900">
			<ModalHeader className="flex items-center pb-0">
				<div className="flex flex-col gap-1 font-bold text-lg flex-grow">
					{l.connection.filters.title}
				</div>
			</ModalHeader>
			<ModalBody className="flex gap-2">
				<div className="flex flex-col gap-2 text-start bg-neutral-900/50 w-full rounded-lg py-2">
					<div className="flex flex-col gap-2">
						<div className="font-semibold">{l.connection.filters.sort}</div>
						<div className="flex flex-col w-48 text-start items-start justify-start relative">
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
						<div className="flex gap-2 p-0.5 items-center bg-neutral-800 rounded-lg">
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

										closeForm();
										setSubmited(true);
									}}
									className="flex items-center h-full p-2 justify-center pl-0"
								>
									<div
										className="bg-neutral-700/50 h-full rounded-lg text-center 
                                    items-center flex justify-center p-3 transition hover:bg-neutral-700/100"
									>
										<BiSearch />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className="flex w-full gap-2 justify-start">
				<button
					onClick={handleResetFilters}
					className="flex gap-2 items-center 
                    justify-center font-semibold border-blue-500 border-2 
                    transition hover:bg-blue-500 p-2 rounded-lg px-4"
				>
					{l.connection.filters.reset}
				</button>
			</ModalFooter>
		</ModalContent>
	);
}
