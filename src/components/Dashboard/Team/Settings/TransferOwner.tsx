import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { TeamPayload } from "../../../../types";
import Avatar from "../../../Mixed/Avatar";
import { useState } from "react";
import { useLanguage } from "../../../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { api } from "../../../../utils/api";

interface Props {
    team: TeamPayload;
    setTeam: (team: TeamPayload) => void;
    setActiveTab: (tab: string) => void;
}

export default function TransferTeamOwner({ team, setTeam, setActiveTab }: Props) {
    const [query, setQuery] = useState("");
    const l = useLanguage();
    const [loading, setLoading] = useState({
        state: false,
        check: false
    });
    const [member, setMember] = useState({
        username: "",
        id: "",
    });
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();

    const filteredMembers = team.members
        ? team.members.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
            || user.id.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const transferOwner = async () => {
        setLoading({
            state: true,
            check: false
        });

        try {
            await api.put(`/teams/${(team as any)._id}/owner?new_owner=${member.id}`);

            setLoading({
                state: false,
                check: true
            });

            setTimeout(() => {
                setActiveTab("members");

                setTeam({
                    ...team,
                    creatorId: member.id
                });

                setLoading({
                    state: false,
                    check: false
                });

                onClose();
            }, 1000);
        } catch {
            setLoading({
                ...loading,
                state: false
            });
        }
    }

    return (
        <>
            <ModalContent className="bg-neutral-800 text-white">
                <ModalHeader className="pb-1">{l.dashboard.teams.settings.transfer.title}</ModalHeader>
                <ModalBody className="flex gap-2 pb-4">
                    <input
                        className="p-3 rounded-lg bg-neutral-900/50 w-full outline-none"
                        placeholder={l.dashboard.teams.settings.transfer.placeholder}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                        {filteredMembers.length > 0 ? filteredMembers.map((member, index) => (
                            <button
                                onClick={() => {
                                    setMember(member);
                                    onOpen();
                                }}
                                key={index}
                                className="flex gap-3 items-center rounded-lg p-2 bg-neutral-900/50 
                                    w-full transition hover:bg-neutral-900"
                            >
                                <div className="h-12 w-12">
                                    <Avatar
                                        className="w-12 h-12"
                                        src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`}
                                    />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold text-lg">{member.username}</span>
                                    <p className="text-neutral-300 text-sm">{member.id}</p>
                                </div>
                            </button>
                        )
                        ) : (
                            <div className="flex flex-col gap-2 min-h-32 items-center justify-center font-semibold text-lg">
                                {(filteredMembers.length === 0 && query === "") ? (
                                    <span className="text-neutral-300">
                                        {l.dashboard.teams.settings.transfer.noMembers}
                                    </span>
                                ) : (
                                    <span className="text-neutral-300">
                                        {l.dashboard.teams.settings.transfer.noMembersFound}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </ModalBody>
            </ModalContent>
            {member.id !== "" && member.username !== "" && (
                <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="pb-1 font-bold">
                            {l.dashboard.teams.settings.transfer.title}
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <span>{l.dashboard.teams.settings.transfer.transferOwner}</span>
                                <span className="font-bold">{member.username}</span>?
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex w-full justify-end border-t rounded-t-xl border-neutral-700 mt-2">
                            <button
                                onClick={onClose}
                                className="rounded-lg bg-neutral-700 transition hover:bg-neutral-700/50 
                                p-2 px-3"
                            >
                                {l.dashboard.misc.cancel}
                            </button>
                            <button
                                onClick={transferOwner}
                                disabled={loading.state || loading.check}
                                className="flex gap-2 font-semibold items-center text-center bg-amber-500 
                                transition hover:bg-amber-600 p-2 px-3 rounded-lg disabled:hover:bg-amber-500"
                            >
                                <span>{l.dashboard.teams.settings.transfer.button}</span>
                                {loading.state && <AiOutlineLoading3Quarters className="animate-spin" size={20} />}
                                {loading.check && <FaCheckCircle className="text-white-500" size={20} />}
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}