import { api } from "@/utils/api";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import CreateConnection from "./CreateConnection";
import { RequestPost } from "@/types";

export default function CreateConnectionForm() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [post, setPost] = useState<RequestPost>({
        name: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const setPostValues = (event: ChangeEvent<HTMLInputElement>, key: string) => {
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
                <button onClick={onOpen} className="flex items-center justify-center gap-2 p-5 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition">
                    <LuPlusCircle size={26} />
                    <span>Adicionar Conexão</span>
                </button>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Criar Conexão</ModalHeader>
                    <ModalBody>
                        <InputField obrigatory label="Nome" type="text" placeholder="conexãolegal" onChange={(e) => setPostValues(e, "name")} error={errors.name} />
                        <InputField label="Descrição" type="text" placeholder="Essa conexão é supimpa de bom!" onChange={(e) => setPostValues(e, "description")} error={errors.description} />
                        <InputField label="Icone" type="text" placeholder="https://i.imgur.com/EXQVxqQ.png" onChange={(e) => setPostValues(e, "icon")} error={errors.icon} />
                        <InputField label="Conexões máximas" type="text" placeholder="5" onChange={(e) => setPostValues(e, "maxConnections")} error={errors.maxConnections} />
                        {errors.api && <div className="text-red-500">{errors.api}</div>}
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <CreateConnection key={Math.random()} errors={errors} post={post} setErrors={setErrors} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function InputField({ label, type, placeholder, onChange, obrigatory, error }: { obrigatory?: boolean, label: string, type: string, placeholder: string, onChange: ChangeEventHandler<HTMLInputElement>, error?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-neutral-300 flex gap-1">
                <div>{label}</div>
                {obrigatory && <span className="text-red-500">*</span>}
            </label>
            <div className="w-full">
                <input className={`transition w-full p-3 rounded-lg bg-neutral-900/50 focus:outline-none ${error ? 'border border-red-500' : 'hover:bg-neutral-700/30 focus:bg-neutral-700/30'}`} onChange={onChange} type={type} placeholder={placeholder} />
            </div>
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
}
