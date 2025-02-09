import { Input } from "@nextui-org/input";
import { useLanguage } from "../../../hooks/useLanguage";
import { type ChangeEvent, useState, useEffect } from "react";
import type { GuildPayload } from "../../../types";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import { LuPlusCircle } from "react-icons/lu";
import Avatar from "../../../components/Mixed/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSync } from "react-icons/md";
import Head from "next/head";
import DefaultButton from "../../Mixed/Button";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi";

const url =
	"https://discord.com/oauth2/authorize?client_id=1243234162077470802";

interface Props {
	guilds: GuildPayload[] | null;
	fetchGuilds: () => void;
}

export default function GuildsComponent({ guilds, fetchGuilds }: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const [clicked, setClicked] = useState(false);
	const l = useLanguage();

	const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleClick = () => {
		fetchGuilds();
		setClicked(true);
		setTimeout(() => {
			setClicked(false);
		}, 5000);
	};

	const filter = (guild: GuildPayload) => {
		return (
			guild.id.includes(searchQuery) ||
			guild.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	return (
		<>
			<Head>
				<title>{l.dashboard.guilds.title}</title>
			</Head>
			<div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-3xl">{l.dashboard.guilds.title}</h1>
					<span className="text-neutral-300">
						{l.dashboard.guilds.description}
					</span>
				</div>
				<div className="flex w-full h-full gap-1">
					<Input
						classNames={{
							inputWrapper:
								"rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
						}}
						onChange={handleChangeQuery}
						type="string"
						label={l.dashboard.misc.filterGuilds}
					/>
					<DefaultButton href={url} divclass="w-fit" className="w-[52px]">
						<LuPlusCircle size={20} />
					</DefaultButton>
					<button
						disabled={clicked}
						onClick={handleClick}
						className="min-w-14 bg-neutral-800 rounded-lg items-center flex justify-center
                    group hover:bg-neutral-700 transition disabled:hover:bg-neutral-800 disabled:opacity-50"
					>
						<MdOutlineSync
							className={`${clicked ? "rotate-[360deg]" : ""} transition`}
							size={20}
						/>
					</button>
				</div>
				{guilds ? (
					guilds.filter(filter).length === 0 ? (
						<div className="flex w-full items-center justify-center">
							<div className="min-h-[30vh] text-lg items-center font-bold justify-center flex text-center">
								{searchQuery === "" ? (
									<div className="flex flex-col">
										<div>{l.dashboard.guilds.noGuilds}</div>
										<div className="text-sm text-neutral-300 font-normal flex gap-1">
											<p>{l.dashboard.guilds.noGuildsDescription}</p>
											<span className="font-semibold">+</span>
										</div>
									</div>
								) : (
									l.dashboard.guilds.noGuildsFound
								)}
							</div>
						</div>
					) : (
						<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
							<AnimatePresence>
								{guilds
									.filter(filter)
									.map((guild, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: index * 0.1 }}
											className={`relative w-full ${
												"premium" in guild
													? "p-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500"
													: ""
											}`}
										>
											{"premium" in guild && (
												<div className="absolute z-10 -top-2 -left-2">
													<HiSparkles className="fill-yellow-500" size={28} />
													<StarDust />
												</div>
											)}
											<Link
												href={`/guild/${guild.id}`}
												className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition relative w-full h-full"
											>
												<Avatar
													className="w-12 h-12"
													src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
													key={guild.id}
												/>
												<div className="flex flex-col text-start">
													<span className="font-bold text-lg">{guild.name}</span>
													<span className="text-neutral-300 text-sm">
														{guild.id}
													</span>
												</div>
											</Link>
										</motion.div>
									))}
							</AnimatePresence>
						</div>
					)
				) : (
					<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
						{Array(3)
							.fill(0)
							.map((_, index) => (
								<ConnectionsSkeleton key={index} />
							))}
					</div>
				)}
			</div>
		</>
	);
}

const StarDust = () => {
	const particles = Array.from({ length: 10 });

	return (
		<>
			{particles.map((_, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 1, y: 0, x: 0 }}
					animate={{ opacity: 0, y: 50, x: (Math.random() - 0.1) * 40 }}
					transition={{
						duration: 2,
						delay: index * 0.3,
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 0.5,
					}}
				>
					<div className="absolute bg-yellow-500 h-1 w-1 rotate-45 left-2 -top-1" />
				</motion.div>
			))}
		</>
	);
};
