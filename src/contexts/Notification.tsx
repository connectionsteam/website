"use client";
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { NotificationPayload } from "../types";
import { api } from "../utils/api";

interface Props {
	notifications: NotificationPayload[] | null;
	fetchNotifications: () => void;
	setNotifications: (notifications: NotificationPayload[]) => void;
}

export const NotificationsContext = createContext<Props>({
	notifications: null,
	setNotifications: () => null,
	fetchNotifications: () => null,
});

export const NotificationsProvider = ({
	children,
}: { children: ReactNode }) => {
	const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

	const fetchNotifications = async () => {
		const { data } = await api.get("/users/@me/inbox");

		setNotifications(data);
	};

	useEffect(() => {
		fetchNotifications();
	}, []);

	return (
		<NotificationsContext.Provider
			value={{ notifications, setNotifications, fetchNotifications }}
		>
			{children}
		</NotificationsContext.Provider>
	);
};
