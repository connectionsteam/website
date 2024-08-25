import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../../utils/api";
import {
    AuditLogActionType,
    AuditLogEntryPayload,
    AuditLogEntryChange
} from "../../../../types";
import { useLanguage } from "../../../../hooks/useLanguage";
import Avatar from "../../../Mixed/Avatar";

export default function PromotedConnectionAuditLog({ id }: { id: string }) {
    const [logs, setLogs] = useState<AuditLogEntryPayload[]>([]);
    const l = useLanguage();

    useEffect(() => {
        const fetchLogs = async () => {
            const { data: { entries } } = await api.get(`/connections/${id}/audit-logs`);
            setLogs(entries);
        };

        fetchLogs();
    }, [id]);

    const renderChangeMessage = (log: AuditLogEntryPayload, change: AuditLogEntryChange) => {
        if (change.new === undefined || change.old === undefined) return null;

        const oldChange = (
            (typeof change.old === "string" || Array.isArray(change.old))
            && change.old.length === 0)
            || change.old === ""
            || change.old === null ? undefined : change.old;
        const newChange = (
            (typeof change.new === "string" || Array.isArray(change.new))
            && change.new.length === 0)
            || change.new === ""
            || change.new === null ? undefined : change.new;

        switch (log.actionType) {
            case AuditLogActionType.TeamAdd:
                return (
                    <div className="flex gap-1">
                        <div className="flex gap-1">
                            <div className="min-w-12 min-h-12">
                                <Avatar
                                    className="w-12 h-12"
                                    src={`https://cdn.discordapp.com/avatars/${log.executorId}/${log.executor.avatar}`}
                                />
                            </div>
                            <div>
                                <strong>
                                    {log.executor.username}
                                </strong>
                                {l.dashboard.connections.auditLog.logEntry.addedTeam}
                                <strong>{newChange}</strong>
                            </div>
                        </div>
                    </div>
                );
            case AuditLogActionType.TeamRemove:
                return (
                    <div>
                        <strong>
                            {log.executor.username}
                        </strong>
                        {l.dashboard.connections.auditLog.logEntry.removedTeam}
                        <strong>{oldChange}</strong>
                    </div>
                );
            case AuditLogActionType.Privated:
                return (
                    <div>
                        <strong>{log.executor.username}</strong>
                        {l.dashboard.connections.auditLog.logEntry.privatedConnection}
                    </div>
                );
            case AuditLogActionType.ConnectionUpdate:
                switch (change.key) {
                    case "description":
                        return (
                            <div className="flex gap-1 items-center">
                                <div className="flex gap-1 items-center">
                                    <div className="min-w-8 min-h-8">
                                        <Avatar
                                            className="w-8 h-8"
                                            src={`https://cdn.discordapp.com/avatars/${log.executorId}/${log.executor.avatar}`}
                                        />
                                    </div>
                                    <div>
                                        <strong>{log.executor.username}</strong>
                                        {l.dashboard.connections.auditLog.logEntry.updateDescription}
                                        <strong>
                                            {oldChange
                                                ?? l.dashboard.connections.auditLog.logEntry.none}
                                        </strong>
                                        {l.dashboard.connections.auditLog.logEntry.for}
                                        <strong>
                                            {newChange
                                                ?? l.dashboard.connections.auditLog.logEntry.none}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        );
                    case "icon":
                        return (
                            <div className="flex gap-1 items-center">
                                <div className="flex gap-1 items-center">
                                    <div className="min-w-8 min-h-8">
                                        <Avatar
                                            className="w-8 h-8"
                                            src={`https://cdn.discordapp.com/avatars/${log.executorId}/${log.executor.avatar}`}
                                        />
                                    </div>
                                    <div className="text-neutral-300 flex items-center gap-2">
                                        <strong>{log.executor.username}</strong>
                                        {l.dashboard.connections.auditLog.logEntry.updateIcon}
                                        <Avatar className="w-10 h-10" src={oldChange as string ?? ""} />
                                        {l.dashboard.connections.auditLog.logEntry.for}
                                        <Avatar className="w-10 h-10" src={newChange as string ?? ""} />
                                    </div>
                                </div>
                            </div>
                        );
                    case "tags":
                        return (
                            <div className="flex gap-1 items-center">
                                <div className="flex gap-1 items-center">
                                    <div className="min-w-8 min-h-8">
                                        <Avatar
                                            className="w-8 h-8"
                                            src={`https://cdn.discordapp.com/avatars/${log.executorId}/${log.executor.avatar}`}
                                        />
                                    </div>
                                    <div>
                                        <strong>{log.executor.username}</strong>
                                        {l.dashboard.connections.auditLog.logEntry.updatedTags}
                                        <strong>
                                            {Array.isArray(oldChange)
                                                ? oldChange.join(", ")
                                                : oldChange ?? l.dashboard.connections.auditLog.logEntry.none}
                                        </strong>
                                        {l.dashboard.connections.auditLog.logEntry.for}
                                        <strong>
                                            {Array.isArray(newChange)
                                                ? newChange.join(", ")
                                                : newChange ?? l.dashboard.connections.auditLog.logEntry.none}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        );
                    default:
                        return null;
                }
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-4"
        >
            <div>
                <h1 className="font-bold text-xl">{l.dashboard.connections.auditLog.title}</h1>
                <div className="text-neutral-300">
                    {l.dashboard.connections.auditLog.description}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {logs.map((log, index) => (
                    <div key={index} className="bg-neutral-900/50 p-3 rounded-lg flex flex-col gap-2">
                        {log.changes.map((change, idx) => (
                            <div key={idx}>
                                {renderChangeMessage(log, change)}
                            </div>
                        ))}
                        <div className="text-neutral-300">{new Date(log.createdTimestamp).toLocaleString(l.language)}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
