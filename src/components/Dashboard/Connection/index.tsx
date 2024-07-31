import DefaultLayout from "@/components/Mixed/Layout";
import { ConnectionPayload } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import EditConnectionComponent from "./Edit";
import { useLanguage } from "@/hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import ConnectionPrivateInvite from "./Invite";

export interface EditConnection {
    description: string;
    icon: string;
    tags: string[];
    private?: boolean;
    invite?: string;
}

export default function ConnectionPageComponent() {
    const { query: { name } } = useRouter();
    const l = useLanguage();
    const [connection, setConnection] = useState<ConnectionPayload>();
    const [editedConnection, setEditedConnection] = useState<EditConnection>({
        description: connection?.description || "",
        icon: connection?.icon || "",
        tags: connection?.tags || [],
        private: connection?.private || false,
        invite: connection?.hashInvite || ""
    });
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState({ loading: false, check: false, loader: "" });

    const resetEditedConnection = () => {
        setEditedConnection({
            description: connection?.description || "",
            icon: connection?.icon || "",
            tags: connection?.tags || [],
            private: connection?.private || false,
            invite: connection?.hashInvite || ""
        });
    };

    const saveEditedConnection = async () => {
        setLoading({ loading: true, check: false, loader: "connection" });

        const { description, icon, tags } = editedConnection;

        const body = {
            description,
            icon,
            tags
        };

        for (const i in body) {
            if (body[i as keyof typeof body] === "") {
                delete body[i as keyof typeof body];
            };
        };

        const { data } = await api.patch(`/connections/${name}`, body);

        setEditedConnection(data);
        setConnection(data);

        setLoading({ loading: false, check: true, loader: "connection" });

        setTimeout(() => {
            setLoading({ ...loading, check: false, loader: "" });
        }, 2000);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                saveEditedConnection();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (!name) return;

        const fetchConnection = async () => {
            const { data } = await api.get(`/connections/${name}`);

            setEditedConnection(data);
            setConnection(data);
        };

        fetchConnection();
    }, [name]);

    return (
        <DefaultLayout>
            {connection ? (
                <div className="w-full p-6 rounded-lg bg-neutral-800 text-white">
                    <div className="flex items-start">
                        <div className="flex flex-col gap-8 w-full">
                            <div className="flex flex-col gap-4">
                                <EditConnectionComponent
                                    connection={connection}
                                    editedConnection={editedConnection}
                                    setEditedConnection={setEditedConnection}
                                    edit={edit}
                                />
                                {edit && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={saveEditedConnection}
                                            className="rounded-lg bg-green-500 text-white transition
                                        p-2 px-4 hover:bg-green-600 flex gap-1 items-center"
                                        >
                                            <span>
                                                {l.dashboard.guilds.connections.blockedWords.save}
                                            </span>
                                            {(loading.loading && loading.loader === "connection") &&
                                                <AiOutlineLoading3Quarters
                                                    className="animate-spin"
                                                    size={18}
                                                />
                                            }
                                            {(loading.check && loading.loader === "connection")
                                                && <FaCheckCircle size={18} />
                                            }
                                        </button>
                                        <button
                                            onClick={resetEditedConnection}
                                            className="rounded-lg bg-blue-500 text-white transition
                                        p-2 px-4 hover:bg-blue-600"
                                        >
                                            {l.dashboard.connections.edit.redefine}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <ConnectionPrivateInvite
                                setConnection={setConnection}
                                setLoading={setLoading}
                                connection={connection}
                                editedConnection={editedConnection}
                                setEditedConnection={setEditedConnection}
                                loading={loading}
                            />
                        </div>
                        <button onClick={() => setEdit(!edit)}>
                            <LuPenSquare size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </DefaultLayout>
    );
}