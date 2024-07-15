import { useEffect, useState } from "react";
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

export default function ConnectionsPageComponent() {
    const l = useLanguage();

    if (!useIsClient()) return null;

    const [connections, setConnections] = useState<ConnectionsPageStructure[]>([]);
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState(() => {
        const savedLayout = localStorage.getItem("layout");

        return savedLayout ? { layout: savedLayout } : { layout: "grid" };
    });

    const handleToggleLayout = () => {
        setOptions(prevOptions => {
            const newLayout = prevOptions.layout === "grid" ? "list" : "grid";
            localStorage.setItem("layout", newLayout);

            return { layout: newLayout };
        });
    };

    useEffect(() => {
        const fetchConnections = async () => {
            const { data } = await api.get(`/connections${query !== "" ? "?query=" + query : ""}`);
            setConnections(data);
        };

        fetchConnections();
    }, [query]);

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
                    onChange={(e) => setQuery(e.target.value)}
                    type="string"
                    label={l.connection.search}
                />
                <div className="w-full flex items-center justify-center">
                    <div className="flex gap-1 overflow-x-auto flex-grow">
                        {l.connection.tags.map((tag, index) => (
                            <button key={index} className="p-1 px-2 flex gap-2 items-center bg-neutral-800 rounded-lg">
                                <RiHashtag fill="#d946ef" />
                                <span>{tag}</span>
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
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={options.layout}
                        className={`${options.layout === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-2"}`}
                    >
                        {connections.map((connection, index) => (
                            <ConnectionsPageCard query={query} key={index} connection={connection} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </DefaultLayout>
    );
}