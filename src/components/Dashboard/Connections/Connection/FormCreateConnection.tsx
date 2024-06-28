import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useContext, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import CreateConnection from "./CreateConnection";
import { ConnectionPayload, RequestPost } from "@/types";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import DefaultInput from "@/components/Mixed/Input";

interface Props {
    connections: ConnectionPayload[];
    setConnections: Dispatch<SetStateAction<ConnectionPayload[]>>;
}

export default function CreateConnectionForm({ connections, setConnections }: Props) {
    const { language } = useContext(LanguageContext);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [post, setPost] = useState<RequestPost>({
        name: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const setPostValues = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setPost({
            ...post,
            [key]: event.target.value,
        });
        setErrors({
            ...errors,
            [key]: "",
        });
    };

    return (
        <>
            <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
                <button
                    onClick={onOpen}
                    className="flex items-center justify-center gap-2 p-5 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition"
                >
                    <LuPlusCircle size={26} />
                    <span>{languages[language].dashboard.connections.addConnection}</span>
                </button>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">
                        {languages[language].dashboard.connections.addConnection}
                    </ModalHeader>
                    <ModalBody>
                        <DefaultInput
                            obrigatory
                            maxChars={16}
                            minChars={1}
                            value={post.name}
                            label={languages[language].dashboard.connections.connection.form.name}
                            type="text"
                            placeholder={languages[language].dashboard.connections.connection.form.placeholders.name}
                            onChange={(e) => setPostValues(e, "name")}
                        />
                        <DefaultInput
                            maxChars={50}
                            minChars={20}
                            value={post.description}
                            label={languages[language].dashboard.connections.connection.form.description}
                            type="text"
                            placeholder={languages[language].dashboard.connections.connection.form.placeholders.description}
                            onChange={(e) => setPostValues(e, "description")}
                        />
                        <DefaultInput
                            label={languages[language].dashboard.connections.connection.form.icon}
                            type="text"
                            placeholder="https://i.imgur.com/EXQVxqQ.png"
                            onChange={(e) => setPostValues(e, "icon")}
                        />
                        <DefaultInput
                            label={languages[language].dashboard.connections.connection.form.maxConnections}
                            type="text"
                            placeholder="5"
                            onChange={(e) => setPostValues(e, "maxConnections")}
                        />
                        {errors.api && <div className="text-red-500">{errors.api}</div>}
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <CreateConnection
                            key={0}
                            setConnections={setConnections}
                            connections={connections}
                            errors={errors}
                            post={post}
                            setErrors={setErrors}
                            onClose={onClose}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}