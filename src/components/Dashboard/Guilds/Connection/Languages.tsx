import DefaultInput from "@/components/Mixed/Input";
import { ConnectionBody, Languages } from "@/types";
import { Avatar, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
    setBody: Dispatch<ConnectionBody>;
    body: ConnectionBody;
};

export default function JoinConnectionLanguage({ setBody, body }: Props) {
    const [query, setQuery] = useState("");
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleChangeLanguage = (key: keyof typeof Languages) => {
        setBody({ ...body, language: { language: Languages[key], key } });
        onClose();
    };

    const languages = Object.entries(Languages);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="text-neutral-300 flex gap-1">
                <div>Linguagem da conexão</div>
                <span className="text-red-500">*</span>
            </div>
            <button onClick={onOpen} className="p-3 bg-neutral-900/50 transition rounded-lg text-start w-full">
                {(body.language.key === "" && body.language.language === "")
                    ? "Clique aqui e selecione uma linguagem" :
                    <div className="w-full flex gap-2 items-center">
                        <Avatar
                            src={`https://flagpedia.net/data/flags/w702/${body.language.key}.webp`}
                            name={body.language.key}
                            className="w-5 h-5 rounded-sm"
                        />
                        <span>{body.language.language}</span>
                    </div>
                }
            </button>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Linguagem desejada</ModalHeader>
                    <ModalBody>
                        <DefaultInput
                            value={query}
                            placeholder="english"
                            type="text"
                            obrigatory
                            label="Procure por uma linguagem"
                            onChange={handleChangeQuery}
                        />
                        <div className="bg-neutral-800 w-full h-full flex flex-col gap-2 max-h-64 overflow-y-auto items-start">
                            {languages
                                .filter(([key, language]) => key.toLowerCase().includes(query.toLowerCase()) || language.toLowerCase().includes(query.toLowerCase()))
                                .map(([key, language]) => (
                                    <button
                                        className="flex items-center gap-2 p-3 transition hover:bg-neutral-700 w-full rounded-lg text-start"
                                        key={key}
                                        onClick={() => handleChangeLanguage(key as keyof typeof Languages)}
                                    >
                                        <Avatar
                                            src={`https://flagpedia.net/data/flags/w702/${key}.webp`}
                                            name={key}
                                            className="w-5 h-5 rounded-sm"
                                        />
                                        <span>{language}</span>
                                    </button>
                                ))}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}