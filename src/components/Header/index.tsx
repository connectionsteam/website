"use client"
import { useContext, useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import Underline from "../Mixed/Underline";
import { FaX } from "react-icons/fa6";
import AuthUser from "./User";
import ChooseLanguage from "./Language";
import { languages } from "@/locale";
import { LanguageContext } from "@/contexts/Language";
import { useIsClient } from "@/contexts/Client";

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const { language } = useContext(LanguageContext);
    const isClient = useIsClient();

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
            <div className="mt-2 flex gap-4 items-center w-full max-w-[1110px] p-1 px-2 tablet:p-2 tablet:mr-0 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg">
                <Link className="transition duration-300" href="/">
                    <h1 className="text-2xl p-2 tablet:p-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
                        Connections
                    </h1>
                </Link>
                <div className="flex gap-4 justify-center text-lg font-bold tablet:hidden">
                    <Link className="transition duration-300 group ease-in-out" href="/premium"><Underline>Premium</Underline></Link>
                    <a className="transition duration-300 group ease-in-out" href="https://discord.gg/RXBRraTWeY" about="_blank">
                        <Underline>{languages[language].home.header.support}</Underline>
                    </a>
                    <Link className="transition duration-300 group ease-in-out" href="/docs">
                        <Underline>{languages[language].home.header.documentation}</Underline>
                    </Link>
                    <Link className="transition duration-300 group ease-in-out" href="/connections">
                        <Underline>{languages[language].dashboard.connections.title}</Underline>
                    </Link>
                </div>
                <div className="w-full flex justify-end gap-1">
                    <AuthUser key={0} handleRecallDrawer={handleRecallDrawer} type="desktop" />
                    <ChooseLanguage />
                </div>
                <button onClick={() => setIsDrawerOpen(true)} className="tabletdesk:hidden">
                    <RiMenu3Line fill="#fff" size={30} />
                </button>
            </div>
            <div className={`fixed top-0 right-0 w-full h-full bg-opacity-50 z-40 transition-all transform text-white ${isDrawerOpen ? "translate-x-0 backdrop-blur-sm bg-black bg-opacity-20" : "translate-x-full bg-opacity-0"}`}>
                <div ref={drawerRef} className="fixed top-0 right-0 w-80 h-full bg-neutral-900 p-6">
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-white mb-4 flex justify-end w-full">
                        <FaX size={20} />
                    </button>
                    <AuthUser key={0} handleRecallDrawer={handleRecallDrawer} type="mobile" />
                    <div className="flex gap-4 justify-center text-lg flex-col">
                        <Link
                            onClick={handleRecallDrawer}
                            className="transition duration-300 group ease-in-out"
                            href="/dashboard"
                        >
                            <Underline>Premium</Underline>
                        </Link>
                        <a
                            onClick={handleRecallDrawer}
                            className="transition duration-300 group ease-in-out"
                            href="https://discord.gg/RXBRraTWeY"
                            about="_blank"
                        >
                            <Underline>{languages[language].home.header.support}</Underline>
                        </a>
                        <Link
                            className="transition duration-300 group ease-in-out"
                            href="/docs"
                        >
                            <Underline>{languages[language].home.header.documentation}</Underline>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}