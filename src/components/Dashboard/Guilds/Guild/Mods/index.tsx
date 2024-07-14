"use client";
import DefaultButton from "@/components/Mixed/Button";
import { DiscordMember, GuildPayload, ModPermType, Premium } from "@/types";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useContext, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { api } from "@/utils/api";
import GuildModCard from "./Card";
import GuildModModal from "./Modal";
import { UserContext } from "@/contexts/User";
import { useLanguage } from "@/hooks/useLanguage";
import PremiumPopUp from "@/components/Premium/PopUp";

interface Props {
    guild: GuildPayload;
    setGuild: (guild: GuildPayload) => void;
    members: DiscordMember[];
    premium: Premium;
}

export interface MenuProps {
    hover: string | null;
    removing: string | null;
}

export default function GuildMods({ guild, setGuild, members, premium }: Props) {
    const l = useLanguage();
    const { user } = useContext(UserContext);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
        isOpen: isPremiumOpen,
        onOpen: onPremiumOpen,
        onOpenChange:
        onPremiumChange,
        onClose: onPremiumClose
    } = useDisclosure();
    const [query, setQuery] = useState("");
    const [menu, setMenu] = useState<MenuProps>({
        hover: null,
        removing: null,
    });

    const handleAddMod = async (mod: DiscordMember) => {
        if (Object.keys(guild.mods).length >= premium.maxMods) return onPremiumOpen();

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
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-end">
                        <h1 className="font-semibold text-xl">{l.dashboard.guilds.mods.title}</h1>
                        <span className="text-neutral-300">
                            {Object.keys(guild.mods).length}/{premium.maxMods}
                        </span>
                    </div>
                    <span className="text-neutral-300">{l.dashboard.guilds.mods.description}</span>
                </div>
                <div className="flex flex-col gap-2 min-w-72 tablet:min-w-full">
                    <div className="flex flex-col gap-2 w-full overflow-x-auto max-h-64">
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
                    </div>
                    {Object.entries(guild.mods).find(([id]) => id === user?.id) && (
                        <DefaultButton onClick={onOpen} className="h-full w-full p-4">
                            <LuPlusCircle size={20} />
                            <span>{l.dashboard.guilds.mods.addModerator}</span>
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
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">
                        {l.dashboard.guilds.mods.addModerator}
                    </ModalHeader>
                    <ModalBody>
                        <GuildModModal
                            key={0}
                            query={query}
                            setQuery={setQuery}
                            handleAddMod={handleAddMod}
                            users={members}
                            guild={guild}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <PremiumPopUp
                isOpen={isPremiumOpen}
                onChange={onPremiumChange}
                onClose={onPremiumClose}
                text="Precisa do premium amigao"
            />
        </>
    )
}