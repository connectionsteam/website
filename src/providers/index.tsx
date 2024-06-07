"use client"
import { IsClientProvider } from "@/contexts/Client";
import { LanguageProvider } from "@/contexts/Language";
import { UserProvider } from "@/contexts/User";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <LanguageProvider>
                <IsClientProvider>
                    {children}
                </IsClientProvider>
            </LanguageProvider>
        </UserProvider>
    );
}