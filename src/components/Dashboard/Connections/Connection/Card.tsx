import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ConnectionState } from "..";
import { ConnectionPayload } from "../../../../types";
import DeleteConnection from "./DeleteConnection";
import Avatar from "../../../../components/Mixed/Avatar";
import Link from "next/link";

interface Props {
    connection: ConnectionPayload;
    connectionProps: ConnectionState;
    setConnectionProps: Dispatch<SetStateAction<ConnectionState>>;
    index: number;
    handleDeleteConnection: () => void;
}

export default function ConnectionCard(
    { connection, connectionProps, setConnectionProps, index, handleDeleteConnection }: Props
) {
    return (
        <AnimatePresence key={index}>
            {connectionProps.removing !== connection.name ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.09 }}
                    onMouseEnter={() => setConnectionProps({ ...connectionProps, hover: connection.name })}
                    onMouseLeave={() => setConnectionProps({ ...connectionProps, hover: null })}
                    className="w-full relative"
                >
                    <DeleteConnection
                        handleRemove={handleDeleteConnection}
                        open={connectionProps.hover === connection.name}
                        id={connection.name}
                    />
                    <Link
                        href={`/dashboard/connection/${connection.name}`}
                        className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition relative w-full h-full"
                    >
                        <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                        <div className="flex flex-col gap-1 text-start">
                            <span className="font-bold text-lg">{connection.name}</span>
                            {connection.description &&
                                <span className="text-neutral-300 text-sm">
                                    {connection.description.length > 30
                                        ? connection.description.slice(0, 30) + "..." :
                                        connection.description
                                    }
                                </span>
                            }
                        </div>
                    </Link>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}