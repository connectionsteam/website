import { useDisclosure } from "@nextui-org/modal";
import ConnectionsComponent from "../../components/Dashboard/Connections";
import ConnectionsProtectedSkeleton from "../../components/Dashboard/Connections/Skeleton";
import GuildsComponent from "../../components/Dashboard/Guilds";
import DefaultLayout from "../../components/Mixed/Layout";
import ProtectedRoute from "../../components/Mixed/ProtectedRoute";
import { ConnectionPayload, GuildPayload } from "../../types";
import { api } from "../../utils/api";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";
import JoinPrivateConnectionModal from "../../components/Dashboard/Connection/JoinPrivateConnection";
import { useLanguage } from "../../hooks/useLanguage";
import TeamsComponent from "../../components/Dashboard/Teams";

export default function DashboardPage({ query }: { query?: { name: string, code: string } }) {
    const l = useLanguage();
    const [connections, setConnections] = useState<ConnectionPayload[] | null>(null);
    const [guilds, setGuilds] = useState<GuildPayload[] | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    return (
        <ProtectedRoute loading={<ConnectionsProtectedSkeleton />}>
            <DefaultLayout className="mt-24">
                <div className="flex w-full flex-col items-center tablet:items-start">
                    <Tabs classNames={{
                        cursor: "bg-neutral-700",
                        tabList: "bg-neutral-800",
                        base: "pl-3"
                    }} aria-label="Options">
                        <Tab
                            className="flex items-start w-full"
                            key="connections"
                            title={l.dashboard.connections.title}
                        >
                            <ConnectionsComponent
                                connections={connections}
                                setConnections={setConnections}
                            />
                        </Tab>
                        <Tab
                            className="flex items-start w-full"
                            key="guilds"
                            title={l.dashboard.guilds.title}
                        >
                            <GuildsComponent
                                fetchGuilds={fetchGuilds}
                                guilds={guilds}
                            />
                        </Tab>
                        <Tab
                            className="flex items-start w-full"
                            key="teams"
                            title={l.dashboard.teams.title}
                        >
                            <TeamsComponent/>
                        </Tab>
                    </Tabs>
                </div>
            </DefaultLayout>
            {(query && guilds) && (
                <JoinPrivateConnectionModal
                    guilds={guilds}
                    onOpenChange={onOpenChange}
                    isOpen={isOpen}
                    code={query}
                />
            )}
        </ProtectedRoute>
    )
}