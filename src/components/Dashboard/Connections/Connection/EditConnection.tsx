import Avatar from "@/components/Mixed/Avatar";
import DefaultButton from "@/components/Mixed/Button";
import { ConnectionPayload } from "@/types";
import { api } from "@/utils/api";
import { ChangeEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditConnection({ connection }: { connection: ConnectionPayload }) {
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
        <div className="bg-neutral-800 rounded-lg w-full justify-center flex flex-col tablet:max-w-none">
            <div className="flex items-center justify-center flex-col gap-2">
                <div className="flex items-center flex-col justify-center gap-4 w-full">
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
                {(infos.description !== connection.description || infos.icon !== connection.icon) && <button onClick={handleRedefine} className="text-blue-500 underline">Redefinir</button>}
                {errors.api && <div className="text-red-500">{errors.api}</div>}
            </div>
        </div>
    );
}