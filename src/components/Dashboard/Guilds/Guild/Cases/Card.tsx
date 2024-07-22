import Avatar from "@/components/Mixed/Avatar";
import { useLanguage } from "@/hooks/useLanguage";
import { AnyCase, CaseTypes } from "@/types";
import moment from "moment";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
    caseItem: AnyCase;
    index: number;
    hovering: boolean;
    loading: boolean;
}

export default function CaseCard({ caseItem, index, hovering, loading }: Props) {
    const l = useLanguage();

    return loading ? (
        <div className="p-3 w-full bg-neutral-900/50 rounded-lg flex flex-col gap-1">
            <div className="font-bold w-full rounded-lg flex items-center ">
                <span className="flex flex-grow">{l.dashboard.guilds.cases.case} {caseItem.id}</span>
                <IoIosArrowDown />
            </div>
            <div className="flex flex-col gap-2 items-start w-full rounded-lg p-2 animate-pulse">
                <div className="bg-neutral-700 h-4 rounded-full w-72 mobile:w-full"></div>
                <div className="bg-neutral-700 h-4 rounded-full w-80 mobile:w-1/2"></div>
                <div className="bg-neutral-700 h-4 rounded-full w-80 mobile:w-1/3"></div>
                <div className="bg-neutral-700 h-4 rounded-full w-80 mobile:w-full"></div>
                <div className="bg-neutral-700 h-4 rounded-full w-32 mobile:w-24"></div>
            </div>
        </div>
    ) : hovering ? (
        <div className="p-3 w-full bg-neutral-900/50 rounded-lg flex flex-col gap-1">
            <div className="font-bold w-full rounded-lg flex items-center ">
                <span className="flex flex-grow">{l.dashboard.guilds.cases.case} {caseItem.id}</span>
                <IoIosArrowDown />
            </div>
            <div
                key={caseItem.id}
                className="flex flex-col gap-2 items-start w-full rounded-lg p-2"
            >
                <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
                    <div className="flex gap-2 items-center">
                        <Avatar
                            className="w-6 h-6"
                            src={`https://cdn.discordapp.com/avatars/${caseItem.targetId}/${caseItem.target.avatar}`}
                        />
                        <span className="font-bold">{caseItem.target.username}</span>
                    </div>
                    <span>
                        {l.dashboard.guilds.cases.was} {caseItem.type === CaseTypes.Ban
                            ? l.dashboard.guilds.cases.ban
                            : l.dashboard.guilds.cases.mute}{" "}
                        {l.dashboard.guilds.cases.by}
                    </span>
                    <div className="flex gap-2 items-center">
                        <Avatar
                            className="w-6 h-6"
                            src={`https://cdn.discordapp.com/avatars/${caseItem.moderatorId}/${caseItem.moderator.avatar}`}
                        />
                        <span className="font-bold">{caseItem.moderator.username}</span>
                    </div>
                </div>
                {caseItem.reason ? (
                    <div className="flex gap-2 items-center mobile:flex-col mobile:items-start mobile:gap-1">
                        <span className="font-bold">{l.dashboard.guilds.cases.reason}:</span>
                        <span className="text-neutral-300">{caseItem.reason}</span>
                    </div>
                ) : null}
                <span className="text-neutral-300 text-sm">
                    {moment(caseItem.createdTimestamp).fromNow()}
                </span>
            </div>
        </div>
    ) : (
        <div className="font-bold p-3 w-full bg-neutral-900/50 rounded-lg flex items-center ">
            <span className="flex flex-grow">{l.dashboard.guilds.cases.case} {caseItem.id}</span>
            <IoIosArrowDown />
        </div>
    );
}
