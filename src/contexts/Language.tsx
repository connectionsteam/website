"use client"
import React, { createContext, useState, ReactNode, useEffect, FC } from "react";
import { LanguageContextProps, LanguageType } from "@/types";
import { useIsClient } from "./Client";

const replaceLanguage = (text: string) => {
    const texts = {
        pt: "pt-BR",
        en: "en-US",
    };

    return texts[text as keyof typeof texts] || "en-US";
};

export const LanguageContext = createContext<LanguageContextProps>({
    language: "en-US",
    setLanguage: () => null,
});

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const isClient = useIsClient();

    const navLanguage = replaceLanguage(isClient ? window.navigator.language.split("-")[0] : "en-US");

    const [language, setLanguage] = useState<LanguageType>("en-US");

    useEffect(() => {
        const checkLanguage = () => {
            const actualLanguage = localStorage.getItem("language") as LanguageType;

            if (!actualLanguage || !["pt-BR", "en-US"].includes(actualLanguage)) {
                localStorage.setItem("language", navLanguage);
                setLanguage(navLanguage as LanguageType);
            } else {
                setLanguage(actualLanguage);
            }
        }

        checkLanguage();
    }, [navLanguage]);

    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};