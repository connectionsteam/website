import { motion, AnimatePresence } from "framer-motion";
import RemoveGuildMod from "./Menu";
import Avatar from "@/components/Mixed/Avatar";

interface Props {
    index: number;
    mod: { username: string, id: string, avatar: string };
    handleRemoveMod: (mod: string) => void;
    menu: { hover: string | null, removing: string | null };
    setMenu: (menu: { hover: string | null, removing: string | null }) => void;
}

export default function GuildModCard({ index, mod, handleRemoveMod, menu, setMenu }: Props) {
    return (
        <AnimatePresence key={index}>
            {menu.removing !== mod.id && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onMouseEnter={() => setMenu({ ...menu, hover: mod.id })}
                    onMouseLeave={() => setMenu({ ...menu, hover: "" })}
                    key={index}
                    className="w-full relative"
                >
                    <RemoveGuildMod
                        key={0}
                        mod={{ avatar: mod.avatar, id: mod.id, username: mod.username }}
                        open={menu.hover === mod.id}
                        handleRemove={() => handleRemoveMod(mod.id)}
                    />
                    <div className="flex gap-3 text-start rounded-lg p-3 bg-neutral-900/50 w-full">
                        <Avatar className="w-12 h-12" src={`https://cdn.discordapp.com/avatars/${mod.id}/${mod.avatar}.png`} />
                        <div className="flex flex-col">
                            <span className="font-semibold text-lg">{mod.username}</span>
                            <span className="text-neutral-300 text-sm">{mod.id}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}