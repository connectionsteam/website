import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import FlagBr from "../Flags/br";
import FlagEn from "../Flags/en";
import { useContext, useEffect, useState } from "react";
import { useIsClient } from "@/contexts/Client";
import { LanguageContext } from "@/contexts/Language";

export default function ChooseLanguage() {
    const isClient = useIsClient();
    const [language, setLanguage] = useState("en-US");
    const [selectedLanguage, setSelectedLanguage] = useState(language);
    const { setLanguage: setLocalLanguage } = useContext(LanguageContext);

    const handleLanguage = (language: string) => {
        if (isClient) {
            localStorage.setItem("language", language);
        }

        setLocalLanguage(language as any);
        setSelectedLanguage(language);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || "en-US";

        setLanguage(storedLanguage);
        setSelectedLanguage(storedLanguage);
    }, []);

    return (
        <Dropdown className="bg-neutral-800 text-white rounded-lg outline-none">
            <DropdownTrigger className="focus:bg-neutral-900">
                <button className="outline-none flex gap-2 justify-center items-center tablet:hidden p-2 transition hover:bg-neutral-900 rounded-lg">
                    <div className="w-8">{selectedLanguage === "pt-BR" ? <FlagBr /> : <FlagEn />}</div>
                </button>
            </DropdownTrigger>
            <DropdownMenu className="bg-neutral-800 rounded-lg outline-none">
                <DropdownItem onClick={() => handleLanguage("pt-BR")} className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none w-11">
                    <FlagBr />
                </DropdownItem>
                <DropdownItem onClick={() => handleLanguage("en-US")} className="bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition outline-none w-11 mt-1">
                    <FlagEn />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}