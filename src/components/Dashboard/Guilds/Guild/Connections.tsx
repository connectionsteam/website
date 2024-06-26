import Avatar from "@/components/Mixed/Avatar";
import { ConnectedConnectionPayload, GuildPayload } from "@/types";
import ConnectionsSkeleton from "../../ConnectionsSkeleton";
import GuildEditConnection from "../Connection";
import { TabsStructure } from ".";

export default function Connections({ guild, addTab, setSelectedTab }: { guild: GuildPayload, addTab: (newTab: TabsStructure) => void, setSelectedTab: (value: string) => void }) {
    const handleSelectConnection = (connection: ConnectedConnectionPayload) => {
        addTab({
            value: connection.name,
            title: connection.name,
            content: <GuildEditConnection guild={guild} connection={connection} />
        });

        setSelectedTab(connection.name);
    };

    return (
        <div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Conexões</h1>
            <div className="grid grid-cols-3 gap-3 w-full">
                {guild.connections ? (
                    guild.connections.map((connection) => (
                        <button onClick={() => handleSelectConnection(connection)} key={connection.name} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition">
                            <Avatar className="w-12 h-12" src={connection.icon || ""} key={connection.name} />
                            <div className="flex flex-col gap-1 text-start">
                                <span className="font-bold text-lg">{connection.name}</span>
                                {connection.description && <span className="text-neutral-300 text-sm">{connection.description.length > 30 ? connection.description.slice(0, 30) + "..." : connection.description}</span>}
                            </div>
                        </button>
                    ))
                ) : <ConnectionsSkeleton key={Math.random()} />}
            </div>
        </div>
    );
}
