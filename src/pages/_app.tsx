import "../app/globals.css"
import Header from "@/components/Header";
import Providers from "@/providers";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <section className="bg-neutral-900">
            <Providers>
                <Header />
                <Component {...pageProps} />
            </Providers>
        </section>
    );
}