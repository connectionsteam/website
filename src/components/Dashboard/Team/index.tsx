import { useContext, useEffect, useState } from "react";
import type { TeamPayload } from "../../../types";
import { api } from "../../../utils/api";
import DefaultLayout from "../../Mixed/Layout";
import Avatar from "../../Mixed/Avatar";
import DefaultTabs from "../../Mixed/Tabs";
import TeamMembers from "./Members";
import Head from "next/head";
import TeamConnections from "./Connections";
import TeamSettings from "./Settings";
import { UserContext } from "../../../contexts/User";
import TeamSkeleton from "./Skeleton";
import { useLanguage } from "../../../hooks/useLanguage";
import TeamAuditLog from "./AuditLog";

export default function TeamPageComponent({ teamId }: { teamId: string }) {
	const [team, setTeam] = useState<TeamPayload>();
	const l = useLanguage();
	const [activeTab, setActiveTab] = useState("members");
	const { user } = useContext(UserContext);
	const tabs = [
		{
			id: "members",
			label: l.dashboard.teams.tabs.members,
			component: (
				<TeamMembers
					teamID={teamId}
					setTeam={setTeam}
					team={team as TeamPayload}
				/>
			),
		},
		{
			id: "connections",
			label: l.dashboard.teams.tabs.connections,
			component: (
				<TeamConnections
					teamID={teamId}
					setTeam={setTeam}
					team={team as TeamPayload}
				/>
			),
		},
		{
			id: "AudiLog",
			label: l.dashboard.teams.tabs.auditLog,
			component: (
				<TeamAuditLog
					connections={team?.children}
					id={teamId}
				/>
			),
		}
	];

	if (team?.creatorId === user?.id)
		tabs.push({
			id: "settings",
			label: l.dashboard.teams.tabs.settings,
			component: (
				<TeamSettings
					teamID={teamId}
					setTeam={setTeam}
					team={team as TeamPayload}
					setActiveTab={setActiveTab}
				/>
			),
		});

	useEffect(() => {
		if (!teamId) return;

		const fetchTeam = async () => {
			const { data } = await api.get(`/teams/${teamId}`);

			setTeam(data);
		};

		fetchTeam();
	}, [teamId]);

	return (
		<DefaultLayout>
			<Head>
				<title>{team?.name || "Team"}</title>
			</Head>
			{team ? (
				<div className="flex flex-col gap-2 w-full">
					<div className="bg-neutral-800 p-3 rounded-lg w-full">
						<div className="flex gap-3 items-center">
							{team.iconURL && (
								<div className="h-20 w-20">
									<Avatar className="w-20 h-20" src={team.iconURL} />
								</div>
							)}
							<div className="flex flex-col gap-1">
								<h1 className="font-bold text-2xl">{team.name}</h1>
								{team.members.length !== 0 && (
									<span className="text-neutral-300">
										{team.members.length}{" "}
										{team.members.length > 1 ? "Members" : "Member"}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="w-full relative flex items-center gap-2">
						<DefaultTabs
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							cursor="bg-neutral-800"
							tabs={tabs}
						/>
					</div>
					{tabs.find((t) => t.id === activeTab)?.component}
				</div>
			) : (
				<TeamSkeleton />
			)}
		</DefaultLayout>
	);
}
