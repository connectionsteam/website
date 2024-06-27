import { ConnectedConnectionPayload, GuildChannelsPayload, GuildPayload } from "@/types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ConnectionChannels({ channels, connection }: { channels: GuildChannelsPayload[], connection: ConnectedConnectionPayload }) {
    const [channel, setChannel] = useState<GuildChannelsPayload>();
    const [groupedChannels, setGroupedChannels] = useState<Record<string, GuildChannelsPayload[]>>();

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
                <div>Canal da conexão</div>
                <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2 items-start">
                {groupedChannels && Object.keys(groupedChannels).length > 0 ? (
                    <Dropdown className="bg-neutral-800 text-white rounded-lg outline-none flex justify-start">
                        <DropdownTrigger>
                            <button className="w-full bg-neutral-900/50 hover:bg-neutral-900 transition p-3 rounded-lg min-w-52 text-start">{!channel ? "Clique aqui para selecionar" : channel.name}</button>
                        </DropdownTrigger>
                        <DropdownMenu className="max-h-56 min-w-52 items-start overflow-auto flex justify-start">
                            {Object.entries(groupedChannels).map(([categoryId, categoryChannels]) => (
                                <DropdownSection key={categoryId} title={categoryId !== "" ? (channels.find((channel) => channel.id === categoryId)?.name) : undefined}>
                                    {categoryChannels.map((channel) => (
                                        <DropdownItem className="hover:bg-neutral-900/50 transition p-3" key={channel.id} onClick={() => setChannel(channel)}>
                                            {channel.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownSection>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                ) : <div>Carregando...</div>}
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