import ConnectionsComponent from "@/components/Dashboard.tsx/Connections";
import Head from "next/head";

export default function GuildsPage() {
    return (
        <>
            <Head>
                <title>Connections | Connections</title>
            </Head>
            <ConnectionsComponent />
        </>
    );
}