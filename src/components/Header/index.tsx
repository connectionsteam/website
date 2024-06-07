"use client"
import { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import Underline from "../Mixed/Underline";
import { FaX } from "react-icons/fa6";

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement | null>(null);

    const handleRecallDrawer = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsDrawerOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <header className="w-screen flex justify-center text-white fixed z-50 tablet:px-2">
            <div className="mt-2 flex gap-4 justify-between items-center w-full max-w-[1100px] p-3 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg tablet:mr-0">
                <Link onClick={handleRecallDrawer} className="transition duration-300" href="/">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">Connections</h1>
                </Link>
                <div className="flex gap-4 justify-center text-lg font-bold tablet:hidden">
                    <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Dashboard</Underline></Link>
                    <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Premium</Underline></Link>
                    <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Support</Underline></Link>
                </div>
                <button className="flex gap-2 justify-center items-center tablet:hidden p-1 transition hover:bg-black rounded-lg">
                    <span className="font-bold">Spyei</span>
                    <Image className="rounded-full" width={34} height={34} alt="Spyei avatar" src="https://cdn.discordapp.com/avatars/955095844275781693/4007e7943493138d10aeb5d6e64e481c.png" />
                </button>
                <button onClick={() => setIsDrawerOpen(true)} className="tabletdesk:hidden">
                    <RiMenu3Line fill="#fff" size={30} />
                </button>
            </div>
            <div className={`fixed top-0 right-0 w-full h-full bg-opacity-50 z-40 transition-all transform text-black ${isDrawerOpen ? "translate-x-0 backdrop-blur-sm bg-black bg-opacity-20" : "translate-x-full bg-opacity-0"}`}>
                <div ref={drawerRef} className="fixed top-0 right-0 w-80 h-full bg-white p-6">
                    <button onClick={() => setIsDrawerOpen(false)} className="text-black mb-4"><FaX size={20} /></button>
                    <div className="flex gap-4 justify-center text-lg flex-col">
                        <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Dashboard</Underline></Link>
                        <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Premium</Underline></Link>
                        <Link onClick={handleRecallDrawer} className="transition duration-300 group ease-in-out" href="/dashboard"><Underline>Support</Underline></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}