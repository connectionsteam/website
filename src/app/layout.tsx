import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Providers from "../providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
    themeColor: "#DB65FB",
};

export const metadata: Metadata = {
    title: "Connections",
    description: "Connections is a bot for connecting servers, it was designed to help move your server helping new users and new friends!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className={`${inter.className} bg-neutral-900 dark`}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}