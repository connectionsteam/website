import Avatar from "@/components/Mixed/Avatar";
import { GuildPayload } from "@/types";
import { motion } from "framer-motion";
import ConnectionsSkeleton from "../../ConnectionsSkeleton";

export default function Connections({ guild }: { guild: GuildPayload }) {
    return (
        <motion.div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Conexões</h1>
            <div className="grid grid-cols-3 gap-3 w-full">
                {guild.connections ? (
                    guild.connections.map((connection) => (
                        <button key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 hover:bg-neutral-700 transition">
                            <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-lg">{connection.name}</span>
                                {connection.description && <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>}
                            </div>
                        </button>
                    ))
                ) : <ConnectionsSkeleton key={Math.random()} />}
            </div>
        </motion.div>
    )
}