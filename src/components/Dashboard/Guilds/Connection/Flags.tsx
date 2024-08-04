import { useLanguage } from "../../../../hooks/useLanguage";
import { ConnectedConnectionFlags, ConnectedConnectionPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { Switch } from "@nextui-org/switch";
import { useState, useEffect } from "react";

interface Props {
    connection: ConnectedConnectionPayload;
    setConnection: (connection: ConnectedConnectionPayload) => void;
    guildId: string;
}

export default function GuildConnectionFlags({ connection, guildId, setConnection }: Props) {
    const [flags, setFlags] = useState(connection.flags || []);
    const l = useLanguage();

    const flagsDescriptions: Record<ConnectedConnectionFlags, {
        title: string, description: string
    }> = {
        [ConnectedConnectionFlags.Locked]: {
            title: l.dashboard.guilds.connections.flags.locked,
            description: l.dashboard.guilds.connections.flags.lockedDescription,
        },
        [ConnectedConnectionFlags.Frozen]: {
            title: l.dashboard.guilds.connections.flags.frozen,
            description: l.dashboard.guilds.connections.flags.frozenDescription,
        },
        [ConnectedConnectionFlags.AllowFiles]: {
            title: l.dashboard.guilds.connections.flags.allowFiles,
            description: l.dashboard.guilds.connections.flags.allowFilesDescription,
        },
        [ConnectedConnectionFlags.AllowInvites]: {
            title: l.dashboard.guilds.connections.flags.allowInvites,
            description: l.dashboard.guilds.connections.flags.allowInvitesDescription,
        },
        [ConnectedConnectionFlags.AllowLinks]: {
            title: l.dashboard.guilds.connections.flags.allowLinks,
            description: l.dashboard.guilds.connections.flags.allowLinksDescription,
        },
        [ConnectedConnectionFlags.NoIndentification]: {
            title: l.dashboard.guilds.connections.flags.noIndentification,
            description: l.dashboard.guilds.connections.flags.noIndentificationDescription,
        },
        [ConnectedConnectionFlags.AllowOrigin]: {
            title: l.dashboard.guilds.connections.flags.allowOrigin,
            description: l.dashboard.guilds.connections.flags.allowOriginDescription,
        },
        [ConnectedConnectionFlags.AllowEmojis]: {
            title: l.dashboard.guilds.connections.flags.allowEmojis,
            description: l.dashboard.guilds.connections.flags.allowEmojisDescription,
        },
        [ConnectedConnectionFlags.CompactModeEnabled]: {
            title: l.dashboard.guilds.connections.flags.compactModeEnabled,
            description: l.dashboard.guilds.connections.flags.compactModeEnabledDescription,
        },
        [ConnectedConnectionFlags.AutoTranslate]: {
            title: l.dashboard.guilds.connections.flags.autoTranslate,
            description: l.dashboard.guilds.connections.flags.autoTranslateDescription,
        }
    };


    useEffect(() => {
        setFlags(connection.flags);
    }, [connection.flags]);

    const handleFlagChange = async (flag: ConnectedConnectionFlags, isEnabled: boolean) => {
        const updatedFlags = isEnabled ? [...flags, flag] : flags.filter(f => f !== flag);

        setFlags(updatedFlags);

        const updatedConnection = {
            ...connection,
            flags: updatedFlags,
        };

        await api.patch(`/guilds/${guildId}/connections/${connection.name}`, {
            flags: updatedFlags,
        });

        setConnection(updatedConnection);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-lg">{l.dashboard.guilds.connections.flags.title}</h1>
                <span className="text-neutral-300">
                    {l.dashboard.guilds.connections.flags.description}
                </span>
            </div>
            <div className="gap-4 grid grid-cols-3 tablet:grid-cols-1 items-start">
                {Object.values(ConnectedConnectionFlags).map((flag, index) =>
                    (
                        flag !== ConnectedConnectionFlags.Locked
                        && flag !== ConnectedConnectionFlags.Frozen
                    ) && (
                        <div
                            key={index}
                            className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-900 
                        h-full place-content-center"
                        >
                            <div className="flex items-center gap-1">
                                <div className="relative">
                                    {connection.flags.includes(ConnectedConnectionFlags.Frozen) && (
                                        <div className="absolute top-0 left-0 w-14 h-full 
                                        bg-gradient-to-tr from-cyan-300 via-sky-200 to-sky-500 rounded-full z-50">
                                        </div>
                                    )}
                                    <Switch
                                        color="secondary"
                                        isSelected={flags.includes(flag)}
                                        onChange={e => handleFlagChange(flag, e.target.checked)}
                                    />
                                </div>
                                <span className="font-bold">{flagsDescriptions[flag].title}</span>
                            </div>
                            <span className="text-sm text-neutral-300">
                                {flagsDescriptions[flag].description}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}