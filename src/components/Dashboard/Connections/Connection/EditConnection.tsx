import Avatar from "@/components/Mixed/Avatar";
import DefaultButton from "@/components/Mixed/Button";
import { ConnectionPayload } from "@/types";
import { api } from "@/utils/api";
import { ChangeEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuPencilLine } from "react-icons/lu";

export default function EditConnection({ connection }: { connection: ConnectionPayload }) {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submited, setSubmited] = useState(false);

    const [infos, setInfos] = useState({
        description: connection.description,
        icon: connection.icon
    });

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setInfos({
            ...infos,
            [key]: event.target.value
        });
    };

    const handleRedefine = () => {
        setInfos({
            description: connection.description,
            icon: connection.icon
        });
    };

    const updateConnection = async () => {
        setLoading(true);

        try {
            await api.patch(`/connections/${connection.name}`, infos);

            setLoading(false);
            setErrors({
                api: ""
            });
            setSubmited(true);
            setTimeout(() => {
                setSubmited(false);
            }, 2000);
        } catch (error: any) {
            const json = error.response.data.errors[0].map((err: any) => err.message) || error.message;

            setLoading(false);
            setErrors({
                ...errors,
                api: json.join(", "),
            });
        }
    };

    return (
        <div className="p-3 bg-neutral-800 rounded-lg w-full max-w-[300px] tablet:max-w-none">
            <div className="flex items-center justify-end">
                <button onClick={() => setEditMode(!editMode)}>
                    <LuPencilLine size={20} />
                </button>
            </div>
            <div className="flex items-center justify-center flex-col gap-2 p-3">
                {!editMode ? (
                    <>
                        <Avatar
                            src={connection.icon || ""}
                            className="h-20 w-20 rounded-full"
                        />
                        <h1 className="text-xl font-semibold">{connection.name}</h1>
                        <div className="break-words">{connection.description}</div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center flex-col justify-center w-ful gap-4">
                            <Avatar
                                src={infos.icon || ""}
                                className="h-20 w-20 rounded-full"
                            />
                            <h1 className="text-xl font-semibold">{connection.name}</h1>
                            <input className="transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none" value={infos.icon} onChange={(event) => handleChangeQuery(event, "icon")} type="text" />
                        </div>
                        <textarea className="transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none" value={infos.description} onChange={(event) => handleChangeQuery(event, "description")} />
                        {submited && <div className="text-green-500">Salvo com sucesso!</div>}
                        <DefaultButton className="p-3" onClick={updateConnection}>
                            {loading ? (
                                <div className="flex gap-2 items-center w-full justify-center">
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                    <span className="font-semibold">Salvando...</span>
                                </div>
                            ) : <span className="font-semibold">Salvar</span>}
                        </DefaultButton>
                        {editMode && <button onClick={handleRedefine} className="text-blue-500 underline">Redefinir</button>}
                        {errors.api && <div className="text-red-500">{errors.api}</div>}
                    </>
                )}
            </div>
        </div>
    );
}