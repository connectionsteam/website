import { useEffect, useState, useRef } from "react";
import DefaultLayout from "../Mixed/Layout";
import { ConnectionsPageStructure } from "@/types";
import { api } from "@/utils/api";
import { useLanguage } from "@/hooks/useLanguage";
import { LuGrid, LuList } from "react-icons/lu";
import { motion } from "framer-motion";
import ConnectionsPageCard from "./Connection";
import { useIsClient } from "@/contexts/Client";
import { RiHashtag } from "react-icons/ri";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchConnection from "./Search";
import Link from "next/link";
import { IoFilter } from "react-icons/io5";
import Filters from "./Filters";
import DeskConnectionsFilters from "./DeskFilters";

export default function ConnectionsPageComponent() {
    const l = useLanguage();

    if (!useIsClient()) return null;

    const [connections, setConnections] = useState<ConnectionsPageStructure[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [queryInput, setQueryInput] = useState("");
    const [options, setOptions] = useState(() => {
        const savedLayout = localStorage.getItem("layout");
        return savedLayout ? { layout: savedLayout } : { layout: "grid" };
    });
    const [filters, setFilters] = useState({
        tag: "",
        sort: "",
        query: "",
        search: queryInput === "" ? true : false,
    });
    const [submited, setSubmited] = useState(false);

    const queryParams = new URLSearchParams();
    if (filters.tag !== "") queryParams.set("tag", filters.tag.toLowerCase());
    if (filters.query !== "" && filters.search) queryParams.set("query", filters.query.toLowerCase());
    if (filters.sort !== "") queryParams.set("sort", filters.sort.toLowerCase());

    const observer = useRef<IntersectionObserver | null>(null);
    const lastConnectionElementRef = useRef<HTMLDivElement | null>(null);

    const handleToggleLayout = () => {
        setOptions(prevOptions => {
            const newLayout = prevOptions.layout === "grid" ? "list" : "grid";
            localStorage.setItem("layout", newLayout);
            return { layout: newLayout };
        });
    };

    const fetchConnections = async (page = 0, append = false) => {
        setLoading(true);

        const { data } = await api.get(`/connections?${queryParams}&start_at=${page * 10}&end_at=${(page + 1) * 10}`);

        if (data.length === 0) {
            setHasMore(false);
        } else {
            setConnections(prevConnections => append ? [...prevConnections, ...data] : data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    useEffect(() => {
        if (!submited) return;

        setSubmited(false);
        fetchConnections();
    }, [submited]);

    useEffect(() => {
        if (page > 0) {
            fetchConnections(page, true);
        }
    }, [page]);

    useEffect(() => {
        if (loading || !hasMore) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) setPage(prevPage => prevPage + 1);
        }, options);

        if (lastConnectionElementRef.current) {
            observer.current.observe(lastConnectionElementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, connections, hasMore]);

    return (
        <DefaultLayout>
            <div className="flex flex-col w-full gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold">{l.connection.title}</h1>
                    <span className="text-neutral-300">{l.connection.description}</span>
                </div>
                <div className="w-full relative h-full">
                    {connections.length > 0 && (
                        <SearchConnection
                            queryInput={queryInput}
                            setSubmited={setSubmited}
                            query={queryInput}
                            setQuery={setQueryInput}
                            filters={filters}
                            setFilters={setFilters}
                            actualConnections={connections}
                        />
                    )}
                </div>
                <div className="w-full flex items-center justify-center gap-2 h-full">
                    <div className="flex gap-1 overflow-x-auto flex-grow">
                        {l.connection.tags.map((tag, index) => (
                            <button
                                onClick={() => {
                                    setFilters({ ...filters, tag });
                                    setSubmited(true);
                                }}
                                key={index}
                                className="p-1 px-2 flex gap-2 items-center bg-neutral-800 rounded-lg"
                            >
                                <RiHashtag fill="#d946ef" />
                                <span className="whitespace-nowrap">{tag}</span>
                            </button>
                        ))}
                    </div>
                    <div className="p-1 flex gap-2 items-center bg-neutral-800 rounded-lg relative h-full mobile:hidden">
                        <motion.div
                            animate={{ opacity: 1, x: options.layout === "list" ? -1 : 38 }}
                            className="absolute bg-neutral-700 z-0 w-9 h-[90%] rounded-lg"
                        />
                        <button
                            className="rounded-lg transition p-2 flex gap-2 z-10"
                            onClick={handleToggleLayout}
                        >
                            <LuList />
                        </button>
                        <button
                            className="rounded-lg transition p-2 flex gap-2 z-10"
                            onClick={handleToggleLayout}
                        >
                            <LuGrid />
                        </button>
                    </div>
                    <div className="p-1 flex gap-2 items-center bg-neutral-800 rounded-lg h-full tabletdesk:hidden">
                        <button
                            onClick={onOpen}
                            className="p-2 transition hover:bg-neutral-700 rounded-lg relative">
                            {(filters.tag !== "" || filters.sort !== "") && (
                                <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                            )}
                            <IoFilter />
                        </button>
                        <Modal classNames={{
                            closeButton: "transition hover:bg-neutral-700",
                            wrapper: "overflow-y-hidden",
                            base: "max-h-screen overflow-y-auto",
                        }} isOpen={isOpen} onOpenChange={onOpenChange}>
                            <Filters
                                closeForm={onClose}
                                setSubmited={setSubmited}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </Modal>
                    </div>
                </div>
                <div className="flex gap-4 w-full items-start">
                    <div className="flex w-full">
                        <div className={options.layout === "grid" ?
                            "grid grid-cols-2 gap-3 w-full mobile:grid-cols-1"
                            : "flex flex-col gap-2 w-full"
                        }
                        >
                            {connections.map((connection, index) => (
                                <ConnectionsPageCard
                                    connections={connections}
                                    layout={options.layout}
                                    key={index}
                                    connection={connection}
                                    index={index}
                                    ref={index === connections.length - 1 ? lastConnectionElementRef : null}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex px-2 items-center justify-center tablet:hidden w-80">
                        <DeskConnectionsFilters
                            setSubmited={setSubmited}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>
                </div>
                {loading && (
                    <div className="w-full flex items-center text-center justify-center mt-2">
                        <AiOutlineLoading3Quarters className="animate-spin" size={30} />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
