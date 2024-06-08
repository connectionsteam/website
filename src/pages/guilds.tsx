import GuildsComponent from "@/components/Dashboard/Guilds";
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