import Avatar from "../../../../../components/Mixed/Avatar";
import DefaultInput from "../../../../../components/Mixed/Input";
import { useLanguage } from "../../../../../hooks/useLanguage";
import {
	CaseTypes,
	type GuildPayload,
	type ModsFiltersStructure,
} from "../../../../../types";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoArrowBoth } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { LuClock2, LuServerOff } from "react-icons/lu";
import { MdBlock } from "react-icons/md";

interface Props {
	filters: ModsFiltersStructure;
	setFilters: (filters: ModsFiltersStructure) => void;
	guild: GuildPayload;
	user: string | null;
	setUser: (user: string | null) => void;
	submitUser: (user: string) => void;
	setError: (error: boolean) => void;
	error: boolean;
}

export default function DeskModsFilters({
	filters,
	setFilters,
	guild,
	user,
	setUser,
	submitUser,
	setError,
	error
}: Props) {
	const l = useLanguage();

	const handleResetFilters = () => {
		setFilters({
			mod_id: null,
			type: null,
			target_id: null,
			connection: null,
		});

		setUser(null);
	};

	const [mod, setMod] = useState(
		Object.values(
			Object.entries(guild.mods).find(([id]) => id === user) ?? {},
		)[0],
	);
	const [connection, setConnection] = useState(
		guild.connections.find((c) => c.name === filters.connection),
	);

	return (
		<div className="text-white w-full">
			<div className="flex items-center pb-0">
				<div className="flex flex-col gap-1 font-bold text-lg flex-grow">
					{l.connection.filters.title}
				</div>
			</div>
			<div className="flex gap-2 w-full">
				<div className="flex flex-col gap-2 text-start w-full rounded-lg py-2">
					<div className="flex flex-col gap-4 w-full">
						<div className="flex flex-col gap-2 w-full">
							<div className="font-bold">
								{l.dashboard.guilds.cases.filters.type}
							</div>
							<div className="flex flex-col w-full text-start items-start justify-start relative">
								<button
									className="w-full rounded-lg transition p-2 text-start flex
                                items-center gap-2 z-20"
									onClick={() =>
										setFilters({ ...filters, type: CaseTypes.Ban })
									}
								>
									<MdBlock size={18} />
									Ban
								</button>
								<button
									className="w-full rounded-lg transition p-2 text-start 
                                    items-center gap-2 flex z-20"
									onClick={() =>
										setFilters({ ...filters, type: CaseTypes.Timeout })
									}
								>
									<LuClock2 size={18} />
									Timeout
								</button>
								<button
									className="w-full rounded-lg transition p-2 text-start 
                                    items-center gap-2 flex z-20"
									onClick={() =>
										setFilters({ ...filters, type: CaseTypes.GuildBan })
									}
								>
									<LuServerOff size={18} />
									{l.dashboard.guilds.cases.filters.guildban}
								</button>
								<button
									className="w-full rounded-lg transition p-2 text-start 
                                    items-center gap-2 flex z-20"
									onClick={() => setFilters({ ...filters, type: null })}
								>
									<GoArrowBoth size={18} />
									{l.dashboard.guilds.cases.filters.ambos}
								</button>
								<motion.div
									animate={{
										y:
											filters.type === CaseTypes.Ban
												? 0
												: filters.type === CaseTypes.Timeout
													? 40
													: filters.type === CaseTypes.GuildBan
														? 80
														: 120,
										width: "100%",
										height: filters.type === 3 ? "70px" : "",
									}}
									transition={{
										type: "spring",
										bounce: 0.3,
										duration: 0.5,
									}}
									className="absolute bg-neutral-900/50 z-10 h-10 w-12 rounded-xl
                                        -translate-y-1/2 -translate-x-1"
								></motion.div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="font-bold">
								{l.dashboard.guilds.cases.filters.user}
							</div>
							<div className="w-full flex items-end gap-1 h-full">
								<div className="bg-neutral-800 rounded-lg w-full">
									<DefaultInput
										value={user || ""}
										type="text"
										onChange={(e) => {
											setUser(e.target.value);
											setError(false);
										}}
										error={error}
										placeholder={l.dashboard.guilds.cases.filters.userID}
									/>
								</div>
								<button onClick={() => submitUser(user ?? "")} className="p-2 rounded-lg
								bg-neutral-900/50 h-[52px] w-12 flex items-center justify-center 
								hover:bg-neutral-900 transition">
									<IoIosSearch size={18} />
								</button>
							</div>
							{error && (
									<span className="text-red-500 text-sm">
										{l.errors.invalidUserID}
									</span>
								)}
						</div>
						<div className="flex flex-col gap-2">
							<div className="font-bold">
								{l.dashboard.guilds.cases.filters.moderator}
							</div>
							<Dropdown
								className="bg-neutral-900 text-white w-full 
                                max-h-56 overflow-x-auto"
							>
								<DropdownTrigger>
									<button className="w-full rounded-lg bg-neutral-900/50 text-start p-3">
										{filters.mod_id && typeof mod !== "string" && mod ? (
											<div className="flex items-center gap-2">
												<Avatar
													className="w-8 h-8"
													src={`https://cdn.discordapp.com/avatars/${filters.mod_id}/${mod.avatar}.png`}
												/>
												<span className="font-bold">{mod.username}</span>
											</div>
										) : (
											l.dashboard.guilds.cases.filters.selectModerator
										)}
									</button>
								</DropdownTrigger>
								<DropdownMenu
									className="w-full flex flex-col gap-1"
									aria-label="guilds"
								>
									{guild.mods.map((mod) => (
										<DropdownItem
											aria-label={mod.username}
											classNames={{
												title: "flex items-center gap-1",
											}}
											className="hover:bg-neutral-800 transition p-3 
                                                w-full bg-neutral-900/50"
											key={mod.id}
											onClick={() => {
												setFilters({ ...filters, mod_id: mod.id });
												setMod(mod);
											}}
										>
											<div className="flex items-center gap-2">
												<Avatar
													className="w-8 h-8"
													src={`https://cdn.discordapp.com/avatars/${mod.id}/${mod.avatar}.png`}
												/>
												<span className="font-bold">{mod.username}</span>
											</div>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<div className="font-bold">
								{l.dashboard.connections.connection.title}
							</div>
							<Dropdown
								className="bg-neutral-900 text-white w-full max-h-56 
                                overflow-x-auto"
							>
								<DropdownTrigger>
									<button className="w-full rounded-lg bg-neutral-900/50 text-start p-3">
										{connection && filters.connection ? (
											<div className="flex items-center gap-2">
												{connection.icon && (
													<Avatar className="w-8 h-8" src={connection.icon} />
												)}
												<span className="font-bold">{connection.name}</span>
											</div>
										) : (
											l.dashboard.guilds.cases.filters.selectConnection
										)}
									</button>
								</DropdownTrigger>
								<DropdownMenu
									className="w-full flex flex-col gap-1"
									aria-label="guilds"
								>
									{guild.connections.map((connection) => (
										<DropdownItem
											aria-label={connection.name}
											classNames={{
												title: "flex items-center gap-1",
											}}
											className="hover:bg-neutral-800 transition p-3 
                                                w-full bg-neutral-900/50"
											key={connection.name}
											onClick={() => {
												setFilters({
													...filters,
													connection: connection.name,
												});
												setConnection(connection);
											}}
										>
											<div className="flex items-center gap-2">
												{connection.icon && (
													<Avatar className="w-8 h-8" src={connection.icon} />
												)}
												<span className="font-bold">{connection.name}</span>
											</div>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full gap-2">
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
