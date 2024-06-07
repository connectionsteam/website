"use client"
import { LanguageContext } from "@/contexts/Language";
import { BackgroundBeams } from "../Mixed/Beams";
import { useContext } from "react";
import { languages } from "@/locale";

export default function Page() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex w-full max-w-[1100px] justify-center items-center flex-col gap-3 z-10">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">Connections</h1>
                <p className="text-neutral-300 text-xl text-center">{languages[language].home.description}</p>
            </div>
            <BackgroundBeams />
        </div>
    )
}