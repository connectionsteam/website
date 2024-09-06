import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import DefaultLayout from "../../../../components/Mixed/Layout";
import ProtectedRoute from "../../../../components/Mixed/ProtectedRoute";
import { api } from "../../../../utils/api";
import GuildSkeleton from "./Skeleton";
import Infos from "./Infos";
import Channels from "./Channels";
import Cases from "./Cases";
import usePremium from "../../../../hooks/usePremium";
import type {
	GuildChannelsPayload,
	GuildPayload,
	GuildThreadsPayload,
	Premium,
} from "../../../../types";
import Connections from "./Connecions";
import { useLanguage } from "../../../../hooks/useLanguage";
import Head from "next/head";
import GuildModifications from "./Modifications";
import DefaultPremiumButton from "../../../Mixed/DefaultPremiumButton";
import Avatar from "../../../Mixed/Avatar";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import ActivePremium from "./ActivePremium";
import Confetti from "react-confetti";
import GuildLogs from "./Logs";
import DefaultTabs from "../../../Mixed/Tabs";

export default function GuildComponent() {
	const router = useRouter();
	const { id } = router.query;
	const [guild, setGuild] = useState<GuildPayload>();
	const [discordGuild, setDiscordGuild] = useState<GuildPayload>();
	const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
	const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);
	const { premium, setPremium } = usePremium(guild);
	const [modifications, setModifications] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [showConfetti, setShowConfetti] = useState(false);

	const premiums = {
		0: "None",
		1: "Premium",
		2: "VIP",
	};

	const l = useLanguage();

	const [activeTab, setActiveTab] = useState("infos");

	const tabs = [
		{
			id: "infos",
			label: l.dashboard.guilds.tabs.infos,
			component: (
				<Infos
					actualGuild={discordGuild as GuildPayload}
					modifications={modifications}
					setModifications={setModifications}
					premium={premium as Premium}
					setGuild={setGuild}
					setThreads={setThreads}
					threads={threads}
					guild={guild as GuildPayload}
				/>
			),
		},
		{
			id: "channels",
			label: l.dashboard.guilds.tabs.channels,
			component: (
				<Channels
					setModifications={setModifications}
					setGuild={setGuild}
					guild={guild as GuildPayload}
					channels={channels}
				/>
			),
		},
		{
			id: "cases",
			label: l.dashboard.guilds.tabs.cases,
			component: <Cases guild={guild as GuildPayload} />,
		},
		{
			id: "connections",
			label: l.dashboard.guilds.tabs.connections,
			component: (
				<Connections
					premium={premium as Premium}
					channels={channels}
					setGuild={setGuild}
					guild={guild as GuildPayload}
				/>
			),
		},
		{
			id: "logs",
			label: "Logs",
			component: (
				<GuildLogs
					guild={guild as GuildPayload}
					setModifications={setModifications}
					actualGuild={discordGuild as GuildPayload}
					channels={channels}
					setGuild={setGuild}
				/>
			),
		},
	];

	useEffect(() => {
		if (!id) return;

		const fetchGuild = async () => {
			const { data } = await api.get(`/guilds/${id}`);

			setDiscordGuild(data);
			setGuild(data);
			setThreads(data.threads);
		};

		const fetchChannels = async () => {
			const { data } = await api.get(`/guilds/${id}/channels`);

			setChannels(data);
		};

		Promise.all([fetchGuild(), fetchChannels()]);
	}, [id]);

	return (
		<>
			<Head>
				<title>{guild?.name || "Guild"}</title>
				<meta name="og:image" content={guild?.icon} />
				<meta name="og:title" content={guild?.name} />
				<meta name="theme-color" content="#D946EF" />
			</Head>
			<DefaultLayout>
				<ProtectedRoute loading={<GuildSkeleton />}>
					{guild && discordGuild ? (
						<div className="flex flex-col w-full gap-2">
							{showConfetti && (
								<Confetti
									className="absolute w-screen h-screen"
									colors={[
										"#FFFFE0",
										"#FFFACD",
										"#FAFAD2",
										"#FFEFD5",
										"#FFE4B5",
										"#FFD700",
										"#FFC107",
										"#FFEB3B",
										"#FFEA00",
										"#FFD600",
										"#FFC300",
										"#FFB300",
										"#FFAA00",
										"#FFA000",
										"#FF8F00",
									]}
								/>
							)}
							<div
								className="flex w-full mobile:flex-col tablet:gap-4 bg-neutral-800 
							p-3 rounded-lg items-center"
							>
								<div className="flex flex-col gap-3 flex-grow">
									<div className="flex gap-3 items-center mobile:flex-col mobile:text-center">
										<div className="min-w-16 h-16">
											<Avatar
												className="w-16 h-16"
												src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
											/>
										</div>
										<div className="flex flex-col">
											<span className="font-bold text-xl">{guild.name}</span>
											<div className="text-sm text-neutral-300">{guild.id}</div>
										</div>
									</div>
									{guild.premium && (
										<div className="flex flex-col mobile:items-center">
											<div
												className="bg-gradient-to-r from-yellow-500 to-amber-400 
												bg-clip-text text-transparent font-bold text-xl"
											>
												{premiums[guild.premium.type]}
											</div>
											<span className="font-bold">
												{l.dashboard.guilds.info.premiumexpires.replace(
													"{date}",
													new Date(guild.premium.expiresAt).toLocaleDateString(
														l.language,
													),
												)}
											</span>
										</div>
									)}
								</div>
								<div>
									<DefaultPremiumButton
										onClick={onOpen}
										className="px-6"
										text={l.plans.popUp.activate}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2 w-full overflow-x-auto">
								{discordGuild && guild && threads && channels && premium && (
									<div className="flex rounded-lg overflow-x-auto relative flex-col gap-2">
										<div className="w-full relative flex items-center gap-2 overflow-x-auto">
											<DefaultTabs
												activeTab={activeTab}
												setActiveTab={setActiveTab}
												cursor="bg-neutral-800"
												tabs={tabs}
											/>
										</div>
										{tabs.find((t) => t.id === activeTab)?.component}
									</div>
								)}
								<AnimatePresence>
									{modifications && (
										<motion.div
											initial={{ opacity: 0, y: 200 }}
											animate={{ opacity: 1, y: -10 }}
											exit={{ opacity: 0, y: 200 }}
											className="fixed bottom-0 right-0 w-full flex flex-col 
                                        gap-4 items-center z-50"
										>
											<GuildModifications
												changedTab={false}
												setThreads={setThreads}
												setActualGuild={setDiscordGuild}
												setGuild={setGuild}
												actualGuild={discordGuild}
												guild={guild}
												modifications={modifications}
												setModifications={setModifications}
											/>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							<Modal
								classNames={{
									closeButton: "transition hover:bg-neutral-700",
									wrapper: "overflow-y-hidden",
									base: "max-h-screen overflow-y-auto",
								}}
								isOpen={isOpen}
								onOpenChange={onOpenChange}
							>
								<ModalContent className="bg-neutral-800 text-white">
									<ModalHeader className="pb-1">
										{l.plans.popUp.activate}
									</ModalHeader>
									<ModalBody className="mb-2">
										<ActivePremium
											premiums={premiums}
											setGuild={setGuild}
											setGuildPremium={setPremium}
											guild={guild}
											setShowConfetti={setShowConfetti}
										/>
									</ModalBody>
								</ModalContent>
							</Modal>
						</div>
					) : (
						<GuildSkeleton />
					)}
				</ProtectedRoute>
			</DefaultLayout>
		</>
	);
}
