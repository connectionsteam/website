"use client"
import DefaultButton from "@/components/Mixed/Button";
import { DiscordMember, GuildPayload, ModPermType } from "@/types";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { api } from "@/utils/api";
import GuildModCard from "./Card";
import GuildModModal from "./Modal";
import { UserContext } from "@/contexts/User";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
}

export interface MenuProps {
    hover: string | null;
    removing: string | null;
}

export default function GuildMods({ guild, setGuild }: Props) {
    const { user } = useContext(UserContext);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [query, setQuery] = useState("");
    const [menu, setMenu] = useState<MenuProps>({
        hover: null,
        removing: null,
    })

    const handleAddMod = async (mod: DiscordMember) => {
        await api.put(`/guilds/${guild.id}/mods/${mod.user.id}`);

        onClose();
        setGuild({
            ...guild,
            mods: {
                ...guild.mods,
                [mod.user.id]: {
                    type: ModPermType.TrustedAdmin,
                    username: mod.user.username,
                    avatar: mod.user.avatar,
                },
            },
        });
    };

    const handleRemoveMod = async (mod: string) => {
        setMenu({ ...menu, removing: mod });

        await api.delete(`/guilds/${guild.id}/mods/${mod}`);

        const filtredMods = Object.entries(guild.mods).filter(([key]) => key !== mod);

        setTimeout(() => {
            setGuild({
                ...guild,
                mods: filtredMods.reduce((mods, [key, value]) => ({ ...mods, [key]: value }), {}),
            });

            setMenu({ ...menu, removing: null });
        }, 500);
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-xl">Administradores</h1>
                <div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-1">
                    <AnimatePresence>
                        {Object.entries(guild.mods).map(([key, mod], index) => (
                            <GuildModCard
                                guild={guild}
                                key={index}
                                setMenu={setMenu}
                                index={index}
                                mod={{ avatar: mod.avatar, id: key, username: mod.username }}
                                handleRemoveMod={handleRemoveMod}
                                menu={menu}
                            />
                        ))}
                    </AnimatePresence>
                    {Object.entries(guild.mods).find(([id]) => id === user?.id) && (
                        <DefaultButton onClick={onOpen} className="h-full w-full p-5">
                            <LuPlusCircle size={20} />
                            <span>Adicionar moderador</span>
                        </DefaultButton>
                    )}
                </div>
            </div>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">Adicionar moderador</ModalHeader>
                    <ModalBody>
                        <GuildModModal key={0} guild={guild} query={query} setQuery={setQuery} handleAddMod={handleAddMod} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}