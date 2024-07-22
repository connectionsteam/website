import { useLanguage } from "@/hooks/useLanguage";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { HiHashtag } from "react-icons/hi";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { motion } from "framer-motion";

interface Props {
    filters: {
        tag: string;
        sort: string;
        query: string;
    };
    setFilters: (filters: {
        tag: string;
        sort: string;
        query: string;
    }) => void;
}

export default function Filters({ filters, setFilters }: Props) {
    const l = useLanguage();

    const handleResetFilters = () => {
        setFilters({
            tag: "",
            sort: "",
            query: "",
        });
    }

    return (
        <ModalContent className="text-white bg-neutral-900">
            <ModalHeader className="flex items-center pb-0">
                <div className="flex flex-col gap-1 font-bold text-lg flex-grow">
                    {l.connection.filters.title}
                </div>
                <button className="text-blue-500"></button>
            </ModalHeader>
            <ModalBody className="flex gap-2">
                <div className="flex flex-col gap-2 text-start bg-neutral-900/50 w-full rounded-lg py-2">
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold">
                            {l.connection.filters.sort}
                        </div>
                        <div className="flex flex-col w-48 text-start items-start justify-start relative">
                            <button
                                className="w-full rounded-lg transition p-2 text-start flex
                            items-center gap-2 z-20"
                                onClick={() => setFilters({ ...filters, sort: "" })}
                            >
                                <MdOutlineKeyboardArrowUp />
                                {l.connection.filters.votes}
                            </button>
                            <button
                                className="w-full rounded-lg transition p-2 text-start items-center gap-2
                            flex z-20"
                                onClick={() => setFilters({ ...filters, sort: "new" })}
                            >
                                <LuCalendar />
                                {l.connection.filters.creationDate}
                            </button>
                            <motion.div
                                animate={{
                                    y: filters.sort === "" ? 0 : 40,
                                    width: filters.sort === "" ? "90px" : "160px",
                                }}
                                transition={{
                                    type: "spring",
                                    bounce: 0.3,
                                    duration: 0.5,
                                }}
                                className="absolute bg-neutral-800 z-10 h-10 w-12 rounded-xl
                                        -translate-y-1/2 -translate-x-1"
                            >
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold">Tag</div>
                        <div className="flex gap-2 p-2 items-center bg-neutral-800 rounded-lg">
                            <HiHashtag className="fill-fuchsia-500" size={20} />
                            <input
                                className="outline-none w-full bg-neutral-900/50 rounded-lg p-2"
                                value={filters.tag}
                                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                                placeholder={l.connection.filters.typehere}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="flex w-full justify-end gap-2">
                <button
                    onClick={handleResetFilters}
                    className="flex gap-2 items-center 
                    justify-center font-semibold border-blue-500 border-2 
                    transition hover:bg-blue-500 p-2 rounded-lg px-4"
                >
                    {l.connection.filters.reset}
                </button>
            </ModalFooter>
        </ModalContent>
    );
}