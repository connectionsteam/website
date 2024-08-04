"use client"
import { ConnectionBody, ConnectionsPageStructure, GuildPayload } from "../../types";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { FaLink } from "react-icons/fa6";
import ConnectionsPageChannels from "./Options";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Avatar from "../Mixed/Avatar";

interface Props {
    connection: ConnectionsPageStructure;
    small: boolean;
}

export default function ConnectConnection({ connection, small }: Props) {
    const l = useLanguage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [guilds, setGuilds] = useState<GuildPayload[]>();
    const [body, setBody] = useState<ConnectionBody>({
        channel: {
            id: "",
            name: "",
            position: 0,
            nsfw: false,
            parent_id: "",
        },
        name: connection.name,
        language: {
            language: "",
            key: ""
        }
    });
    const [guild, setGuild] = useState<GuildPayload>();

    useEffect(() => {
        if (!isOpen) return;

        const fetchGuilds = async () => {
            const { data } = await api.get(`/users/@me/guilds`);

            setGuilds(data);
        };

        fetchGuilds();
    }, [isOpen]);

    return (
        <>
            <button
                onClick={onOpen}
                className={!small ? "p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition w-full flex gap-2 items-center tablet:text-center tablet:items-center tablet:justify-center"
                    : "p-2 bg-neutral-700 rounded-lg transition w-full flex gap-2 items-center"}
            >
                <FaLink />
                <span>{l.connection.connect}</span>
            </button>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-neutral-800 text-white">
                    <ModalHeader className="flex flex-col gap-1 bg-neutral-800">
                        {l.connection.connect} {connection.name}
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-neutral-300 flex gap-1">{l.connection.connectionServer}</span>
                                {guilds ? (
                                    <Dropdown className="bg-neutral-800 text-white w-full max-h-56 overflow-x-auto">
                                        <DropdownTrigger>
                                            <button className="w-full rounded-lg bg-neutral-900/50 p-3 text-start">
                                                {guild ? (
                                                    <div className="flex items-center gap-2">
                                                        <Avatar
                                                            className="w-8 h-8"
                                                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                        />
                                                        <span className="font-bold">{guild.name}</span>
                                                    </div>
                                                ) : l.connection.connectionServerPlaceholder}
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu className="w-full flex flex-col gap-1" aria-label="guilds">
                                            {guilds
                                                .filter((guild) => guild.connections?.length < 5
                                                    && guild.connections.findIndex((c) => c.name === connection.name))
                                                .map((guild) => (
                                                    <DropdownItem
                                                        aria-label={guild.name}
                                                        classNames={{
                                                            title: "flex items-center gap-1"
                                                        }}
                                                        className="hover:bg-neutral-900 transition p-3 w-full bg-neutral-800"
                                                        key={guild.id}
                                                        onClick={() => setGuild(guild)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Avatar
                                                                className="w-8 h-8"
                                                                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                            />
                                                            <span className="font-bold">{guild.name}</span>
                                                        </div>
                                                    </DropdownItem>
                                                ))}

                                        </DropdownMenu>
                                    </Dropdown>
                                ) : (
                                    <div className="w-full rounded-lg bg-neutral-900/50 p-6"></div>
                                )}
                            </div>
                            {guild && <ConnectionsPageChannels
                                setBody={setBody}
                                body={body}
                                guild={guild}
                            />}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}