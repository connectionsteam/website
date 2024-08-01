import { Switch } from "@nextui-org/switch";
import { EditConnection } from ".";
import { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ConnectionPayload } from "@/types";
import { MdOutlineContentCopy, MdOutlineSync } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { api } from "@/utils/api";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    editedConnection: EditConnection;
    connection: ConnectionPayload;
    setEditedConnection: (e: EditConnection) => void;
    setConnection: (e: ConnectionPayload) => void;
    setLoading: (value: {
        loading: boolean;
        loader: string;
        check: boolean;
    }) => void;
    loading: {
        loading: boolean;
        loader: string;
        check: boolean;
    }
}

export default function ConnectionPrivateInvite(
    { editedConnection, setEditedConnection, loading, connection, setLoading, setConnection }: Props
) {
    const [showHash, setShowHash] = useState(false);
    const l = useLanguage();

    const privateConnection = async () => {
        setLoading({ loading: true, check: false, loader: "private" });

        const { data } = await api.patch(`/connections/${connection.name}`, {
            private: !connection?.private
        });

        setConnection(data);
        setEditedConnection({
            ...editedConnection,
            private: !connection?.private
        });

        setLoading({ loading: false, check: true, loader: "private" });

        setTimeout(() => {
            setLoading({ ...loading, check: false, loader: "" });
        }, 2000);
    };

    const updateInvite = async () => {
        setLoading({ loading: true, check: false, loader: "invite" });

        const { data: { invite } } = await api.put(`/connections/${connection.name}/invite`);

        setConnection({
            ...connection as ConnectionPayload,
            hashInvite: invite
        });

        setEditedConnection({
            ...editedConnection,
            invite
        });

        setLoading({ loading: false, check: true, loader: "invite" });

        setTimeout(() => {
            setLoading({ ...loading, check: false, loader: "" });
        }, 2000);
    };

    const handleCopyLink = () => {
        setLoading({
            loading: true,
            loader: "copy",
            check: true
        });

        navigator.clipboard.writeText(`${new URL(location.href).origin}/invite/${connection.name}/${connection.hashInvite}`);

        setTimeout(() => {
            setLoading({
                ...loading,
                loader: "copy",
                check: false
            });
        }, 500);
    };

    return (
        <div className="flex gap-2 flex-col">
            <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                    <Switch
                        color="secondary"
                        isSelected={editedConnection.private}
                        onChange={privateConnection}
                    />
                    <div className="font-bold text-lg">{l.dashboard.connections.connection.private}</div>
                </div>
                <span className="text-neutral-300">
                    {l.dashboard.connections.connection.privateDescription}
                </span>
            </div>
            {editedConnection.private && (
                <div className="flex gap-2">
                    <div className="flex flex-row w-full h-full rounded-lg items-center gap-2">
                        <div className="flex gap-2 items-center justify-start 
                    w-full px-3 bg-neutral-900/50 rounded-lg">
                            <button onClick={() => setShowHash(!showHash)}>
                                {showHash
                                    ? <FaEyeSlash size={22} />
                                    : <FaEye size={22} />}
                            </button>
                            <input
                                disabled
                                value={`${new URL(location.href).origin}/invite/${connection.name}/${showHash ?
                                    connection.hashInvite
                                    : connection.hashInvite?.replaceAll(connection.hashInvite, "*"
                                        .repeat(connection.hashInvite.length as number))}`}
                                placeholder="Atualizar link de invite"
                                className="flex-grow p-2 w-full 
                                    bg-transparent xl:break-words"
                            />
                        </div>
                        <div className="flex gap-1">
                            <button
                                className="p-2 rounded-lg bg-neutral-900/50
                                transition hover:bg-neutral-900"
                                onClick={handleCopyLink}
                            >
                                {(loading.loading && loading.loader === "copy")
                                    ? <BiCheck
                                        size={26}
                                    /> : <MdOutlineContentCopy fill="#fff" size={26} />}
                            </button>
                            <button
                                onClick={updateInvite}
                                className="p-2 rounded-lg bg-neutral-900/50
                                transition hover:bg-neutral-900"
                            >
                                {(loading.loading && loading.loader === "invite")
                                    ? <AiOutlineLoading3Quarters
                                        fill="#fff"
                                        size={26}
                                        className="animate-spin"
                                    /> : <MdOutlineSync fill="#fff" size={26} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}