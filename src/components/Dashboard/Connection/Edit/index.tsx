import { useLanguage } from "../../../../hooks/useLanguage";
import { ConnectionPayload } from "../../../../types";
import { AnimatePresence, motion } from "framer-motion";
import DefaultInput from "../../../Mixed/Input";
import ConnectionModifications from "../Modifications";
import ConnectionEditTag from "./Tags";

interface Props {
    connection: ConnectionPayload;
    setConnection: (connection: ConnectionPayload) => void;
    modifications: boolean;
    setModifications: (modifications: boolean) => void;
    changedTab: boolean;
    editedConnection: Partial<ConnectionPayload>;
    setEditedConnection: (editedConnection: Partial<ConnectionPayload>) => void;
}

export default function EditDashboardConnection({ connection, setConnection, modifications, setModifications, changedTab, editedConnection, setEditedConnection }: Props) {
    const l = useLanguage();

    const handleChangeKey = (key: string, value: string) => {
        if (connection[key as keyof ConnectionPayload] === value) {
            setModifications(false);
        } else {
            setModifications(true);
        }

        setEditedConnection({
            ...editedConnection,
            [key]: value
        });
    };

    return (
        <motion.div
            initial={{ opacity: changedTab ? 1 : 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-4"
        >
            <div>
                <h1 className="font-bold text-xl">{l.dashboard.connections.edit.title}</h1>
                <span className="text-neutral-300">
                    {l.dashboard.connections.edit.description}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <DefaultInput
                    type="text"
                    label={l.dashboard.connections.edit.condescription}
                    placeholder={editedConnection.description || l.dashboard.connections.edit.condescriptionPlaceholder}
                    value={editedConnection.description}
                    onChange={(e) => handleChangeKey("description", e.target.value)}
                />
                <DefaultInput
                    type="text"
                    label={l.dashboard.connections.edit.icon}
                    value={editedConnection.icon}
                    placeholder={editedConnection.icon || l.dashboard.connections.edit.iconPlaceholder}
                    onChange={(e) => handleChangeKey("icon", e.target.value)}
                />
                <ConnectionEditTag
                    editedConnection={editedConnection}
                    setEditedConnection={setEditedConnection}
                    modifications={modifications}
                    setModifications={setModifications}
                    connection={connection}
                />
            </div>
            <AnimatePresence>
                {modifications && (
                    <motion.div
                        initial={changedTab ? {} : { opacity: 0, y: 200 }}
                        animate={changedTab ? {
                            x: [0, -10, 10, -10, 10, -5, 5, 0],
                            transition: {
                                duration: 0.4,
                                ease: "easeInOut",
                            }
                        } : { opacity: 1, y: -10 }}
                        transition={changedTab ? {
                            repeat: Infinity, repeatType: "loop"
                        } : undefined}
                        exit={{ opacity: 0, y: 200 }}
                        className="fixed bottom-0 right-0 w-full flex flex-col 
                        gap-4 items-center z-50"
                    >
                        <ConnectionModifications
                            changedTab={changedTab}
                            connection={connection}
                            editedConnection={editedConnection}
                            setEditedConnection={setEditedConnection}
                            setConnection={setConnection}
                            setModifications={setModifications}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ajeitar esse bug maldito de puxar para baixo quando ele tenta mudar de aba