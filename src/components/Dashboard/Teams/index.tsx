import { Input } from "@nextui-org/input";
import { useLanguage } from "../../../hooks/useLanguage";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdOutlineSync } from "react-icons/md";
import Head from "next/head";
import { TeamPayload } from "../../../types";
import { api } from "../../../utils/api";
import { AnimatePresence } from "framer-motion";
import TeamCard from "./Team";
import DefaultButton from "../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";
import CreateTeamForm from "./Team/CreateForm";
import { useDisclosure } from "@nextui-org/modal";

export interface TeamState {
    team: TeamPayload | null;
    hover: string | null;
    removing: string | null;
}

export default function TeamsComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [teams, setTeams] = useState<TeamPayload[] | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const l = useLanguage();
    const [teamProps, setteamProps] = useState<TeamState>({
        team: null,
        hover: null,
        removing: null
    });

    const handleDeleteTeam = async () => {
        setteamProps({ ...teamProps, removing: teamProps.hover });

        await api.delete(`/teams/${teamProps.hover}`);

        setTeams(teams!.filter(team => team.id !== teamProps.hover));

        setteamProps({ ...teamProps, removing: null });
    };

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const fetchTeams = async () => {
        const { data } = await api.get("/users/@me/teams");

        setTeams(data);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const filter = (team: TeamPayload) => {
        return team.name.toLowerCase().includes(searchQuery.toLowerCase())
            || team.name.includes(searchQuery)
            || team.creatorId?.includes(searchQuery)
    };

    return (
        <>
            <Head>
                <title>{l.dashboard.teams.title}</title>
            </Head>
            <div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">
                        {l.dashboard.teams.title}
                    </h1>
                    <span className="text-neutral-300">
                        {l.dashboard.teams.description}
                    </span>
                </div>
                <div className="flex w-full h-full gap-1">
                    <Input classNames={{
                        inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                    }} onChange={handleChangeQuery} type="string" label={l.dashboard.misc.filterTeams} />
                    <DefaultButton onClick={onOpen} divclass="w-fit" className="w-[52px]">
                        <LuPlusCircle size={20} />
                    </DefaultButton>
                </div>
                {(teams && teams.filter(filter).length === 0) ? (
                    <div className="flex w-full items-center justify-center">
                        <div className="min-h-[30vh] text-lg items-center font-bold justify-center flex text-center">
                            {searchQuery === "" ? (
                                <div className="flex flex-col">
                                    <div>{l.dashboard.teams.noTeams}</div>
                                    <div className="text-sm text-neutral-300 font-normal flex gap-1">
                                        <p>{l.dashboard.teams.noTeamsDescription}</p>
                                        <span className="font-semibold">+</span>
                                    </div>
                                </div>
                            ) : l.dashboard.teams.noTeamsFound}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
                        <AnimatePresence>
                            {teams && (
                                teams.filter(filter).map((team, index) => (
                                    <TeamCard
                                        handleDeleteTeam={handleDeleteTeam}
                                        setTeamProps={setteamProps}
                                        teamProps={teamProps}
                                        team={team}
                                        key={index}
                                        index={index}
                                    />
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}
                {teams &&
                    <CreateTeamForm
                        setTeams={setTeams as Dispatch<SetStateAction<TeamPayload[]>>}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onClose={onClose}
                        teams={teams}
                    />
                }
            </div>
        </>
    )
}