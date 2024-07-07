"use client"
import { useLanguage } from "@/hooks/useLanguage";
import { ConnectedConnectionPayload, ConnectionBody, GuildChannelsPayload } from "@/types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Switch } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiHashtag } from "react-icons/hi";

interface Props {
    channels: GuildChannelsPayload[];
    connection: ConnectedConnectionPayload;
    body: ConnectionBody;
    setBody: Dispatch<SetStateAction<ConnectionBody>>;
};

export default function ConnectionChannels({ channels, connection, body, setBody }: Props) {
    const [groupedChannels, setGroupedChannels] = useState<Record<string, GuildChannelsPayload[]>>();
    const l = useLanguage();

    useEffect(() => {
        const groupChannelsByCategory = () => {
            const grouped: Record<string, GuildChannelsPayload[]> = {};

            channels.map(channel => {
                const parentId = channel.parent_id || "";

                if (!grouped[parentId]) {
                    grouped[parentId] = [];
                }

                grouped[parentId].push(channel);
            });

            if (grouped[""]) {
                delete grouped[""];
            }

            return setGroupedChannels(grouped);
        };

        groupChannelsByCategory();
    }, [channels, connection]);

    return (
        <div className="rounded-lg bg-neutral-800 transition flex flex-col gap-2">
            <label className="text-neutral-300 flex gap-1">
                <div>{l.dashboard.guilds.connections.channel}</div>
                <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2 items-start">
                {groupedChannels && Object.keys(groupedChannels).length > 0 ? (
                    <Dropdown className="bg-neutral-800 text-white rounded-lg outline-none flex justify-start">
                        <DropdownTrigger>
                            <button className="w-full bg-neutral-900/50 hover:bg-neutral-900 transition p-3 rounded-lg min-w-52 text-start">
                                {body.channel.name === ""
                                    ? l.dashboard.guilds.connections.selectchannel :
                                    <div className="flex gap-1 items-center">
                                        <HiHashtag />
                                        <span>
                                            {body.channel.name.length > 30
                                                ? body.channel.name.slice(0, 30) + "..." :
                                                body.channel.name
                                            }
                                        </span>
                                    </div>
                                }
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Channels" className="max-h-56 min-w-52 items-start overflow-auto flex justify-start">
                            {Object.entries(groupedChannels).map(([categoryId, categoryChannels]) => (
                                <DropdownSection aria-label="Channel" className="w-full" classNames={{
                                    heading: "p-2 text-neutral-400"
                                }} key={categoryId} title={categoryId !== "" ?
                                    (channels.find((channel) => channel.id === categoryId)?.name
                                        ? channels.find((channel) => channel.id === categoryId)!.name.length > 30
                                            ? channels.find((channel) => channel.id === categoryId)?.name.slice(0, 30) + "..." :
                                            channels.find((channel) => channel.id === categoryId)?.name : undefined)
                                    : undefined
                                }>
                                    {categoryChannels.map((channel) => (
                                        <DropdownItem
                                            aria-label="ChannelItem"
                                            classNames={{
                                                title: "flex items-center gap-1"
                                            }}
                                            className="hover:bg-neutral-900/50 transition p-3"
                                            key={channel.id} onClick={() => setBody({ ...body, channel })}
                                        >
                                            <HiHashtag />
                                            <span>
                                                {channel.name.length > 30
                                                    ? channel.name.slice(0, 30) + "..." :
                                                    channel.name
                                                }
                                            </span>
                                        </DropdownItem>
                                    ))}
                                </DropdownSection>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}

function Card({ title, description, onClick }: { title: string, description: string, onClick?: () => void }) {
    return (
        <div className="w-full bg-neutral-900 rounded-lg p-4 flex flex-col gap-3">
            <div className="text-2xl font-semibold flex items-center gap-2">
                <Switch color="secondary" />
                <span>{title}</span>
            </div>
            <div className="text-sm">{description}</div>
        </div>
    )
}