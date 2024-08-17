import { useState } from "react";
import { TeamPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import DefaultInput from "../../../Mixed/Input";
import { useLanguage } from "../../../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

export default function InviteMember({ team, onClose }: { team: TeamPayload, onClose: () => void }) {
    const [id, setId] = useState("");
    const l = useLanguage();
    const [loading, setLoading] = useState({
        state: false,
        check: false
    });
    const [errors, setErrors] = useState<string[]>([]);

    const sendInvite = async () => {
        setLoading({
            state: true,
            check: false
        });

        if (id.trim() === "") {
            setLoading({
                ...loading,
                state: false
            });

            return setErrors([
                ...errors,
                "id"
            ]);
        }

        if (id.includes(team.members.map((member) => member.id).join(","))) {
            setErrors([
                ...errors,
                "alreadymember"
            ]);

            return setLoading({
                ...loading,
                state: false
            });
        }

        try {
            await api.put(`/teams/${team._id}/members`, {
                member: id,
            });

            setLoading({
                state: false,
                check: true
            });

            setTimeout(() => {
                setLoading({
                    state: false,
                    check: false
                });

                onClose();
            }, 200);
        } catch {
            setLoading({
                ...loading,
                state: false
            });
            setErrors([
                ...errors,
                "id"
            ]);
        }
    };

    return (
        <ModalContent className="bg-neutral-800 text-white">
            <ModalHeader className="pb-1">
                Adicionar Membro
            </ModalHeader>
            <ModalBody>
                <DefaultInput
                    onChange={(event) => setId(event.target.value)}
                    placeholder="Digite aqui o ID do membro que será convidado"
                    type="text"
                    label="ID do membro"
                    error={errors.includes("id")}
                />
                {errors.includes("alreadymember") && <p className="text-red-500">O membro já é membro desta equipe</p>}
            </ModalBody>
            <ModalFooter className="flex w-full justify-end border-t rounded-t-xl
            border-neutral-700 mt-2">
                <button
                    onClick={onClose}
                    className="rounded-lg bg-neutral-700 transition hover:bg-neutral-700/50 
                    p-2 px-3"
                >
                    {l.dashboard.misc.cancel}
                </button>
                <button
                    onClick={sendInvite}
                    disabled={loading.state}
                    className="flex gap-2 font-semibold items-center text-center bg-green-500 
                    transition hover:bg-green-600 p-2 px-3 rounded-lg disabled:hover:bg-green-500"
                >
                    <span>Enviar Convite</span>
                    {loading.state && <AiOutlineLoading3Quarters className="animate-spin" size={20} />}
                    {loading.check && <FaCheckCircle className="text-white-500" size={20} />}
                </button>
            </ModalFooter>
        </ModalContent>
    )
}