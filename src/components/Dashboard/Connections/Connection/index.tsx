import { api } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import { ConnectionPayload } from "@/types";
import ConnectionsSkeletonC from "../Skeleton";
import { languages } from "@/locale";
import { LanguageContext } from "@/contexts/Language";
import EditConnection from "./EditConnection";
import DeleteConnection from "./DeleteConnection";
export default function ConnectionComponent({ id }: { id: string }) {
    const [connection, setConnection] = useState<ConnectionPayload | null>(null);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        if (!id) return;

        const fetchconnection = async () => {
            const res = await api.get(`/connections/${id}`);

            setConnection(res.data);
        };

        fetchconnection();
    }, [id]);

    return connection ? (
        <div className="flex gap-2 w-full flex-col py-2">
            <EditConnection connection={connection} />
            <div className="bg-neutral-800 rounded-lg w-full gap-4 flex flex-col">
                <DeleteConnection id={connection.name} />
            </div>
        </div>
    ) : <ConnectionsSkeletonC />;
}
