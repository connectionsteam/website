import Avatar from "../../../../../components/Mixed/Avatar";
import DefaultInput from "../../../../../components/Mixed/Input";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { CaseTypes, GuildPayload, ModsFiltersStructure } from "../../../../../types";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoArrowBoth } from "react-icons/go";
import { LuClock2 } from "react-icons/lu";
import { MdBlock } from "react-icons/md";

interface Props {
    filters: ModsFiltersStructure;
    setFilters: (filters: ModsFiltersStructure) => void;
    guild: GuildPayload;
}

export default function ModsFilters({ filters, setFilters, guild }: Props) {
    const l = useLanguage();

    const handleResetFilters = () => {
        setFilters({
            mod_id: null,
            target_id: null,
            type: null,
            connection: null
        });
    };

    const [mod, setMod] = useState(Object.values(Object.entries(guild.mods)
        .find(([id]) => id === filters.target_id) ?? {})[0]);
    const [connection, setConnection] = useState(guild.connections
        .find((c) => c.name === filters.connection));

    return (
        <ModalContent className="text-white bg-neutral-900">
            <ModalHeader className="flex items-center pb-0">
                <div className="flex flex-col gap-1 font-bold text-lg flex-grow">
                    {l.connection.filters.title}
                </div>
            </ModalHeader>
            <ModalBody className="flex gap-2">
                <div className="flex flex-col gap-2 text-start bg-neutral-900/50 w-full rounded-lg py-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold">
                                {l.dashboard.guilds.cases.filters.type}
                            </div>
                            <div className="flex flex-col w-48 text-start items-start justify-start">
                                <button
                                    className="w-full rounded-lg transition p-2 text-start flex
                                items-center gap-2 z-20"
                                    onClick={() => setFilters({ ...filters, type: CaseTypes.Ban })}
                                >
                                    <MdBlock size={18} />
                                    Ban
                                </button>
                                <button
                                    className="w-full rounded-lg transition p-2 text-start 
                                    items-center gap-2 flex z-20"
                                    onClick={() => setFilters({ ...filters, type: CaseTypes.Timeout })}
                                >
                                    <LuClock2 size={18} />
                                    Timeout
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
                                        y: filters.type === 1 ? 0 : filters.type === null ? 80 : 40,
                                        width: filters.type === 1 ? "70px" : filters.type === null
                                            ? "95px" : "105px",
                                    }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.3,
                                        duration: 0.5,
                                    }}
                                    className="absolute bg-neutral-800 z-10 h-10 w-12 rounded-xl
                                        -translate-y-1/2 -translate-x-1"
                                >
                                </motion.div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold">
                                {l.dashboard.guilds.cases.filters.user}
                            </div>
                            <div className="bg-neutral-700/60 rounded-lg">
                                <DefaultInput
                                    value={filters.target_id || ""}
                                    type="text"
                                    onChange={(e) =>
                                        setFilters({ ...filters, target_id: e.target.value })}
                                    placeholder={l.dashboard.guilds.cases.filters.userID}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold">
                                {l.dashboard.guilds.cases.filters.moderator}
                            </div>
                            <div>
                                <Dropdown className="bg-neutral-800 text-white w-full 
                                max-h-56 overflow-x-auto">
                                    <DropdownTrigger>
                                        <button className="w-full rounded-lg bg-neutral-800 text-start p-2">
                                            {(filters.mod_id && typeof mod !== "string" && mod) ? (
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        className="w-8 h-8"
                                                        src={`https://cdn.discordapp.com/avatars/${filters.mod_id}/${mod.avatar}.png`}
                                                    />
                                                    <span className="font-bold">{mod.username}</span>
                                                </div>
                                            ) : l.dashboard.guilds.cases.filters.selectModerator}
                                        </button>
                                    </DropdownTrigger>
                                    <DropdownMenu className="w-full flex flex-col gap-1" aria-label="guilds">
                                        {Object.entries(guild.mods).map(([mod_id, mod]) => (
                                            <DropdownItem
                                                aria-label={mod.username}
                                                classNames={{
                                                    title: "flex items-center gap-1"
                                                }}
                                                className="hover:bg-neutral-700 transition p-3 
                                                w-full bg-neutral-800"
                                                key={mod_id}
                                                onClick={() => {
                                                    setFilters({ ...filters, mod_id });
                                                    setMod(mod);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        className="w-8 h-8"
                                                        src={`https://cdn.discordapp.com/avatars/${mod_id}/${mod.avatar}.png`}
                                                    />
                                                    <span className="font-bold">{mod.username}</span>
                                                </div>
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold">
                                {l.dashboard.connections.connection.title}
                            </div>
                            <div>
                                <Dropdown className="bg-neutral-800 text-white w-full max-h-56 
                                overflow-x-auto">
                                    <DropdownTrigger>
                                        <button className="w-full rounded-lg bg-neutral-800 text-start p-2">
                                            {(connection && filters.connection) ? (
                                                <div className="flex items-center gap-2">
                                                    {connection.icon && (
                                                        <Avatar
                                                            className="w-8 h-8"
                                                            src={connection.icon}
                                                        />
                                                    )}
                                                    <span className="font-bold">
                                                        {connection.name}
                                                    </span>
                                                </div>
                                            ) : l.dashboard.guilds.cases.filters.selectConnection}
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
                                                    title: "flex items-center gap-1"
                                                }}
                                                className="hover:bg-neutral-700 transition p-3 
                                                w-full bg-neutral-800"
                                                key={connection.name}
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        connection: connection.name
                                                    });
                                                    setConnection(connection);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {connection.icon && (
                                                        <Avatar
                                                            className="w-8 h-8"
                                                            src={connection.icon}
                                                        />
                                                    )}
                                                    <span className="font-bold">
                                                        {connection.name}
                                                    </span>
                                                </div>
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="flex w-full justify-end gap-2">
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