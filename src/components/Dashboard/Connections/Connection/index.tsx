import { ConnectionPayload } from "@/types";
import EditConnection from "./EditConnection";
interface Props {
    connection: ConnectionPayload;
}

export default function ConnectionComponent({ connection }: Props) {
    return (
        <div className="flex gap-2 w-full flex-col py-2">
            <EditConnection connection={connection} />
        </div>
    )
}
