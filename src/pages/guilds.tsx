import GuildsComponent from "@/components/Dashboard.tsx/Guilds";
import Head from "next/head";

export default function GuildsPage() {
    return (
        <>
            <Head>
                <title>Connections | Guilds</title>
            </Head>
            <GuildsComponent />
        </>
    );
}