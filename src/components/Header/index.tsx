"use client";
import { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import Underline from "../Mixed/Underline";
import { FaX } from "react-icons/fa6";
import AuthUser from "./User";
import ChooseLanguage from "./Language";
import { useLanguage } from "../../hooks/useLanguage";

export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const drawerRef = useRef<HTMLDivElement | null>(null);
	const l = useLanguage();

	const handleRecallDrawer = () => {
		setIsDrawerOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				drawerRef.current &&
				!drawerRef.current.contains(event.target as Node)
			) {
				setIsDrawerOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="w-screen flex justify-center text-white tablet:px-2 fixed top-1 inset-x-0 max-w-[1100px] mx-auto z-50 px-1">
			<div className="mt-2 flex gap-4 items-center w-full p-1 px-2 tablet:p-2 bg-neutral-800 backdrop-blur-sm bg-opacity-70 rounded-lg">
				<Link className="transition duration-300" href="/">
					<h1 className="text-2xl p-2 tablet:p-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
						Connections
					</h1>
				</Link>
				<div className="flex gap-4 justify-center text-lg font-bold tablet:hidden">
					<Link
						className="transition duration-300 group ease-in-out"
						href="/premium"
					>
						<Underline premium>Premium</Underline>
					</Link>
					<Link
						className="transition duration-300 group ease-in-out"
						href="/promote"
					>
						<Underline promoted>Promoted</Underline>
					</Link>
					<a
						className="transition duration-300 group ease-in-out"
						href="https://discord.gg/RXBRraTWeY"
						target="_blank" rel="noreferrer"
					>
						<Underline>{l.home.header.support}</Underline>
					</a>
					<a
						className="transition duration-300 group ease-in-out"
						href="https://connections-b7efc2e5.mintlify.app"
						target="_blank" rel="noreferrer"
					>
						<Underline>{l.home.header.documentation}</Underline>
					</a>
					<Link
						className="transition duration-300 group ease-in-out"
						href="/connections"
					>
						<Underline>{l.dashboard.connections.title}</Underline>
					</Link>
				</div>
				<div className="w-full flex justify-end gap-1">
					<AuthUser handleRecallDrawer={handleRecallDrawer} type="desktop" />
					<ChooseLanguage mobile />
				</div>
				<button
					onClick={() => setIsDrawerOpen(true)}
					className="tabletdesk:hidden"
				>
					<RiMenu3Line fill="#fff" size={30} />
				</button>
			</div>
			<div
				className={`fixed top-0 right-0 w-full h-full bg-opacity-50 z-40 transition-all transform text-white ${isDrawerOpen ? "translate-x-0 backdrop-blur-sm bg-black bg-opacity-20" : "translate-x-[150%] bg-opacity-0"}`}
			>
				<div
					ref={drawerRef}
					className="fixed top-0 right-0 w-80 h-full bg-neutral-900 p-6"
				>
					<button
						onClick={() => setIsDrawerOpen(false)}
						className="text-white flex justify-end w-full"
					>
						<FaX size={20} />
					</button>
					<div className="flex gap-2 items-center">
						<AuthUser handleRecallDrawer={handleRecallDrawer} type="mobile" />
						<ChooseLanguage />
					</div>
					<div className="flex gap-4 justify-center text-lg flex-col">
						<Link
							onClick={handleRecallDrawer}
							className="transition duration-300 group ease-in-out"
							href="/dashboard"
						>
							<Underline premium>Premium</Underline>
						</Link>
						<Link
							onClick={handleRecallDrawer}
							className="transition duration-300 group ease-in-out"
							href="/promote"
						>
							<Underline promoted>Promoted</Underline>
						</Link>
						<a
							onClick={handleRecallDrawer}
							className="transition duration-300 group ease-in-out"
							href="https://discord.gg/RXBRraTWeY"
							target="_blank" rel="noreferrer"
						>
							<Underline>{l.home.header.support}</Underline>
						</a>
						<a
							className="transition duration-300 group ease-in-out"
							target="_blank"
							href="https://connections-b7efc2e5.mintlify.app" rel="noreferrer"
						>
							<Underline>{l.home.header.documentation}</Underline>
						</a>
						<Link
							className="transition duration-300 group ease-in-out"
							href="/connections"
						>
							<Underline>{l.dashboard.connections.title}</Underline>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
