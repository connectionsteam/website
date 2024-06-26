import { ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ConnectionChannels({ channels, connection, guild }: { channels: GuildChannelsPayload[], connection: ConnectedConnectionPayload, guild: GuildPayload }) {
    const [channel, setChannel] = useState<GuildChannelsPayload>();
    const [groupedChannels, setGroupedChannels] = useState<Record<string, GuildChannelsPayload[]>>();

    const patchChannel = async (channel: GuildChannelsPayload) => {
        await api.patch(`/guilds/${guild.id}/connections/${connection.name}`, {
            channelId: channel?.id,
        });
    };

    useEffect(() => {
        setChannel(channels.find((channel) => channel.id === connection.channelId));
        console.log(connection)
    }, [channels, connection]);

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

            return setGroupedChannels(grouped);
        };

        groupChannelsByCategory();
    }, [channels, connection]);

    console.log(channel)

    return (
        <motion.div className="rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 items-start">
                    <div>Selecione qual canal você deseja usar para receber</div>
                    {groupedChannels && Object.keys(groupedChannels).length > 0 ? (
                        <Dropdown className="bg-neutral-800 text-white rounded-lg outline-none flex justify-start">
                            <DropdownTrigger>
                                <button className="bg-neutral-900/50 hover:bg-neutral-900 transition p-3 rounded-lg min-w-52 text-start">{!channel ? "Clique aqui para selecionar" : channel.name}</button>
                            </DropdownTrigger>
                            <DropdownMenu className="max-h-56 min-w-52 items-start overflow-auto flex justify-start">
                                {Object.entries(groupedChannels).map(([categoryId, categoryChannels]) => (
                                    <DropdownSection key={categoryId} title={categoryId !== "" ? (channels.find((channel) => channel.id === categoryId)?.name) : undefined}>
                                        {categoryChannels.map((channel) => (
                                            <DropdownItem className="hover:bg-neutral-900/50 transition p-3" key={channel.id} onClick={() => patchChannel(channel)}>
                                                {channel.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownSection>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    ) : <div>carregnado..</div>}
                </div>
            </div>
        </motion.div>
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