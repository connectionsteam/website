import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import { useContext } from "react";

export default function ConnectionsSkeletonC() {
    const { language } = useContext(LanguageContext);
    
    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-4 w-full flex-col">
                <span className="font-bold text-xl">{languages[language].dashboard.connections.title}</span>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 w-full">
                    <div className="w-12 h-12 bg-neutral-700 rounded-full animate-pulse"></div>
                    <div className="flex flex-col gap-2 text-start">
                        <div className="bg-neutral-700 h-6 rounded-lg animate-pulse w-36"></div>
                        <div className="bg-neutral-700 h-4 rounded-lg animate-pulse w-64"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}