import Link from "next/link";
import Underline from "../Mixed/Underline";
import { BsDiscord } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 w-full items-center border-t-1 border-neutral-700 mt-10 text-white">
            <div className="max-w-[1100px] flex w-full tablet:px-3 py-4">
                <div className="flex w-full gap-6 mobile:flex-col">
                    <div className="flex flex-col flex-grow mobile:flex-grow-0 gap-1">
                        <div className="flex flex-col">
                            <Link className="transition duration-300" href="/">
                                <h1 className="text-2xl tablet:p-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
                                    Connections
                                </h1>
                            </Link>
                            <span className="text-neutral-300 text-sm">Connections, o bot que está à frente</span>
                        </div>
                        <a
                            href="https://discord.gg/RXBRraTWeY"
                            target="_blank"
                        >
                            <BsDiscord className="hover:fill-[#5764F1] transition" size={21} />
                        </a>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg mb-1">Links Úteis</div>
                            <a
                                target="_blank"
                                className="text-neutral-300 transition duration-300 group ease-in-out"
                                href="https://discord.com/oauth2/authorize?client_id=1243234162077470802"
                            >
                                <Underline>Adicionar Connections</Underline>
                            </a>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline premium>Premium</Underline>
                            </Link>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline>Painel</Underline>
                            </Link>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline>Conexões</Underline>
                            </Link>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg mb-1">Legal</div>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/privacy"
                            >
                                <Underline>Política de Privacidade</Underline>
                            </Link>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline>Termos de Uso</Underline>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}