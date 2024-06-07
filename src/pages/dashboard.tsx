import DashboardComponent from "@/components/Dashboard.tsx";
import Head from "next/head";

export default function DashboardPage() {
    return (
        <>
            <Head>
                <title>Connections | Dashboard</title>
            </Head>
            <DashboardComponent />
        </>
    );
}