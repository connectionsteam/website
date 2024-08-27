import { LuExternalLink } from "react-icons/lu";
import { type NotificationPayload, NotificationType } from "../../types";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { api } from "../../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
	notification: NotificationPayload;
	index: number;
	notifications: NotificationPayload[] | null;
	setNotifications: (notifications: NotificationPayload[] | null) => void;
	notificationsContext: NotificationPayload[] | null;
	setContextNotifications: (notifications: NotificationPayload[]) => void;
}

export default function Notification({
	notification,
	index,
	notifications,
	setNotifications,
	notificationsContext,
	setContextNotifications,
}: Props) {
	const l = useLanguage();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState({
		load: false,
		loader: "",
	});
	const { push } = useRouter();

	const date = new Date(notification.sentTimestamp).toLocaleString(l.language);

	const handleJoinTeam = (teamId: string, notId: string) => async () => {
		try {
			setLoading({
				load: true,
				loader: "joinTeam",
			});

			await api.put(`/teams/${teamId}/join`);

			await api.post("/users/@me/inbox/bulk-delete", {
				ids: [notId],
			});

			push(`/dashboard/team/${teamId}`);

			setLoading({
				load: false,
				loader: "joinTeam",
			});
		} catch {
			setError(true);
			setLoading({
				load: false,
				loader: "joinTeam",
			});
		}
	};

	const handleDecline = (id: string) => async () => {
		setLoading({
			load: true,
			loader: "decline",
		});

		await api.post("/users/@me/inbox/bulk-delete", {
			ids: [id],
		});

		setNotifications(notifications!.filter((not) => not.id !== id));
		setContextNotifications(
			notificationsContext!.filter((not) => not.id !== id),
		);

		setLoading({
			load: false,
			loader: "decline",
		});
	};

	const renderNotificationContent = {
		[NotificationType.Reply]: (notification: NotificationPayload) => (
			<>
				<span>{notification.content}</span>
				{"messageURL" in notification && (
					<a
						href={notification.messageURL}
						target="_blank"
						className="p-2 px-3 rounded-lg transition bg-neutral-900/50 
                        hover:bg-neutral-900 w-fit flex gap-2 items-center"
						rel="noreferrer"
					>
						<span>{l.notifications.seeMessage}</span>
						<LuExternalLink />
					</a>
				)}
				<span className="text-sm text-neutral-400">{date}</span>
			</>
		),
		[NotificationType.TeamInvite]: (notification: NotificationPayload) =>
			"teamId" in notification && (
				<>
					<span>{notification.content}</span>
					<div className="flex gap-1">
						<button
							disabled={loading.loader === "joinTeam" && loading.load}
							onClick={handleJoinTeam(notification.teamId, notification.id)}
							className="bg-green-500 hover:bg-green-600 rounded-lg px-3 p-2 transition
                        disabled:hover:bg-green-500"
						>
							{loading.loader === "joinTeam" && loading.load ? (
								<AiOutlineLoading3Quarters className="animate-spin" />
							) : (
								<span>{l.notifications.accept}</span>
							)}
						</button>
						<button
							disabled={loading.loader === "decline" && loading.load}
							onClick={handleDecline(notification.id)}
							className="bg-red-500 hover:bg-red-600 rounded-lg px-3 p-2 transition
                        disabled:hover:bg-red-500"
						>
							{loading.loader === "decline" && loading.load ? (
								<AiOutlineLoading3Quarters className="animate-spin" />
							) : (
								<span>{l.notifications.decline}</span>
							)}
						</button>
					</div>
					{error && (
						<span className="text-red-500">{l.notifications.inviteError}</span>
					)}
					<span className="text-sm text-neutral-400">{date}</span>
				</>
			),
		[NotificationType.Backup]: (notification: NotificationPayload) => (
			<>
				<div className="bg-amber-500 rounded-lg absolute -top-2 right-2 px-2">
					<span>Premium</span>
				</div>
				<div className="bg-neutral-800 rounded-lg p-3 flex flex-col gap-2">
					<span>{notification.content}</span>
					<span className="text-sm text-neutral-400">{date}</span>
					<a
						href={"/dasjk"}
						target="_blank"
						className="p-2 px-3 rounded-lg transition bg-neutral-900/50 
                        hover:bg-neutral-900 w-fit flex gap-2 items-center"
						rel="noreferrer"
					>
						<span>{l.notifications.goToBackup}</span>
						<LuExternalLink />
					</a>
				</div>
			</>
		),
		[NotificationType.Internal]: (notification: NotificationPayload) => (
			<>
				<div className="bg-indigo-500 rounded-lg absolute -top-2 right-2 px-2">
					<span>{l.notifications.team}</span>
				</div>
				<div className="bg-neutral-800 rounded-lg p-3 flex flex-col gap-2">
					<span className="text-neutral-300">{notification.content}</span>
					<span className="text-sm text-neutral-400">{date}</span>
				</div>
			</>
		),
		[NotificationType.PromotedCode]: (notification: NotificationPayload) => (
			<>
				<div className="bg-neutral-800 rounded-lg p-3 flex flex-col gap-2">
					<span>{notification.content}</span>
					{"codeId" in notification && (
						<div className="flex gap-1 items-center text-center">
							<span className="font-semibold">
								{l.notifications.promotedCode}
							</span>
							<span className="bg-clip-text bg-gradient-to-r from-pink-500 to-rose-700 text-transparent">
								{notification.codeId}
							</span>
						</div>
					)}
					<span className="text-sm text-neutral-400">{date}</span>
				</div>
			</>
		),
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -5 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 5 }}
			transition={{ duration: 0.2, delay: index * 0.1 }}
			className={
				notification.type === NotificationType.Internal
					? "bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg p-0.5 flex flex-col gap-2 relative"
					: notification.type === NotificationType.Backup
						? "bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-0.5 flex flex-col gap-2 relative"
						: notification.type === NotificationType.PromotedCode
							? "bg-gradient-to-r from-pink-500 to-rose-700 rounded-lg p-0.5 flex flex-col gap-2 relative"
							: "w-full bg-neutral-800 rounded-lg p-3 flex flex-col gap-2"
			}
		>
			{renderNotificationContent[notification.type](notification)}
		</motion.div>
	);
}
