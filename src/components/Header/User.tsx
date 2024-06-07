import { UserContext } from "@/contexts/User";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useContext } from "react";
import { LuLogOut } from "react-icons/lu";

export default function AuthUser({ type }: { type: "mobile" | "desktop" }) {
    const { user } = useContext(UserContext);

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
                    <DropdownItem className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition" key="exit">
                        <div className="flex items-center min-w-[240px] py-2">
                            <span className="flex flex-grow">Sair</span>
                            <LuLogOut />
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ) : <button className="flex gap-2 justify-center items-center transition p-2 hover:bg-neutral-900 border-neutral-800 border-2 rounded-lg w-full mb-4">Login</button>
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
                        <div className="flex items-center min-w-28 py-2">
                            <span className="flex flex-grow">Sair</span>
                            <LuLogOut />
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ) : <button className="tablet:hidden flex gap-2 justify-center items-center transition p-2 px-4 hover:bg-neutral-800 border-neutral-800 border-2 rounded-lg">Login</button>
    )
}