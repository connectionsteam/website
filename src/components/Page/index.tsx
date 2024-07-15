"use client"
import { LanguageContext } from "@/contexts/Language";
import { useContext } from "react";
import { languages } from "@/locale";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function Page() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="flex items-center justify-center flex-col text-white">
            <div className="flex w-full max-w-[1100px] justify-center items-center flex-col gap-3 z-10 tablet:px-3 h-screen">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">Connections</h1>
                <p className="text-neutral-300 text-xl text-center">{languages[language].home.description}</p>
                <div className="absolute bottom-2">
                    <MdKeyboardDoubleArrowDown className="text-neutral-300 text-3xl animate-bounce" />
                </div>
            </div>
            <div>oi</div>
        </div>
    )
}