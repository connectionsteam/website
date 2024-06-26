import { ConnectedConnectionPayload, GuildPayload } from "@/types";

export default function GuildEditConnection({ connection, guild }: { connection: ConnectedConnectionPayload, guild: GuildPayload }) {
    return (
        <div>
            <h1>Editar coneão {connection.name}</h1>
        </div>
    )
}