import { UserContext } from "@/contexts/User";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useContext } from "react";
import { LuLink, LuLogOut, LuServer } from "react-icons/lu";
import Cookies from "js-cookie";
import { useIsClient } from "@/contexts/Client";
import axios from "axios";
import Link from "next/link";

const url = "https://discord.com/oauth2/authorize?client_id=1021810246462738432&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=identify+guilds";

export default function AuthUser({ type }: { type: "mobile" | "desktop" }) {
    const { user } = useContext(UserContext);
    const isClient = useIsClient();

    const handleLogout = () => {
        isClient ? window.location.href = "/" : null;

        Cookies.remove("discord_user");

        const logoutUser = async () => {
            await axios.get("/api/auth/logout", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${Cookies.get("discord_user")}`
                }
            });
        };

        logoutUser();
    }

    return type === "mobile" ? (
        user ? (
            <Dropdown className="bg-neutral-800 text-white rounded-lg">
                <DropdownTrigger className="focus:bg-neutral-900 mb-4">
                    <button className="flex gap-2 justify-center items-center transition p-3 hover:bg-neutral-900 border-neutral-800 border-2 rounded-lg w-full">
                        <span className="font-bold flex flex-grow">{user.username}</span>
                        <Avatar
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            classNames={{
                                base: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500",
                                icon: "text-black/80",
                            }}
                            showFallback
                        />
                    </button>
                </DropdownTrigger>
                <DropdownMenu className="bg-neutral-800 rounded-lg">
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <Link href="/connections" className="flex items-center justify-start min-w-[240px] py-2 gap-3">
                            <LuLink />
                            <span>Conexões</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <Link href="/guilds" className="flex items-center min-w-[240px] py-2 gap-3">
                            <LuServer />
                            <span>Servidores</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <button onClick={handleLogout} className="flex items-center min-w-[240px] py-2 gap-3">
                            <LuLogOut/>
                            <span>Sair</span>
                        </button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ) : <a href={url} className="flex gap-2 justify-center items-center transition p-2 hover:bg-neutral-900 border-neutral-800 border-2 rounded-lg w-full mb-4">Login</a>
    ) : (
        user ? (
            <Dropdown className="bg-neutral-800 text-white rounded-lg outline-none">
                <DropdownTrigger className="focus:bg-neutral-900">
                    <button className="outline-none flex gap-2 justify-center items-center tablet:hidden p-2 transition hover:bg-neutral-900 rounded-lg">
                        <span className="font-bold">{user.username}</span>
                        <Avatar
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            classNames={{
                                base: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500",
                                icon: "text-black/80",
                            }}
                            showFallback
                        />
                    </button >
                </DropdownTrigger >
                <DropdownMenu className="bg-neutral-800 rounded-lg outline-none">
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <Link href="/connections" className="flex items-center justify-start min-w-28 py-2 gap-3">
                            <LuLink />
                            <span>Conexões</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <Link href="/guilds" onClick={handleLogout} className="flex items-center min-w-28 py-2 gap-3">
                            <LuServer />
                            <span>Servidores</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none" key="exit">
                        <button onClick={handleLogout} className="flex items-center min-w-28 py-2 gap-3">
                            <LuLogOut/>
                            <span>Sair</span>
                        </button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ) : <a href={url} className="tablet:hidden flex gap-2 justify-center items-center transition p-3 m-[2px] px-4 hover:bg-neutral-800 border-neutral-800 border-2 rounded-lg">Login</a>
    )
}