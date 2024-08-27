import type { ConnectionPayload } from "../../types";
import { type ReactNode, useContext } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import Avatar from "../Mixed/Avatar";
import { UserContext } from "../../contexts/User";
import DefaultButton from "../Mixed/Button";

export default function PromotedFunctionsCards({
	connection,
}: { connection: ConnectionPayload | undefined }) {
	const { user } = useContext(UserContext);
	const l = useLanguage();

	return (
		<>
			<Container delay={0}>
				<div>
					<span className="font-bold text-lg">
						{l.promote.priorityConnection.title}
					</span>
					<p className="text-neutral-300">
						{l.promote.priorityConnection.description}
					</p>
				</div>
				<div className="flex flex-col gap-3">
					<div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-lg p-0.5 relative">
						<span className="absolute -top-2 right-3 px-3 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full">
							{l.promote.priorityConnection.button}
						</span>
						<div className="flex gap-3 bg-[#1F1F1F] rounded-lg p-3 items-center">
							<div className="h-9 min-w-9">
								<Avatar className="h-9 w-9" src={connection?.icon || ""} />
							</div>
							<span className="font-semibold">
								{connection?.name ?? l.promote.priorityConnection.placeholder}
							</span>
						</div>
					</div>
					<div className="bg-[#1F1F1F] rounded-lg w-full h-12"></div>
					<div className="bg-[#1F1F1F] rounded-lg w-full h-6 rounded-b-none"></div>
				</div>
			</Container>
			<Container delay={0.3}>
				<div className="absolute -z-10 shadow-[0_0px_100px_rgba(8,_112,_184,_0.7)] shadow-rose-700 right-0 rounded-lg top-0 w-32 h-32 opacity-50"></div>
				<div>
					<span className="font-bold text-lg">{l.promote.auditLog.title}</span>
					<p className="text-neutral-300">{l.promote.auditLog.description}</p>
				</div>
				<div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-4">
					<div className="h-10 min-w-10">
						<Avatar
							className="h-10 w-10"
							src={
								user?.avatar
									? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`
									: "/avatars/spyei.png"
							}
						/>
					</div>
					<div>
						<span className="font-semibold">{user?.username ?? "Spyei"}</span>
						{l.promote.auditLog.logEntry.updatedIcon}
						<span className="font-semibold break-all">
							https://i.imgur.com/XsRaBXp_d.webp
						</span>
					</div>
				</div>
				<div className="bg-neutral-900/50 rounded-lg w-full h-16" />
				<div className="bg-neutral-900/50 rounded-lg w-full h-6 rounded-b-none" />
			</Container>
			<Container delay={0.6}>
				<div className="absolute -z-10 shadow-[0_0px_100px_rgba(8,_112,_184,_0.2)] shadow-rose-700 left-0 rounded-lg bottom-0 w-32 h-32 opacity-50" />
				<div>
					<span className="font-bold text-lg">{l.promote.metrics.title}</span>
					<p className="text-neutral-300">{l.promote.metrics.description}</p>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-bold">{l.promote.metrics.access.title}</span>
					<div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-3">
						<div className="flex gap-1 font-semibold">
							<span className="text-[#0DF228] min-w-11">+ 1.2k</span>
							<span>{l.promote.metrics.access.recentAccesses}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-bold">
						{l.promote.metrics.connections.title}
					</span>
					<div className="bg-neutral-900/50 rounded-lg w-full flex gap-2 items-center p-3 rounded-b-none">
						<div className="flex gap-1 font-semibold">
							<span className="text-[#0DF228] min-w-11">+ 465</span>
							<span>{l.promote.metrics.connections.recentConnections}</span>
						</div>
					</div>
				</div>
			</Container>
			<Container delay={0.9}>
				<div>
					<span className="font-bold text-lg">
						{l.promote.cooldownReduction.title}
					</span>
					<p className="text-neutral-300">
						{l.promote.cooldownReduction.description}
					</p>
				</div>
				<div className="flex items-center justify-center h-full flex-col gap-2">
					<div className="flex flex-col gap-1 text-center">
						<div className="text-sm text-red-500 font-semibold">
							{l.promote.cooldownReduction.before}
						</div>
						<div className="text-2xl text-[#0DF228] font-semibold">
							{l.promote.cooldownReduction.after}
						</div>
					</div>
					<DefaultButton
						notarget
						href={
							connection ? `/connection/${connection.name}` : "/connections"
						}
						pink
						className="w-40 flex items-center justify-center py-3"
						divclass="w-fit"
					>
						{l.promote.cooldownReduction.button}
					</DefaultButton>
				</div>
			</Container>
		</>
	);
}

function Container({
	children,
	classoid,
	delay,
}: { children: ReactNode; classoid?: string; delay: number }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: delay }}
			className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-lg p-0.5 relative z-20"
		>
			<div
				className={cn(
					"flex flex-col gap-2 p-4 pb-0 bg-neutral-800 rounded-lg h-full z-20",
					classoid,
				)}
			>
				{children}
			</div>
		</motion.div>
	);
}
