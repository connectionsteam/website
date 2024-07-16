import Footer from "@/components/Footer";
import "../app/globals.css";
import Header from "@/components/Header";
import Providers from "@/providers";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <main className={`${inter.className} bg-neutral-900 min-h-screen flex flex-col dark`}>
                <section className="flex flex-1 flex-col">
                    <Header />
                    <Component {...pageProps} />
                </section>
                <Footer />
            </main>
        </Providers>
    );
}