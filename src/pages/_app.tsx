import "../app/globals.css";
import Header from "@/components/Header";
import Providers from "@/providers";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <section className={`${inter.className} bg-neutral-900 min-h-screen dark`}>
            <Providers>
                <Header />
                <Component {...pageProps} />
            </Providers>
        </section>
    );
}