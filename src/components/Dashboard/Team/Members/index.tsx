import { TeamPayload } from "../../../../types";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import Avatar from "../../../Mixed/Avatar";
import DefaultInput from "../../../Mixed/Input";
import DefaultButton from "../../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";
import { Modal, useDisclosure } from "@nextui-org/modal";
import InviteMember from "./Invite";
import { useLanguage } from "../../../../hooks/useLanguage";
import { UserContext } from "../../../../contexts/User";
import { api } from "../../../../utils/api";
import RemoveTeamMember from "./Delete";

interface Props {
    team: TeamPayload;
    setTeam: (team: TeamPayload) => void;
    teamID: string;
}

export default function TeamMembers({ team, setTeam, teamID }: Props) {
    const [query, setQuery] = useState("");
    const l = useLanguage();
    const { user: loggedUser } = useContext(UserContext);
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
    const [memberProps, setMemberProps] = useState("");
    const [member, setMember] = useState("");

    const filteredMembers = team.members
        ? team.members.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
            || user.id.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const handleRemoveMember = async () => {
        await api.delete(`/teams/${teamID}/members/?member=${member}`);

        onClose();
        setTeam({
            ...team,
            members: team.members.filter((m) => m.id !== member)
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-2"
        >
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{l.dashboard.teams.members.title}</h1>
                <span className="text-neutral-300">{l.dashboard.teams.members.description}</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-end">
                    <DefaultInput
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={l.dashboard.teams.members.placeholder}
                        type="text"
                        label={l.dashboard.teams.members.filterMembers}
                    />
                    <DefaultButton onClick={onOpen} divclass="w-fit h-[51px]" className="w-[52px]">
                        <LuPlusCircle size={20} />
                    </DefaultButton>
                </div>
                <div className="flex flex-col gap-2">
                    <AnimatePresence>
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((user, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                    onMouseEnter={() => {
                                        if (loggedUser?.id !== team.creatorId) return;

                                        setMember(user.id);
                                        setMemberProps(user.username);
                                    }}
                                    onMouseLeave={() => setMemberProps("")}
                                    className="w-full relative"
                                >
                                    <div className="tabletdesk:hidden">
                                        <RemoveTeamMember
                                            handleRemove={handleRemoveMember}
                                            open={true}
                                            id={user.username}
                                        />
                                    </div>
                                    <RemoveTeamMember
                                        handleRemove={handleRemoveMember}
                                        open={memberProps === user.username}
                                        id={user.username}
                                    />
                                    <div
                                        className="flex gap-3 text-start w-full rounded-lg p-3 
                                        bg-neutral-900/50 hover:bg-neutral-900 transition"
                                    >
                                        <Avatar
                                            className="w-12 h-12"
                                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-lg">{user.username}</span>
                                            <span className="text-neutral-300 text-sm">{user.id}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="min-h-[30vh] text-lg items-center font-bold justify-center flex text-center">
                                {query === "" ? (
                                    <div className="flex flex-col">
                                        <div>{l.dashboard.teams.members.noMembers}</div>
                                        <div className="text-sm text-neutral-300 font-normal flex gap-1">
                                            <p>{l.dashboard.teams.members.noMembersDescription}</p>
                                            <span className="font-semibold">+</span>
                                        </div>
                                    </div>
                                ) : l.dashboard.teams.members.noMembersFound}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <InviteMember onClose={onClose} team={team} />
            </Modal>
        </motion.div>
    )
}