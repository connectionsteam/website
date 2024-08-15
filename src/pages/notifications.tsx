import Head from "next/head";
import NotificationsComponent from "../components/Notifications";

export default function NotificationsPage() {
    return (
        <>
            <Head>
                <title>Connections | Notifications</title>
            </Head>
            <NotificationsComponent />
        </>
    );
}