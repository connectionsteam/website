import DefaultLayout from "@/components/Mixed/Layout";
import { useLanguage } from "@/hooks/useLanguage";
import { BsDiscord } from "react-icons/bs";

const { NEXT_PUBLIC_AUTH_LINK } = process.env;

export default function Login() {
    const l = useLanguage();

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center w-full">
                <div className="p-6 bg-neutral-800 rounded-lg flex gap-3 flex-col">
                    <h1 className="font-bold text-xl">{l.login.title}</h1>
                    <div>{l.login.description}</div>
                    <a
                        href={NEXT_PUBLIC_AUTH_LINK}
                        className="p-3 rounded-lg bg-[#5865F2] items-center flex gap-3 max-w-56 justify-center font-semibold transition cursor-pointer hover:-translate-y-1" 
                    >
                        <BsDiscord size={22} />
                        <span>{l.login.discord}</span>
                    </a>
                </div>
            </div>
        </DefaultLayout>
    );
}