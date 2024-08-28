import { useEffect, useState } from "react";
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
	GuildTab,
	GuildThreadsPayload,
	Language,
	TabState,
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

export default function GuildComponent() {
	const router = useRouter();
	const { id } = router.query;
	const [guild, setGuild] = useState<GuildPayload>();
	const [discordGuild, setDiscordGuild] = useState<GuildPayload>();
	const [channels, setChannels] = useState<GuildChannelsPayload[]>([]);
	const [threads, setThreads] = useState<GuildThreadsPayload[]>([]);
	const { premium, setPremium } = usePremium(guild);
	const [modifications, setModifications] = useState(false);
	const [changedTab, setChangedTab] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [showConfetti, setShowConfetti] = useState(false);

	const premiums = {
		0: "None",
		1: "Premium",
		2: "VIP",
	};

	const l = useLanguage();

	const [tab, setTab] = useState<TabState>({
		tabs: [],
		selected: "infos",
		connection: false,
	});

	const handleChangeTab = (selected: string) => {
		if (modifications) {
			setChangedTab(true);

			return setTimeout(() => {
				setChangedTab(false);
			}, 1000);
		}

		setTab({
			...tab,
			connection: false,
			selected,
		});
	};

	const createTabs = () => {
		if (guild && threads && premium && discordGuild) {
			return [
				{
					value: "infos",
					title: l.dashboard.guilds.tabs.infos,
					content: (
						<Infos
							channels={channels}
							actualGuild={discordGuild}
							modifications={modifications}
							setModifications={setModifications}
							premium={premium}
							setGuild={setGuild}
							setThreads={setThreads}
							threads={threads}
							guild={guild}
						/>
					),
				},
				{
					value: "channels",
					title: l.dashboard.guilds.tabs.channels,
					content: (
						<Channels setGuild={setGuild} guild={guild} channels={channels} />
					),
				},
				{
					value: "cases",
					title: l.dashboard.guilds.tabs.cases,
					content: <Cases guild={guild} />,
				},
				{
					value: "connections",
					title: l.dashboard.guilds.tabs.connections,
					content: (
						<Connections
							premium={premium}
							channels={channels}
							setGuild={setGuild}
							guild={guild}
						/>
					),
				},
			];
		}

		return [];
	};

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

	useEffect(() => {
		setTab((prevTab) => ({
			...prevTab,
			tabs: createTabs(),
		}));
	}, [guild, threads, channels, premium, l.language]);

	const animations = (
		t: { value: string },
		language: Language,
		selectedTab: GuildTab,
		connection: boolean,
	) => {
		const pxs: Record<Language, Record<GuildTab, string>> = {
			"pt-BR": {
				channels: "75px",
				cases: "75px",
				connections: "110px",
				infos: "120px",
				width: "75px",
			},
			"en-US": {
				channels: "96px",
				cases: "75px",
				connections: "120px",
				infos: "125px",
				width: "95px",
			},
		};

		const position: Record<Language, Record<GuildTab, number>> = {
			"pt-BR": {
				channels: 130,
				cases: 212,
				connections: 290,
				infos: 0,
				width: 290,
			},
			"en-US": {
				channels: 130,
				cases: 232,
				connections: 313,
				infos: 0,
				width: 290,
			},
		};

		if (connection)
			return {
				width: pxs[language]["connections"],
				x: position[language]["connections"],
			};

		const width = pxs[language][selectedTab];
		const x = position[language][selectedTab];

		return { width, x };
	};

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
										<div className="flex flex-col">
											<div
												className="bg-gradient-to-r from-yellow-500 to-amber-400 
												bg-clip-text text-transparent font-bold text-lg"
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
							<div className="flex flex-col gap-2 w-full overflow-x-hidden">
								<div className="flex rounded-lg py-1 overflow-x-auto relative">
									{tab.tabs.map((t) => (
										<>
											<button
												onClick={() => handleChangeTab(t.value)}
												className={`text-white px-4 rounded-lg py-2 
                                        cursor-pointer transition-colors duration-300 
                                        gap-2 flex z-20`}
											>
												<span>{t.title}</span>
											</button>
											<motion.div
												key={t.value}
												animate={animations(
													t,
													l.language,
													tab.selected as GuildTab,
													tab.connection,
												)}
												transition={{
													type: "spring",
													bounce: 0.3,
													duration: 0.5,
												}}
												className="absolute bg-neutral-800 z-10 h-[84%] 
                                        w-12 rounded-lg -translate-y-1/2 -translate-x-1"
											></motion.div>
										</>
									))}
								</div>
								<div className="overflow-x-hidden">
									{tab.tabs.map((t) =>
										tab.selected === t.value ? (
											<motion.div
												key={t.value}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
											>
												{t.content}
											</motion.div>
										) : null,
									)}
								</div>
								<AnimatePresence>
									{modifications && (
										<motion.div
											initial={changedTab ? {} : { opacity: 0, y: 200 }}
											animate={
												changedTab
													? {
															x: [0, -10, 10, -10, 10, -5, 5, 0],
															transition: {
																duration: 0.4,
																ease: "easeInOut",
															},
														}
													: { opacity: 1, y: -10 }
											}
											transition={
												changedTab
													? {
															repeat: Number.POSITIVE_INFINITY,
															repeatType: "loop",
														}
													: undefined
											}
											exit={{ opacity: 0, y: 200 }}
											className="fixed bottom-0 right-0 w-full flex flex-col 
                                        gap-4 items-center z-50"
										>
											<GuildModifications
												setThreads={setThreads}
												setActualGuild={setDiscordGuild}
												changedTab={changedTab}
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
