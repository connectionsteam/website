import Footer from "../components/Footer";
import "../app/globals.css";
import Header from "../components/Header";
import Providers from "../providers";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Connections",
    description: "",
    keywords: "connectionsbot, connections, connectionsdiscordbot, discordobt",
    icons: {
        icon: ["/favicon.ico"],
        apple: ["/apple-touch-icon.png"],
        shortcut: ["/apple-touch-icon.png"]
    },
    openGraph: {
        images: ["https://public-blob.squarecloud.dev/670825404415737866/initialpage_lvplri5o-652c.png"],
        title: "Elo Job Infinity - Elo Job - Duo Boost",
        url: "https://elojobinfinity.com.br/",
        siteName: "Elo Infinity",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Elo Job Infinity - Elo Job - Duo Boost",
        description: "Conheça nossos serviços de Elojob (Elo Boost) e Duojob (Duo Boost). Em seguida, suba de elo de forma segura e rápida com a Elo Job Infinity!",
        images: "https://public-blob.squarecloud.dev/670825404415737866/initialpage_lvplri5o-652c.png",
    },
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<main
				className={`${inter.className} bg-neutral-900 min-h-screen flex flex-col dark`}
			>
				<section className="flex flex-1 flex-col">
					<Header />
					<Component {...pageProps} />
				</section>
				<Footer />
			</main>
		</Providers>
	);
}
