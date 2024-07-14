import Avatar from "@/components/Mixed/Avatar";
import { useLanguage } from "@/hooks/useLanguage";
import { AnyCase, CaseTypes, DiscordMember } from "@/types";
import moment from "moment";

interface Props {
    caseItem: AnyCase;
    moderator: DiscordMember | undefined;
    target: DiscordMember | undefined;
}

export default function CaseCard({ caseItem, moderator, target }: Props) {
    const l = useLanguage();

    return (
        <div key={caseItem.id} className="flex flex-col gap-1 items-start w-full rounded-lg bg-neutral-900 p-4">
            <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
                {target ? (
                    <div className="flex gap-2 items-center">
                        <Avatar className="w-6 h-6" src={`https://cdn.discordapp.com/avatars/${target.user.id}/${target.user.avatar}`} />
                        <span className="font-bold">{target.user.username}</span>
                    </div>
                ) : (
                    <div className="font-bold">{caseItem.targetId}</div>
                )}
                <span>foi {caseItem.type === CaseTypes.Ban ? l.dashboard.guilds.cases.ban : l.dashboard.guilds.cases.mute} {l.dashboard.guilds.cases.by}</span>
                {moderator ? (
                    <div className="flex gap-2 items-center">
                        <Avatar className="w-6 h-6" src={`https://cdn.discordapp.com/avatars/${moderator.user.id}/${moderator.user.avatar}`} />
                        <span className="font-bold">{moderator.user.username}</span>
                    </div>
                ) : (
                    <div className="font-bold">{caseItem.moderatorId}</div>
                )}
            </div>
            {caseItem.reason ? (
                <div className="flex gap-2 items-center">
                    <span className="font-bold">{l.dashboard.guilds.cases.reason}:</span>
                    <span className="text-neutral-300">{caseItem.reason}</span>
                </div>
            ) : null}
            <span className="text-neutral-300 text-sm">{moment(caseItem.createdTimestamp).fromNow()}</span>
        </div>
    )
}