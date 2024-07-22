import { useEffect, useState, useRef } from "react";
import DefaultLayout from "../Mixed/Layout";
import { ConnectionsPageStructure } from "@/types";
import { api } from "@/utils/api";
import { Input } from "@nextui-org/input";
import { useLanguage } from "@/hooks/useLanguage";
import { LuGrid, LuList } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import ConnectionsPageCard from "./Connection";
import { useIsClient } from "@/contexts/Client";
import { RiHashtag } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { Modal, useDisclosure } from "@nextui-org/modal";
import Filters from "./Filters";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ConnectionsPageComponent() {
    const l = useLanguage();

    if (!useIsClient()) return null;

    const [connections, setConnections] = useState<ConnectionsPageStructure[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filters, setFilters] = useState({
        tag: "",
        sort: "",
        query: "",
    });
    const [options, setOptions] = useState(() => {
        const savedLayout = localStorage.getItem("layout");
        return savedLayout ? { layout: savedLayout } : { layout: "grid" };
    });

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
        const reqfilters = `${filters.tag !== "" ? `&tag=${filters.tag}` : ""}${filters.sort === "new" ? `&sort=new` : ""}`;
        const { data } = await api.get(`/connections?query=${filters.query}${reqfilters}&start_at=${page * 10}&end_at=${(page + 1) * 10}`);
        
        if (data.length === 0) {
            setHasMore(false);
        } else {
            setConnections(prevConnections => append ? [...prevConnections, ...data] : data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchConnections();
    }, [filters]);

    useEffect(() => {
        if (page > 0) {
            fetchConnections(page, true);
        }
    }, [page]);

    useEffect(() => {
        if (loading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
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
                <Input
                    classNames={{
                        inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                    }}
                    onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, query: e.target.value }))}
                    type="string"
                    label={l.connection.search}
                />
                <div className="w-full flex items-center justify-center gap-2 h-full">
                    <div className="flex gap-1 overflow-x-auto flex-grow">
                        {l.connection.tags.map((tag, index) => (
                            <button
                                onClick={() => setFilters({ ...filters, tag: tag })}
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
                    <div className="p-1 flex gap-2 items-center bg-neutral-800 rounded-lg h-full mobile:hidden">
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
                            <Filters filters={filters} setFilters={setFilters} />
                        </Modal>
                    </div>
                </div>
                <div className="flex gap-4 w-full">
                    <div className="flex w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={options.layout}
                                className={options.layout === "grid" ?
                                    "grid grid-cols-2 gap-3 w-full mobile:grid-cols-1"
                                    : "flex flex-col gap-2 w-full"
                                }
                            >
                                {connections.map((connection, index) => (
                                    <ConnectionsPageCard
                                        connections={connections}
                                        layout={options.layout}
                                        query={filters.query}
                                        key={index}
                                        connection={connection}
                                        index={index}
                                        ref={index === connections.length - 1 ? lastConnectionElementRef : null}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                {connections.length <= 0 && (
                    <div className="w-full flex items-center text-center justify-center">
                        <span>{l.connection.noConnections}</span>
                    </div>
                )}
                {loading && (
                    <div className="w-full flex items-center text-center justify-center mt-2">
                        <AiOutlineLoading3Quarters className="animate-spin" size={30} />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
