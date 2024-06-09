import Avatar from "@/components/Mixed/Avatar";
import DefaultLayout from "@/components/Mixed/Layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectionPayload } from "@/types";
import ConnectionsSkeletonC from "../Skeleton";

export default function ConnectionComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [connection, setConnection] = useState<ConnectionPayload | null>(null);

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
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-4 w-full flex-col">
                        <span className="font-bold text-xl">Conexão</span>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 w-full">
                            <Avatar className="w-12 h-12" src={connection.icon} key={id as string} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-xl">{connection.name}</span>
                                <span className="text-neutral-300 text-sm">{connection.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <ConnectionsSkeletonC />}
        </DefaultLayout>
    );
}
