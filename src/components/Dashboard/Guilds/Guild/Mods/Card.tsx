import { motion } from "framer-motion";
import RemoveGuildMod from "./Menu";
import Avatar from "../../../../../components/Mixed/Avatar";
import { type GuildPayload, ModPermType, ModType } from "../../../../../types";
import { UserContext } from "../../../../../contexts/User";
import { useContext } from "react";

interface Props {
	index: number;
	mod: { username: string; id: string; avatar: string };
	handleRemoveMod: (mod: string) => void;
	menu: { hover: string | null; removing: string | null };
	setMenu: (menu: { hover: string | null; removing: string | null }) => void;
	owner: ModType;
}

export default function GuildModCard({
	owner,
	index,
	mod,
	handleRemoveMod,
	menu,
	setMenu,
}: Props) {
	const { user } = useContext(UserContext);

	return (
		menu.removing !== mod.id && (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, x: -20 }}
				onMouseEnter={() => setMenu({ ...menu, hover: mod.id })}
				onMouseLeave={() => setMenu({ ...menu, hover: "" })}
				key={index}
				className="w-full relative"
			>
				{owner && mod.id !== user?.id && (
					<>
						<div className="w-full relative tabletdesk:invisible">
							<RemoveGuildMod
								mod={{ avatar: mod.avatar, id: mod.id, username: mod.username }}
								open={true}
								handleRemove={() => handleRemoveMod(mod.id)}
							/>
						</div>
						<RemoveGuildMod
							mod={{ avatar: mod.avatar, id: mod.id, username: mod.username }}
							open={menu.hover === mod.id}
							handleRemove={() => handleRemoveMod(mod.id)}
						/>
					</>
				)}
				<div className="flex gap-3 items-center rounded-lg p-2 bg-neutral-900/50 w-full">
					<div className="h-12 w-12">
						<Avatar
							className="w-12 h-12"
							src={`https://cdn.discordapp.com/avatars/${mod.id}/${mod.avatar}.png`}
						/>
					</div>
					<span className="font-semibold text-lg">
						{mod.username === "" ? mod.id : mod.username}
					</span>
				</div>
			</motion.div>
		)
	);
}
