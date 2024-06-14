import { ConnectionPayload } from "@/types";
import EditConnection from "./EditConnection";
import DeleteConnection from "./DeleteConnection";

export default function ConnectionComponent({ connection }: { connection: ConnectionPayload }) {
    return (
        <div className="flex gap-2 w-full flex-col py-2">
            <EditConnection connection={connection} />
            <div className="bg-neutral-800 rounded-lg w-full gap-4 flex flex-col">
                <DeleteConnection id={connection.name} />
            </div>
        </div>
    )
}
