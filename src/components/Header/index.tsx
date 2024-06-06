"use client"
import { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement | null>(null);

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
            <div className="mt-2 flex gap-4 justify-between items-center w-full max-w-[1100px] p-3 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg tablet:mr-0">
                <Link className="text-azul transition duration-300" href="/">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">Connections</h1>
                </Link>
                <div className="flex gap-4 justify-center text-lg font-bold tablet:hidden">
                    <Link className="text-azul transition duration-300" href="/dashboard">Dashboard</Link>
                </div>
                <button onClick={() => setIsDrawerOpen(true)} className="tabletdesk:hidden">
                    <RiMenu3Line fill="#fff" size={30} />
                </button>
            </div>
            <div className={`fixed top-0 right-0 w-full h-full bg-opacity-50 z-40 transition-all transform text-black ${isDrawerOpen ? "translate-x-0 backdrop-blur-sm bg-black bg-opacity-20" : "translate-x-full bg-opacity-0"}`}>
                <div ref={drawerRef} className="fixed top-0 right-0 w-80 h-full bg-white p-6">
                    <div>oi</div>
                </div>
            </div>
        </header>
    )
}