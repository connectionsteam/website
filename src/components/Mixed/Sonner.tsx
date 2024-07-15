import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IoIosWarning } from "react-icons/io";

interface Props {
    active: boolean;
    text: string;
    setActive: (active: boolean) => void;
}

export default function Sonner({ active, text, setActive }: Props) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            setActive(false);
        }, 2_000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed z-[9999] bottom-4 right-6 mobile:right-0 mobile:bottom-2 mobile:mx-2"
                >
                    <button 
                        onClick={() => setActive(false)}
                        className="p-4 bg-neutral-900 text-white rounded-lg flex gap-3 items-center">
                        <span className="text-lg">{text}</span>
                        <IoIosWarning className="fill-yellow-300" size={30} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}