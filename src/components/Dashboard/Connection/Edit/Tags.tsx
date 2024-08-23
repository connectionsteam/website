import { AnimatePresence, motion } from "framer-motion";
import { ConnectionPayload } from "../../../../types";
import { useLanguage } from "../../../../hooks/useLanguage";
import { RiHashtag } from "react-icons/ri";
import { BiX } from "react-icons/bi";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface Props {
    editedConnection: Partial<ConnectionPayload>;
    setEditedConnection: (connection: Partial<ConnectionPayload>) => void;
    modifications: boolean;
    setModifications: (modifications: boolean) => void;
    connection: ConnectionPayload;
}

export default function ConnectionEditTag({ editedConnection, setEditedConnection, setModifications, connection }: Props) {
    const l = useLanguage();
    const [tag, setTag] = useState("");

    const addNewTag = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTag(value);

        if (value.includes(" ")) {
            const newWords = value.split(" ").filter(w => w.length > 0 && !editedConnection.tags?.includes(w));

            if (newWords.length > 0) {
                const updatedTags = [...(editedConnection.tags || []), ...newWords];
                setEditedConnection({
                    ...editedConnection,
                    tags: updatedTags,
                });

                const areTagsEqual = connection.tags.length === updatedTags.length &&
                    connection.tags.every((tag, index) => tag === updatedTags[index]);

                setModifications(!areTagsEqual);
            }

            setTag("");
        }
    };


    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && tag === "") {
            const { tags } = editedConnection;

            if (tags && tags.length > 0) {
                const lastTag = tags[tags.length - 1];
                const updatedTags = tags.slice(0, -1);

                setTag(lastTag);
                setEditedConnection({
                    ...editedConnection,
                    tags: updatedTags,
                });

                const areTagsEqual = connection.tags.length === updatedTags.length &&
                    connection.tags.every((tag, index) => tag === updatedTags[index]);

                setModifications(!areTagsEqual);
            }
        }
    };


    const removeTag = (tag: string) => {
        const updatedTags = editedConnection.tags?.filter(w => w !== tag) || [];

        setEditedConnection({
            ...editedConnection,
            tags: updatedTags,
        });

        const areTagsEqual = connection.tags.length === updatedTags.length &&
            connection.tags.every((tag, index) => tag === updatedTags[index]);

        setModifications(!areTagsEqual);
    };


    return (
        <div className="flex gap-1 flex-col">
            <div>
                <span>Tags</span>
                <p className="text-neutral-300">
                    {l.dashboard.connections.connection.typetag}
                </p>
            </div>
            <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-neutral-900/50 
            min-h-14 min-w-full">
                <AnimatePresence>
                    {editedConnection.tags?.map((tag, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-3 p-1 rounded-lg bg-neutral-700 flex items-center gap-2"
                        >
                            <RiHashtag fill="#d946ef" />
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
        </div>
    )
}