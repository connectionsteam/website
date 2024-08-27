import { UserContext } from "../../contexts/User";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { useContext } from "react";
import { LuBell, LuLayoutPanelTop, LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";
import { useIsClient } from "../../contexts/Client";
import axios from "axios";
import Link from "next/link";
import Avatar from "../Mixed/Avatar";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/useLanguage";
import { NotificationsContext } from "../../contexts/Notification";
import { BsStars } from "react-icons/bs";

export default function AuthUser({
	type,
	handleRecallDrawer,
}: { type: "mobile" | "desktop"; handleRecallDrawer: () => void }) {
	const { user } = useContext(UserContext);
	const isClient = useIsClient();
	const { pathname } = useRouter();
	const { notifications } = useContext(NotificationsContext);
	const l = useLanguage();

	const handleLogout = () => {
		isClient ? (window.location.href = "/") : null;

		Cookies.remove("discord_user");

		const logoutUser = async () => {
			await axios.get("/api/auth/logout", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${Cookies.get("discord_user")}`,
				},
			});
		};

		logoutUser();
	};

	return type === "mobile" ? (
		user ? (
			<Dropdown className="bg-neutral-800 text-white rounded-lg">
				<DropdownTrigger className="focus:bg-neutral-900 mb-4">
					<button className="flex gap-2 justify-center items-center transition p-3 hover:bg-neutral-700 border-neutral-800 border-2 rounded-lg w-full">
						<span className="font-bold flex flex-grow">{user.username}</span>
						<Avatar
							src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
						/>
					</button>
				</DropdownTrigger>
				<DropdownMenu className="bg-neutral-800 rounded-lg">
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="dash"
					>
						<Link
							onClick={handleRecallDrawer}
							href="/dashboard"
							className="flex items-center justify-start min-w-[140px] py-2 gap-3"
						>
							<LuLayoutPanelTop />
							<span>{l.home.header.menu.dashboard}</span>
						</Link>
					</DropdownItem>
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="subscripitns"
					>
						<Link
							onClick={handleRecallDrawer}
							href="/subscriptions"
							className="flex items-center justify-start min-w-[140px] py-2 gap-3"
						>
							<BsStars />
							<span>{l.home.header.menu.subscriptions}</span>
						</Link>
					</DropdownItem>
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="exit"
					>
						<button
							onClick={handleLogout}
							className="flex items-center min-w-[140px] py-2 gap-3"
						>
							<LuLogOut />
							<span>{l.home.header.menu.exit}</span>
						</button>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		) : (
			<a
				href={process.env.NEXT_PUBLIC_AUTH_LINK}
				className="flex gap-2 justify-center items-center transition p-2 hover:bg-neutral-700 border-neutral-700 border-2 rounded-lg w-full mb-4"
			>
				Login
			</a>
		)
	) : user ? (
		<div className="flex items-center gap-1">
			<Link
				href="/notifications"
				className="hover:bg-neutral-700 rounded-lg transition p-3 flex 
                        items-center justify-center relative"
			>
				{notifications?.length !== 0 && notifications ? (
					<div className="absolute top-0 right-0 bg-red-500 rounded-full h-3.5 w-3.5 flex text-center items-center justify-center">
						<span className="text-xs">
							{notifications.length > 9 ? "9+" : notifications.length}
						</span>
					</div>
				) : null}
				<LuBell
					fill={pathname === "/notifications" ? "#fff" : "transparent"}
					size={20}
				/>
			</Link>
			<Dropdown className="bg-neutral-800 text-white rounded-lg outline-none">
				<DropdownTrigger className="focus:bg-neutral-900">
					<button className="outline-none flex gap-2 justify-center items-center tablet:hidden p-2 transition hover:bg-neutral-700 rounded-lg">
						<span className="font-bold">{user.username}</span>
						<Avatar
							src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
						/>
					</button>
				</DropdownTrigger>
				<DropdownMenu className="bg-neutral-800 rounded-lg outline-none">
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="dash"
					>
						<Link
							href="/dashboard"
							className="flex items-center justify-start min-w-28 py-2 gap-3"
						>
							<LuLayoutPanelTop size={14} />
							<span>{l.home.header.menu.dashboard}</span>
						</Link>
					</DropdownItem>
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="subscripitns"
					>
						<Link
							onClick={handleRecallDrawer}
							href="/subscriptions"
							className="flex items-center justify-start min-w-[140px] py-2 gap-3"
						>
							<BsStars />
							<span>{l.home.header.menu.subscriptions}</span>
						</Link>
					</DropdownItem>
					<DropdownItem
						className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none"
						key="exit"
					>
						<button
							onClick={handleLogout}
							className="flex items-center min-w-28 py-2 gap-3"
						>
							<LuLogOut />
							<span>{l.home.header.menu.exit}</span>
						</button>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	) : (
		<a
			href={process.env.NEXT_PUBLIC_AUTH_LINK}
			className="tablet:hidden flex gap-2 justify-center items-center transition p-3 m-[2px] px-4 hover:bg-neutral-800 border-neutral-800 border-2 rounded-lg"
		>
			Login
		</a>
	);
}
