"use client"
import { IsClientProvider } from "@/contexts/Client";
import { LanguageProvider } from "@/contexts/Language";
import { UserProvider } from "@/contexts/User";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <UserProvider>
                <LanguageProvider>
                    <IsClientProvider>
                        {children}
                    </IsClientProvider>
                </LanguageProvider>
            </UserProvider>
        </NextUIProvider>
    );
}