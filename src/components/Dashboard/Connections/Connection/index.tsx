import Avatar from "@/components/Mixed/Avatar";
import DefaultLayout from "@/components/Mixed/Layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ConnectionPayload } from "@/types";
import ConnectionsSkeletonC from "../Skeleton";
import { languages } from "@/locale";
import { LanguageContext } from "@/contexts/Language";
import DeleteConnection from "./DeleteConnection";
import { LuPencil, LuPencilLine } from "react-icons/lu";
import EditConnection from "./EditConnection";

export default function ConnectionComponent() {
    const router = useRouter();
    const { id } = router.query;
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

    return (
        <DefaultLayout>
            {connection ? (
                <div className="flex gap-2 w-full tablet:flex-col">
                    <EditConnection connection={connection} />
                    <div className="bg-neutral-800 h-full rounded-lg p-3 w-full"></div>
                </div>
            ) : <ConnectionsSkeletonC />}
        </DefaultLayout>
    );
}
