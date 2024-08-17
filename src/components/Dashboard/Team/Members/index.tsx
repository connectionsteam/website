import { TeamMemberPayload, TeamPayload } from "../../../../types";
import { motion } from "framer-motion";
import { useState } from "react";
import Avatar from "../../../Mixed/Avatar";
import DefaultInput from "../../../Mixed/Input";
import DefaultButton from "../../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";
import { Modal, useDisclosure } from "@nextui-org/modal";
import InviteMember from "./Invite";
import ManageMember from "./Manage";

export default function TeamMembers({ team }: { team: TeamPayload }) {
    const [query, setQuery] = useState("");
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isOpenManage,
        onOpen: onOpenManage,
        onClose: onCloseManage,
        onOpenChange: onOpenChangeManage
    } = useDisclosure();
    const [member, setMember] = useState<{ username: string, id: string, avatar: string }>();

    const members = team.members;

    const filteredMembers = members
        // ? members.filter((user) =>
        //     user.username.toLowerCase().includes(query.toLowerCase())
        //     || user.id.toLowerCase().includes(query.toLowerCase())
        // )
        // : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-800 w-full rounded-lg p-3 flex flex-col gap-2"
        >
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">Membros</h1>
                <span className="text-neutral-300">Aqui ficarão os membros do seu time, todos os membros podem adicionar e remover conexões do time</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-end">
                    <DefaultInput
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Digite aqui um nome de usuário ou ID"
                        type="text"
                        label="Filtrar membros"
                    />
                    <DefaultButton onClick={onOpen} divclass="w-fit h-[51px]" className="w-[52px]">
                        <LuPlusCircle size={20} />
                    </DefaultButton>
                </div>
                <div className="flex flex-col gap-2">
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((user, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    onClick={() => {
                                        setMember(user);
                                        onOpenManage();
                                    }}
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
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div className="min-h-[40vh] text-lg items-center font-bold justify-center flex text-center">
                            {query === "" ? (
                                <div className="flex flex-col">
                                    <div>Esse time não possui membros</div>
                                    <span className="text-sm text-neutral-300 font-normal">Você pode adicionar membros clicando no botão <span className="font-semibold">+</span></span>
                                </div>
                            ) : "Nenhum membro encontrado"}
                        </div>
                    )}
                </div>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpenManage} onOpenChange={onOpenChangeManage}>
                <ManageMember member={member!} team={team} onClose={onCloseManage} />
            </Modal>
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