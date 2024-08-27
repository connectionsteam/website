import { useDisclosure } from "@nextui-org/modal";
import ConnectionsComponent from "../../components/Dashboard/Connections";
import ConnectionsProtectedSkeleton from "../../components/Dashboard/Connections/Skeleton";
import GuildsComponent from "../../components/Dashboard/Guilds";
import DefaultLayout from "../../components/Mixed/Layout";
import ProtectedRoute from "../../components/Mixed/ProtectedRoute";
import type { ConnectionPayload, GuildPayload } from "../../types";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import JoinPrivateConnectionModal from "../../components/Dashboard/Connection/JoinPrivateConnection";
import { useLanguage } from "../../hooks/useLanguage";
import TeamsComponent from "../../components/Dashboard/Teams";
import DefaultTabs from "../../components/Mixed/Tabs";

export default function DashboardPage({
	query,
}: { query?: { name: string; code: string } }) {
	const l = useLanguage();
	const [connections, setConnections] = useState<ConnectionPayload[] | null>(
		null,
	);
	const [guilds, setGuilds] = useState<GuildPayload[] | null>(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [activeTab, setActiveTab] = useState("connections");

	const fetchGuilds = async () => {
		const { data } = await api.get("/users/@me/guilds");

		setGuilds(data);
	};

	const fetchConnections = async () => {
		const { data } = await api.get("/users/@me/connections");

		setConnections(data);
	};

	useEffect(() => {
		if (!query && !guilds) return;

		onOpen();
	}, [query]);

	useEffect(() => {
		Promise.all([fetchGuilds(), fetchConnections()]);
	}, []);

	const tabs = [
		{
			id: "connections",
			label: l.dashboard.connections.title,
			component: (
				<ConnectionsComponent
					connections={connections}
					setConnections={setConnections}
				/>
			),
		},
		{
			id: "guilds",
			label: l.dashboard.guilds.title,
			component: <GuildsComponent fetchGuilds={fetchGuilds} guilds={guilds} />,
		},
		{
			id: "teams",
			label: l.dashboard.teams.title,
			component: <TeamsComponent />,
		},
	];

	return (
		<ProtectedRoute loading={<ConnectionsProtectedSkeleton />}>
			<DefaultLayout className="mt-24">
				<div className="flex flex-col gap-6 w-full">
					<div className="tablet:ml-3">
						<DefaultTabs
							cursor="bg-neutral-800"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							tabs={tabs}
						/>
					</div>
					{tabs.find((t) => t.id === activeTab)?.component}
				</div>
			</DefaultLayout>
			{query && guilds && (
				<JoinPrivateConnectionModal
					guilds={guilds}
					onOpenChange={onOpenChange}
					isOpen={isOpen}
					code={query}
				/>
			)}
		</ProtectedRoute>
	);
}
