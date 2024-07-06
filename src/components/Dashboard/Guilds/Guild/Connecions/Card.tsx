import { ConnectedConnectionFlags, ConnectedConnectionPayload, ConnectedConnectionsState, GuildPayload } from "@/types";
import { AnimatePresence } from "framer-motion";
import FloatingMenu from "./Menu";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Avatar from "@/components/Mixed/Avatar";
import Image from "next/image";

interface Props {
    connection: ConnectedConnectionPayload;
    connectionProps: ConnectedConnectionsState;
    setConnectionProps: Dispatch<SetStateAction<ConnectedConnectionsState>>;
    handleRemoveConnection: (connectionName: string) => void;
    handleSelectConnection: (connection: ConnectedConnectionPayload) => void;
}

export default function ConnectedConnnectionCard(
    { connection, connectionProps, setConnectionProps, handleRemoveConnection, handleSelectConnection }: Props
) {
    return (
        <AnimatePresence key={connection.name}>
            {connectionProps.removing !== connection.name && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onMouseEnter={() => setConnectionProps({ ...connectionProps, hover: connection.name })}
                    onMouseLeave={() => setConnectionProps({ ...connectionProps, hover: null })}
                    className="relative w-full"
                >
                    {connection.flags.includes(ConnectedConnectionFlags.Frozen) && (
                        <Image
                            width={150}
                            height={40}
                            src="/backgrounds/frozenborder.png"
                            alt="Frozen border"
                            className="absolute -top-4 -left-2 z-20" />
                    )}
                    <div className="w-full relative tabletdesk:invisible">
                        <FloatingMenu
                            open={true}
                            connection={connection}
                            onRemove={() => handleRemoveConnection(connection.name)}
                        />
                    </div>
                    <FloatingMenu
                        open={connectionProps.hover === connection.name}
                        connection={connection}
                        onRemove={() => handleRemoveConnection(connection.name)}
                    />
                    <button
                        onClick={() => handleSelectConnection(connection)}
                        className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition relative z-10 w-full"
                    >
                        <Avatar className="w-12 h-12" src={connection.icon || ""} />
                        <div className="flex flex-col gap-1 text-start">
                            <span className="font-bold text-lg">{connection.name}</span>
                            {connection.description &&
                                <span className="text-neutral-300 text-sm">
                                    {connection.description.length > 30
                                        ? connection.description.slice(0, 30) + "..."
                                        : connection.description
                                    }
                                </span>
                            }
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}