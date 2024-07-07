import { DiscordMember, GuildPayload } from "@/types";
import CaseCard from "./Card";

interface Props {
    guild: GuildPayload;
    members: DiscordMember[];
}

export default function Cases({ guild, members }: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-6">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl">Casos da guilda</h1>
                <span className="text-neutral-300 mb-4">
                    Aqui ficará o histórico de casos que ocorreram em sua guilda, como banimentos e timeouts.
                </span>
                <div className="w-full">
                    <div className="flex flex-col gap-4">
                        {guild.cases.map((caseItem) => {
                            const moderator = members.find((m) => m.user.id === caseItem.moderatorId);
                            const target = members.find((m) => m.user.id === caseItem.targetId);

                            return <CaseCard key={caseItem.id} caseItem={caseItem} moderator={moderator} target={target} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}