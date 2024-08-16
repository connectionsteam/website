import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from "react";
import CreateConnection from "./CreateConnection";
import { ConnectionPayload, RequestPost } from "../../../../types";
import { LanguageContext } from "../../../../contexts/Language";
import { languages } from "../../../../locale";
import DefaultInput from "../../../../components/Mixed/Input";

interface Props {
    connections: ConnectionPayload[];
    setConnections: Dispatch<SetStateAction<ConnectionPayload[]>>;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
}

export default function CreateConnectionForm({ connections, setConnections, isOpen, onOpenChange, onClose }: Props) {
    const { language } = useContext(LanguageContext);
    const [post, setPost] = useState<RequestPost>({
        name: null!,
    });
    const [errors, setErrors] = useState<string[]>([]);

    const setPostValues = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setPost({
            ...post,
            [key]: event.target.value,
        });
    };

    return (
        <>
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
                            error={errors.includes("name")}
                            value={post.name}
                            label={languages[language].dashboard.connections.connection.form.name}
                            type="text"
                            placeholder={languages[language].dashboard.connections.connection.form.placeholders.name}
                            onChange={(e) => setPostValues(e, "name")}
                        />
                        <DefaultInput
                            maxChars={50}
                            minChars={20}
                            error={errors.includes("description")}
                            value={post.description}
                            label={languages[language].dashboard.connections.connection.form.description}
                            type="text"
                            placeholder={languages[language].dashboard.connections.connection.form.placeholders.description}
                            onChange={(e) => setPostValues(e, "description")}
                        />
                        <DefaultInput
                            label={languages[language].dashboard.connections.connection.form.icon}
                            type="text"
                            error={errors.includes("icon")}
                            placeholder="https://i.imgur.com/EXQVxqQ.png"
                            onChange={(e) => setPostValues(e, "icon")}
                        />
                        <DefaultInput
                            label={languages[language].dashboard.connections.connection.form.maxConnections}
                            type="number"
                            placeholder="5"
                            onChange={(e) => setPostValues(e, "maxConnections")}
                        />
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <CreateConnection
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