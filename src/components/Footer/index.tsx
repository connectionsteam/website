import Link from "next/link";
import Underline from "../Mixed/Underline";
import { BsDiscord } from "react-icons/bs";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
    const l = useLanguage();

    return (
        <footer className="flex flex-col gap-2 w-full items-center border-t-1 border-neutral-700 mt-10 text-white">
            <div className="max-w-[1100px] flex w-full tablet:px-3 py-4">
                <div className="flex w-full gap-6 mobile:flex-col">
                    <div className="flex flex-col flex-grow mobile:flex-grow-0 gap-1">
                        <div className="flex flex-col">
                            <span className="font-bold text-lg max-w-52">
                                {l.home.footer.title}
                            </span>
                        </div>
                        <a
                            href="https://discord.gg/RXBRraTWeY"
                            target="_blank"
                        >
                            <BsDiscord className="hover:fill-[#5764F1] transition" size={21} />
                        </a>
                    </div>
                    <div className="flex items-start gap-8 mobile:flex-col">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg mb-1">{l.home.footer.links.title}</div>
                            <a
                                target="_blank"
                                className="text-neutral-300 transition duration-300 group ease-in-out"
                                href="https://discord.com/oauth2/authorize?client_id=1243234162077470802"
                            >
                                <Underline>{l.home.footer.links.addConnections}</Underline>
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
                                <Underline>{l.home.footer.links.panel}</Underline>
                            </Link>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline>{l.home.footer.links.connections}</Underline>
                            </Link>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg mb-1">{l.home.footer.legal.title}</div>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/privacy"
                            >
                                <Underline>{l.home.footer.legal.policy}</Underline>
                            </Link>
                            <Link
                                className="transition duration-300 group ease-in-out text-neutral-300"
                                href="/terms"
                            >
                                <Underline>{l.home.footer.legal.terms}</Underline>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}