import ConnectionsComponent from "@/components/Dashboard/Connections";
import ConnectionsProtectedSkeleton from "@/components/Dashboard/Connections/Skeleton";
import GuildsComponent from "@/components/Dashboard/Guilds";
import DefaultLayout from "@/components/Mixed/Layout";
import ProtectedRoute from "@/components/Mixed/ProtectedRoute";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import { ConnectionPayload, GuildPayload } from "@/types";
import { api } from "@/utils/api";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useContext, useEffect, useState } from "react";

export default function DashboardPage() {
    const { language } = useContext(LanguageContext);
    const [connections, setConnections] = useState<ConnectionPayload[] | null>(null);
    const [guilds, setGuilds] = useState<GuildPayload[] | null>(null);

    const fetchGuilds = async () => {
        const { data } = await api.get("/users/@me/guilds");

        setGuilds(data);
    };

    useEffect(() => {
        const fetchConnections = async () => {
            const { data } = await api.get("/users/@me/connections");

            setConnections(data);
        };
        
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
                            title={languages[language].dashboard.connections.title}
                        >
                            <ConnectionsComponent
                                connections={connections}
                                setConnections={setConnections}
                            />
                        </Tab>
                        <Tab
                            className="flex items-start w-full"
                            key="guilds"
                            title={languages[language].dashboard.guilds.title}
                        >
                            <GuildsComponent
                                fetchGuilds={fetchGuilds}
                                guilds={guilds}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </DefaultLayout>
        </ProtectedRoute>
    )
}