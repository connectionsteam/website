import { AnyCase, GuildPayload } from "@/types";
import CaseCard from "./Card";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { api } from "@/utils/api";

interface Props {
    guild: GuildPayload;
}

export default function Cases({ guild }: Props) {
    const l = useLanguage();
    const [cases, setCases] = useState<AnyCase[]>([]);
    const [loading, setLoading] = useState<string | null>(null);

    const fetchCase = async (caseId: string) => {
        if (cases.find((c) => c.id === caseId)) return;

        setLoading(caseId);

        const { data } = await api.get(`/guilds/${guild.id}/cases/${caseId}`);
        
        setCases((prevCases) => [
            ...prevCases.filter((caseItem) => caseItem.id !== caseId),
            data,
        ]);

        setLoading(null);
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl">{l.dashboard.guilds.cases.title}</h1>
                <span className="text-neutral-300 mb-4">
                    {l.dashboard.guilds.cases.description}
                </span>
                <div className="w-full">
                    <div className="flex flex-col gap-4">
                        {guild.cases.map((caseItem, index) => {
                            const caseDetail = cases.find((c) => c.id === caseItem.id);

                            return (
                                <div
                                    onClick={() => fetchCase(caseItem.id)}
                                    key={caseItem.id}>
                                    <CaseCard
                                        loading={loading === caseItem.id}
                                        hovering={caseItem.id === caseDetail?.id}
                                        caseItem={caseDetail || caseItem}
                                        index={index}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
