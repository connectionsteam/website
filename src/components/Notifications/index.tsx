import { ChangeEvent, useContext, useEffect, useState } from "react";
import ProtectedRoute from "../Mixed/ProtectedRoute";
import { api } from "../../utils/api";
import { AnimatePresence } from "framer-motion";
import { NotificationPayload, NotificationType } from "../../types";
import DefaultLayout from "../Mixed/Layout";
import { useLanguage } from "../../hooks/useLanguage";
import { Input } from "@nextui-org/input";
import { MdOutlineSync } from "react-icons/md";
import Notification from "./Notification";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationsSkeleton from "./Skeleton";
import { NotificationsContext } from "../../contexts/Notification";

export default function NotificationsComponent() {
    const l = useLanguage();
    const { notifications: notificationsContext,
        fetchNotifications,
        setNotifications: setContextNotifications
    } = useContext(NotificationsContext);
    const [notifications, setNotifications] = useState<NotificationPayload[] | null>(notificationsContext);
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setNotifications(notificationsContext);
    }, [notificationsContext, setNotifications]);

    const bulkDelete = async () => {
        setLoading(true);

        await api.post("/users/@me/inbox/bulk-delete", {
            ids: notifications!.map((not) => not.id)
        });

        setNotifications([]);
        setContextNotifications([]);

        setLoading(false);
    };

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const filter = (notification: NotificationPayload) => {
        return notification.content.toLowerCase().includes(query.toLowerCase());
    };

    const sort = (a: NotificationPayload, b: NotificationPayload) => {
        if (a.type === NotificationType.Internal && b.type !== NotificationType.Internal) return -1;
        if (a.type !== NotificationType.Internal && b.type === NotificationType.Internal) return 1;

        return b.sentTimestamp - a.sentTimestamp;
    };

    return (
        <DefaultLayout>
            <ProtectedRoute loading={<NotificationsSkeleton />}>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-3xl">{l.notifications.title}</h1>
                        <span className="text-neutral-300">{l.notifications.description}</span>
                    </div>
                    <div className="flex w-full h-full gap-1">
                        <Input classNames={{
                            inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                        }} onChange={handleChangeQuery} type="text" label={l.notifications.filter} />
                        <button
                            disabled={clicked}
                            onClick={() => {
                                setClicked(true);
                                fetchNotifications();
                                setTimeout(() => setClicked(false), 1000);
                            }}
                            className="w-14 bg-neutral-800 rounded-lg items-center flex justify-center
                            group hover:bg-neutral-700 transition disabled:hover:bg-neutral-800 disabled:opacity-50"
                        >
                            <MdOutlineSync
                                className={`${clicked ? "rotate-[360deg]" : ""} transition`}
                                size={20}
                            />
                        </button>
                    </div>
                </div>
                {notifications?.length !== 0 && (
                    <button
                        disabled={loading}
                        onClick={bulkDelete}
                        className="px-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition flex
                    gap-2 items-center disabled:hover:bg-neutral-800"
                    >
                        <span>{l.notifications.readAll}</span>
                        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
                    </button>
                )}
                <div className="flex flex-col gap-2 w-full">
                    <AnimatePresence>
                        {notifications === null ? (
                            <></>
                        ) : notifications.sort(sort).filter(filter).length === 0 ? (
                            <div className="min-h-[40vh] text-lg items-center font-bold justify-center flex text-center">
                                {query !== "" ? l.notifications.noNotifications : l.notifications.skeleton}
                            </div>
                        ) : (
                            notifications
                                .sort(sort)
                                .filter(filter)
                                .map((notification, index) => (
                                    <Notification
                                        notifications={notifications}
                                        setNotifications={setNotifications}
                                        notificationsContext={notificationsContext}
                                        setContextNotifications={setContextNotifications}
                                        key={index}
                                        index={index}
                                        notification={notification}
                                    />
                                ))
                        )}
                    </AnimatePresence>
                </div>
            </ProtectedRoute>
        </DefaultLayout>
    );
}   