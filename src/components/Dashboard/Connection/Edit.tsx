import Avatar from "@/components/Mixed/Avatar";
import DefaultInput from "@/components/Mixed/Input";
import { ConnectionPayload } from "@/types";
import { RiHashtag } from "react-icons/ri";
import { EditConnection } from ".";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiX } from "react-icons/bi";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
    connection: ConnectionPayload;
    editedConnection: EditConnection;
    setEditedConnection: (connection: EditConnection) => void;
    edit: boolean;
}

export default function EditConnectionComponent(
    { connection, editedConnection, setEditedConnection, edit }: Props
) {
    const l = useLanguage();
    const [tag, setTag] = useState("");

    const addNewTag = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTag(value);

        if (value.includes(" ")) {
            const newWords = value.split(" ").filter(w => w.length > 0 && !editedConnection.tags.includes(w));

            if (newWords.length > 0) {
                setEditedConnection({
                    ...editedConnection,
                    tags: [...editedConnection.tags, ...newWords]
                });
            }

            setTag("");
        };
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && tag === "") {
            const { tags } = editedConnection;

            setTag(tags.reverse()[0]);
            setEditedConnection({
                ...editedConnection,
                tags: tags.reverse().splice(0, tags.length - 1)
            });
        }
    };

    const removeTag = (tag: string) => {
        setEditedConnection({
            ...editedConnection,
            tags: editedConnection.tags.filter(w => w !== tag)
        });
    };

    return (
        <div className="flex gap-5 flex-col">
            <div className="flex gap-3 flex-grow items-center mobile:flex-col">
                <div className="h-20 min-w-20">
                    <Avatar src={editedConnection.icon || ""} className="h-full w-full rounded-full" />
                </div>
                <div className="flex gap-1 flex-col w-full">
                    <h1 className="font-bold text-3xl">
                        {connection.name}
                    </h1>
                    {edit ? (
                        <div className="w-96 mobile:w-full">
                            <DefaultInput
                                type="text"
                                maxChars={50}
                                minChars={20}
                                placeholder={connection.description || ""}
                                value={editedConnection.description}
                                onChange={(e) => setEditedConnection({
                                    ...editedConnection,
                                    description: e.target.value
                                })}
                            />
                        </div>
                    ) : (
                        <span className="text-neutral-300">
                            {editedConnection.description}
                        </span>
                    )}
                    {edit ? (
                        <>
                            <span className="text-neutral-300">
                                Digite as tags separando-as por um espaço (tag1 tag2 ...)
                            </span>
                            <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-neutral-900/50 
                            min-h-14 min-w-full">
                                <AnimatePresence>
                                    {editedConnection.tags.map((tag, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="px-3 p-1 rounded-lg bg-neutral-700 flex items-center gap-2"
                                        >
                                            <span>{tag}</span>
                                            <button onClick={() => removeTag(tag)}>
                                                <BiX
                                                    className="hover:fill-red-500 hover:bg-neutral-800
                                                transition rounded-full font-bold"
                                                    size={23}
                                                />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <input
                                    className="outline-none bg-transparent"
                                    placeholder={l.dashboard.guilds.connections.blockedWords.type}
                                    type="text"
                                    value={tag}
                                    onKeyDown={handleKeyDown}
                                    onChange={addNewTag}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center w-full gap-2 flex-wrap">
                            {connection.tags.map((tag, index) => (
                                <button key={index} className="p-1 px-2 flex gap-2 
                                items-center bg-neutral-700 rounded-lg">
                                    <RiHashtag fill="#d946ef" />
                                    <span>{tag}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {edit && (
                <DefaultInput
                    type="text"
                    label="Icone da conexão"
                    placeholder={connection.icon || ""}
                    value={editedConnection.icon}
                    onChange={(e) => setEditedConnection({
                        ...editedConnection,
                        icon: e.target.value
                    })}
                />
            )}
        </div>
    );
}