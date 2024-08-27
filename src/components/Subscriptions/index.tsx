import { useEffect, useState } from "react";
import DefaultLayout from "../Mixed/Layout";
import Link from "next/link";
import Avatar from "../Mixed/Avatar";
import Head from "next/head";
import { api } from "../../utils/api";
import type {
	ConnectionSubscriptionPayload,
	GuildSubscriptionPayload,
	SubscriptionsPayload,
} from "../../types";
import SubscriptionSkeleton from "./Skeleton";
import DefaultButton from "../Mixed/Button";
import { useLanguage } from "../../hooks/useLanguage";
import { IoIosArrowForward } from "react-icons/io";

export default function SubscriptionsComponent() {
	const l = useLanguage();
	const [query, setQuery] = useState({
		premium: "",
		promoted: "",
	});
	const [subscriptions, setSubscriptions] = useState<SubscriptionsPayload>();

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const { data } = await api.get("/users/@me/subscriptions");

			setSubscriptions(data);
		};

		fetchSubscriptions();
	}, []);

	const connectionsFilter = (connection: ConnectionSubscriptionPayload) => {
		const inputquery = query.promoted.toLowerCase();

		return (
			connection.name.toLowerCase().includes(inputquery) ||
			connection.description?.toLowerCase().includes(inputquery)
		);
	};

	const guildFilter = (guild: GuildSubscriptionPayload) => {
		const inputquery = query.premium.toLowerCase();

		return (
			guild.name.toLowerCase().includes(inputquery) ||
			guild.id.includes(inputquery)
		);
	};

	return (
		<DefaultLayout>
			<Head>
				<title>Connections - Subscriptions</title>
			</Head>
			<div className="flex flex-col gap-6 w-full items-center justify-center text-center">
				<div>
					<h1 className="text-4xl font-bold">{l.subscriptions.title}</h1>
					<span className="text-neutral-300">
						{l.subscriptions.description}
					</span>
				</div>
				{subscriptions ? (
					<div className="flex gap-3 w-full items-start justify-center tablet:flex-col">
						<div className="p-0.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-700 w-full">
							<div className="flex flex-col gap-3 w-full items-center justify-center bg-neutral-800 p-3 rounded-lg">
								<div>
									<span
										className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 
                                to-rose-700 font-bold text-3xl"
									>
										Promoted
									</span>
									<p className="text-neutral-300">
										{l.subscriptions.youhave}{" "}
										<strong>{subscriptions.connections.length}</strong>{" "}
										{subscriptions.connections.length === 1
											? l.subscriptions.promoted.connection
											: l.subscriptions.promoted.connections}
									</p>
								</div>
								<input
									value={query.promoted}
									onChange={(e) =>
										setQuery({ ...query, promoted: e.target.value })
									}
									placeholder={l.subscriptions.promoted.search}
									className="rounded-lg p-3 outline-none bg-neutral-900/50 w-full"
								/>
								<div className="flex flex-col gap-2 w-full overflow-y-auto max-h-48 h-48">
									{subscriptions.connections.filter(connectionsFilter)
										.length === 0 ? (
										<div className="h-full flex items-center justify-center text-center font-semibold text-lg">
											{query.promoted === ""
												? l.subscriptions.promoted.nopromoted
												: l.subscriptions.promoted.nosearch}
										</div>
									) : (
										subscriptions.connections
											.filter(connectionsFilter)
											.map((subscription, index) => (
												<Link
													key={index}
													href={`/dashboard/connection/${subscription.name}`}
													className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition relative w-full"
												>
													<Avatar
														className="w-12 h-12"
														src={subscription.icon || ""}
													/>
													<div className="flex flex-col text-start">
														<span className="font-bold text-lg">
															{subscription.name}
														</span>
														{subscription.description && (
															<span className="text-neutral-300 text-sm">
																{subscription.description.length > 30
																	? subscription.description.slice(0, 30) +
																		"..."
																	: subscription.description}
															</span>
														)}
													</div>
												</Link>
											))
									)}
								</div>
							</div>
						</div>
						<div className="p-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-700 w-full">
							<div className="flex flex-col gap-3 w-full items-center justify-center bg-neutral-800 p-3 rounded-lg">
								<div>
									<span
										className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 
                                    to-yellow-700 font-bold text-3xl"
									>
										Premium
									</span>
									<p className="text-neutral-300">
										{l.subscriptions.youhave}{" "}
										<strong>{subscriptions.connections.length}</strong>{" "}
										{subscriptions.connections.length === 1
											? l.subscriptions.premium.connection
											: l.subscriptions.premium.connections}
									</p>
								</div>
								<input
									value={query.premium}
									onChange={(e) =>
										setQuery({ ...query, premium: e.target.value })
									}
									placeholder={l.subscriptions.premium.search}
									className="rounded-lg p-3 outline-none bg-neutral-900/50 w-full"
								/>
								<div className="flex flex-col gap-2 w-full overflow-y-auto max-h-48 h-48">
									{subscriptions.guilds.filter(guildFilter).length === 0 ? (
										<div className="h-full flex items-center justify-center text-center font-semibold text-lg">
											{query.premium === ""
												? l.subscriptions.premium.nopremium
												: l.subscriptions.premium.nosearch}
										</div>
									) : (
										subscriptions.guilds
											.filter(guildFilter)
											.map((guild, index) => (
												<Link
													key={index}
													href={`/guild/${guild.id}`}
													className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition relative w-full"
												>
													<Avatar
														className="w-12 h-12"
														src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
														key={guild.name}
													/>
													<div className="flex flex-col text-start">
														<span className="font-bold text-lg">
															{guild.name}
														</span>
														<span className="text-neutral-300 text-sm">
															{guild.id}
														</span>
													</div>
												</Link>
											))
									)}
								</div>
							</div>
						</div>
					</div>
				) : (
					<SubscriptionSkeleton />
				)}
				<div className="flex flex-col gap-4">
					<div>
						<h1 className="text-4xl font-bold">
							{l.subscriptions.plans.title}
						</h1>
						<span className="text-neutral-300">
							{l.subscriptions.plans.description}
						</span>
					</div>
					<div className="flex gap-2 w-full tablet:flex-col">
						<div className="flex flex-col gap-2 items-center text-center mobile:px-2 justify-center">
							<div className="flex items-end gap-2 mobile:flex-col mobile:items-start">
								<span className="text-3xl mobile:text-2xl font-bold text-center">
									Connections
								</span>
								<h1 className="mobile:text-4xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-700">
									Promoted
								</h1>
							</div>
							<div className="max-w-[70%]">
								<span className="text-neutral-30">{l.plans.promoted}</span>
							</div>
							<div className="max-w-60 mt-4 tablet:w-full tablet:max-w-[350px] mobile:min-w-[328px] mobile:px-2 w-full items-center flex">
								<DefaultButton
									pink
									href="/promote"
									notarget
									className="p-3 group"
								>
									<span>{l.plans.seehow}</span>
									<IoIosArrowForward className="group-hover:translate-x-2 transition-all" />
								</DefaultButton>
							</div>
						</div>
						<div className="flex flex-col gap-2 items-center text-center mobile:px-2 justify-center">
							<div className="flex items-end gap-2 mobile:flex-col mobile:items-start">
								<span className="text-3xl mobile:text-2xl font-bold text-center">
									Connections
								</span>
								<h1 className="mobile:text-4xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
									Premium
								</h1>
							</div>
							<div className="max-w-[70%]">
								<span className="text-neutral-30">{l.plans.description}</span>
							</div>
							<div className="max-w-60 mt-4 tablet:w-full tablet:max-w-[350px] mobile:min-w-[328px] mobile:px-2 w-full items-center flex">
								<DefaultButton href="/premium" notarget className="p-3 group">
									<span>{l.plans.seeplans}</span>
									<IoIosArrowForward className="group-hover:translate-x-2 transition-all" />
								</DefaultButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}

// eu sei que dava para repetir o .filter to sem tempo
