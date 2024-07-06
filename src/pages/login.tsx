import DefaultLayout from "@/components/Mixed/Layout";
import { BsDiscord } from "react-icons/bs";

export default function Login() {
    return (
        <DefaultLayout>
            <div className="flex items-center justify-center w-full">
                <div className="p-6 bg-neutral-800 rounded-lg flex gap-3 flex-col">
                    <h1 className="font-bold text-xl">Login no Connections</h1>
                    <div>Faça login no connections e desbloqueie o uso da dashboard e muito mais!</div>
                    <a
                        href={process.env.AUTH_LINK}
                        className="p-3 rounded-lg bg-[#5865F2] items-center flex gap-3 max-w-56 justify-center font-semibold transition cursor-pointer hover:-translate-y-1" 
                    >
                        <BsDiscord size={22} />
                        <span>Entrar com discord</span>
                    </a>
                </div>
            </div>
        </DefaultLayout>
    );
}