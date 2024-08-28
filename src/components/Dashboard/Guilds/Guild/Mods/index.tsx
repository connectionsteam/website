"use client";
import DefaultButton from "../../../../../components/Mixed/Button";
import {
	type DiscordMember,
	type GuildPayload,
	ModPermType,
	type Premium,
} from "../../../../../types";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { useContext, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { api } from "../../../../../utils/api";
import GuildModCard from "./Card";
import GuildModModal from "./Modal";
import { UserContext } from "../../../../../contexts/User";
import { useLanguage } from "../../../../../hooks/useLanguage";
import PremiumPopUp from "../../../../../components/Premium/PopUp";
import { AnimatePresence } from "framer-motion";

interface Props {
	guild: GuildPayload;
	setGuild: (guild: GuildPayload) => void;
	premium: Premium;
	setModifications: (modifications: boolean) => void;
	actualGuild: GuildPayload;
}

export interface MenuProps {
	hover: string | null;
	removing: string | null;
}

export default function GuildMods({
	guild,
	setGuild,
	premium,
	setModifications,
	actualGuild,
}: Props) {
	const l = useLanguage();

	const { user } = useContext(UserContext);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const {
		isOpen: isPremiumOpen,
		onOpen: onPremiumOpen,
		onOpenChange: onPremiumChange,
		onClose: onPremiumClose,
	} = useDisclosure();
	const [menu, setMenu] = useState<MenuProps>({
		hover: null,
		removing: null,
	});
	const [sonner, setSonner] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [members, setMembers] = useState<DiscordMember[] | null>(null);

	const handleAddMod = async (mod: DiscordMember) => {
		if (guild.mods.length >= premium.maxMods) {
			setSonner(false);
			setTimeout(() => setSonner(true), 0);

			return onPremiumOpen();
		}

		if (mod.user.id === "") return;

		setModifications(true);

		onClose();
		setGuild({
			...guild,
			mods: [
				...guild.mods,
				{
					id: mod.user.id,
					type: ModPermType.TrustedAdmin,
					username: mod.user.username,
					avatar: mod.user.avatar,
				},
			],
		});
	};

	const handleRemoveMod = async (mod: string) => {
		setMenu({ ...menu, removing: mod });

		setModifications(true);

		const filtredMods = guild.mods.filter((moda) => moda.id !== mod);

		setGuild({
			...guild,
			mods: filtredMods,
		});

		setMenu({ ...menu, removing: null });
	};

	const fetchMembers = async () => {
		onOpen();
		if (loaded) return;

		const { data } = await api.get(`/guilds/${guild.id}/members?limit=1000`);

		setMembers(data);
		setLoaded(true);
	};

	return (
		<>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<div className="flex gap-1 items-end">
						<h1 className="font-semibold text-xl">
							{l.dashboard.guilds.mods.title}
						</h1>
						<div className="text-neutral-300">
							{guild.mods.length}/<span>{premium.maxMods}</span>
						</div>
					</div>
					<span className="text-neutral-300">
						{l.dashboard.guilds.mods.description}
					</span>
				</div>
				<div className="flex flex-col gap-2 min-w-72 tablet:min-w-full">
					<div className="flex flex-col gap-2 w-full max-h-64 overflow-x-hidden">
						{guild.mods.map((mod, index) => (
							<AnimatePresence mode="wait" key={index}>
								<GuildModCard
									guild={guild}
									key={index}
									setMenu={setMenu}
									index={index}
									mod={{
										avatar: mod.avatar,
										id: mod.id,
										username: mod.username,
									}}
									handleRemoveMod={handleRemoveMod}
									menu={menu}
								/>
							</AnimatePresence>
						))}
					</div>
					{guild.mods.find((mod) => mod.id === user?.id) && (
						<DefaultButton onClick={fetchMembers} className="h-full w-full p-4">
							<LuPlusCircle size={20} />
							<span>{l.dashboard.guilds.mods.addModerator}</span>
						</DefaultButton>
					)}
				</div>
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
					<ModalHeader className="flex flex-col gap-1 bg-neutral-800 pb-0">
						{l.dashboard.guilds.mods.addModerator}
					</ModalHeader>
					<ModalBody>
						<GuildModModal
							setModifications={setModifications}
							members={members}
							handleAddMod={handleAddMod}
							guild={guild}
						/>
					</ModalBody>
				</ModalContent>
				<PremiumPopUp
					isOpen={isPremiumOpen}
					sonner={sonner}
					onChange={onPremiumChange}
					onClose={onPremiumClose}
					limitText={l.limits.mods}
					limit={premium.maxMods === 10}
					text={l.limits.modsText}
				/>
			</Modal>
		</>
	);
}
