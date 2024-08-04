import { AnyCase, GuildPayload, ModsFiltersStructure } from "../../../../../types";
import CaseCard from "./Card";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { useEffect, useState } from "react";
import { api } from "../../../../../utils/api";
import { IoFilter } from "react-icons/io5";
import { Modal, useDisclosure } from "@nextui-org/modal";
import ModsFilters from "./Filters";
import DeskModsFilters from "./DeskFilters";

interface Props {
    guild: GuildPayload;
}

export default function Cases({ guild }: Props) {
    const l = useLanguage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [guildCases, setGuildCases] = useState<AnyCase[]>([]);
    const [cases, setCases] = useState<AnyCase[]>([]);
    const [loading, setLoading] = useState<string | null>(null);
    const [filters, setFilters] = useState<ModsFiltersStructure>({
        mod_id: null,
        target_id: null,
        type: null,
        connection: null,
    });

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

    useEffect(() => {
        const fetchCases = async () => {
            const query = new URLSearchParams();

            if (filters.mod_id !== null) query.append("moderator_id", filters.mod_id);
            if (filters.target_id !== null) query.append("target_id", filters.target_id);
            if (filters.type !== null) query.append("type", filters.type.toString());
            if (filters.connection !== null) query.append("connection", filters.connection);

            const { data } = await api.get(`/guilds/${guild.id}/cases?${query.toString()}`);

            setGuildCases(data);
        };

        fetchCases();
    }, [filters]);

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
            <div className="flex items-start gap-4">
                <div className="flex flex-col w-4/6 tablet:w-full">
                    <div className="flex items-end">
                        <div className="flex flex-grow flex-col">
                            <h1 className="font-bold text-xl">{l.dashboard.guilds.cases.title}</h1>
                            <span className="text-neutral-300 mb-4">
                                {l.dashboard.guilds.cases.description}
                            </span>
                        </div>
                        <button
                            onClick={onOpen}
                            className="p-2 transition hover:bg-neutral-900 bg-neutral-900/50 rounded-lg relative h-9 mb-2 tabletdesk:hidden">
                            {(
                                filters.mod_id
                                || filters.target_id
                                || (filters.type === 0 || filters.type === 1)
                                || filters.connection) && (
                                    <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                                )}
                            <IoFilter size={20} />
                        </button>
                        <Modal classNames={{
                            closeButton: "transition hover:bg-neutral-700",
                            wrapper: "overflow-y-hidden",
                            base: "max-h-screen overflow-y-auto",
                        }} isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModsFilters filters={filters} setFilters={setFilters} guild={guild} />
                        </Modal>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {guildCases.map((caseItem, index) => {
                                const caseDetail = cases.find((c) => c.id === caseItem.id);

                                return (
                                    <div
                                        className="cursor-pointer"
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
                <div className="flex px-2 items-center justify-center tablet:hidden w-80">
                    <DeskModsFilters filters={filters} setFilters={setFilters} guild={guild} />
                </div>
            </div>
        </div>
    );
}