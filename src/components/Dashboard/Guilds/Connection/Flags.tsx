import { ConnectedConnectionFlags, ConnectedConnectionPayload, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";

interface Props {
    guild: GuildPayload;
    connection: ConnectedConnectionPayload;
    setConnection: (connection: ConnectedConnectionPayload) => void;
    setGuild: (guild: GuildPayload) => void;
}

export default function GuildConnectionFlags({ connection, guild, setConnection, setGuild }: Props) {
    const [flags, setFlags] = useState(connection.flags || []);

    const flagsDescriptions: Record<ConnectedConnectionFlags, { title: string, description: string }> = {
        [ConnectedConnectionFlags.Locked]: {
            title: "Conexão bloqueada",
            description: "Conexão bloqueada por moderadores, a conexão não pode receber e nem enviar mensagens",
        },
        [ConnectedConnectionFlags.Frozen]: {
            title: "Conexão congelada",
            description: "Conexão congelada por moderadores, a conexão não pode ser editada",
        },
        [ConnectedConnectionFlags.AllowFiles]: {
            title: "Permitir arquivos",
            description: "Permitir envio de arquivos",
        },
        [ConnectedConnectionFlags.AllowInvites]: {
            title: "Permitir convites",
            description: "Permitir convites de outros servidores",
        },
        [ConnectedConnectionFlags.AllowLinks]: {
            title: "Permitir links",
            description: "Permitir links nas mensagens enviadas",
        },
        [ConnectedConnectionFlags.NoIndentification]: {
            title: "Não identificar servidor",
            description: "Não identificar nome do servidor",
        },
        [ConnectedConnectionFlags.AllowOrigin]: {
            title: "Permitir origem",
            description: "Permitir aparecer informações do servidor da mensagem enviada, como nome e id",
        },
        [ConnectedConnectionFlags.AllowEmojis]: {
            title: "Permitir emojis",
            description: "Permitir somente emojis do discord",
        },
        [ConnectedConnectionFlags.CompactModeEnabled]: {
            title: "Modo compacto ativado",
            description: "Mensagem mais compacta a ser enviada",
        },
    };

    const handleFlagChange = async (flag: ConnectedConnectionFlags, isEnabled: boolean) => {
        const flasgsSpread = [...flags, flag];
        const flagsternary = isEnabled ? flasgsSpread : flasgsSpread.filter(f => f !== flag);

        if (isEnabled) {
            setFlags([...flags, flag]);
        } else {
            setFlags(flags.filter(f => f !== flag));
        }

        await api.patch(`/guilds/${guild.id}/connections/${connection.name}`, {
            flags: flagsternary,
        });

        setConnection({
            ...connection,
            flags: flagsternary,
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-lg">Flags</h1>
                <span className="text-neutral-300">
                    Selecione abaixo quais flags você deseja ativar para a conexão, ou desabilite qualquer que desejar.
                </span>
            </div>
            <div className="gap-4 grid grid-cols-3 tablet:grid-cols-1 items-start">
                {Object.values(ConnectedConnectionFlags).map((flag, index) => (
                    <div key={index} className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-900 h-full place-content-center">
                        <div className="flex items-center gap-1">
                            <div className="relative">
                                {(connection.flags.includes(ConnectedConnectionFlags.Frozen) && flag !== ConnectedConnectionFlags.Frozen) && (
                                    <div className="absolute top-0 left-0 w-14 h-full bg-gradient-to-tr from-cyan-300 via-sky-200 to-sky-500 rounded-full z-50"></div>
                                )}
                                <Switch
                                    color="secondary"
                                    isSelected={flags.includes(flag)}
                                    onChange={e => handleFlagChange(flag, e.target.checked)}
                                />
                            </div>
                            <span className="font-bold">{flagsDescriptions[flag].title}</span>
                        </div>
                        <span className="text-sm text-neutral-300">{flagsDescriptions[flag].description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
