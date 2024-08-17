import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { TeamPayload } from "../../../../types";
import { useLanguage } from "../../../../hooks/useLanguage";
import Avatar from "../../../Mixed/Avatar";
import { LuCrown } from "react-icons/lu";
import { MdBlock } from "react-icons/md";
import { useState } from "react";
import { api } from "../../../../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    member: {
        id: string;
        username: string;
        avatar: string;
    };
    onClose: () => void;
    team: TeamPayload;
}

export default function ManageMember({ member, team, onClose }: Props) {
    const l = useLanguage();
    const [loading, setLoading] = useState(false);

    const kickMember = async () => {
        setLoading(true);

        try {
            await api.put(`/api/teams/${team._id}/members`, {
                member: member.id,
            });

            onClose();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ModalContent className="bg-neutral-800 text-white">
            <ModalHeader className="pb-1">
                Gerenciar Membro
            </ModalHeader>
            <ModalBody className="flex gap-2">
                <div className="flex gap-2 flex-col">
                    <div className="flex gap-1 items-center">
                        <span>O que você deseja fazer com o membro</span>
                        <Avatar
                            className="w-6 h-6"
                            src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`}
                        />
                        <span className="font-bold">{member.username}</span>?
                    </div>
                    <span className="font-bold">Escolha uma das opções abaixo</span>
                </div>
                <div className="flex gap-1 items-center justify-between">
                    <button
                        className="bg-red-500 transition hover:bg-red-600 w-1/2 rounded-lg p-2 font-semibold
                        items-center flex gap-2"
                    >
                        {loading
                            ? <AiOutlineLoading3Quarters className="animate-spin" />
                            : <MdBlock />
                        }
                        <span>Expulsar</span>
                    </button>
                    <button
                        className="bg-amber-500 transition hover:bg-amber-600 w-1/2 rounded-lg p-2
                        items-center flex gap-2"
                    >
                        <LuCrown />
                        <span>Transferir Posse</span>
                    </button>
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
            </ModalFooter>
        </ModalContent>
    )
}