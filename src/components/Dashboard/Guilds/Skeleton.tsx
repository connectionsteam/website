import { Input } from "@nextui-org/input";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";

export default function GuildsSkeleton() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="flex items-center justify-center text-white">
            <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-3xl">{languages[language].dashboard.guilds.title}</div>
                    <div className="text-neutral-300">{languages[language].dashboard.guilds.description}</div>
                </div>
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} type="string" label={languages[language].dashboard.misc.filterConnections} />
                <div className="grid grid-cols-3 gap-3 w-full">
                    <ConnectionsSkeleton key={Math.random()} />
                </div>
            </div>
        </div>
    );
}