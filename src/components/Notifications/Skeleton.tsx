import { Input } from "@nextui-org/input";
import { MdOutlineSync } from "react-icons/md";
import { useLanguage } from "../../hooks/useLanguage";

export default function NotificationsSkeleton() {
    const l = useLanguage();

    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-3xl">{l.notifications.title}</h1>
                <span className="text-neutral-300">{l.notifications.description}</span>
            </div>
            <div className="flex w-full h-full gap-1">
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} type="text" label="Filtrar notificações" />
                <button
                    className="w-14 bg-neutral-800 rounded-lg items-center flex justify-center
                            group hover:bg-neutral-700 transition disabled:hover:bg-neutral-800 disabled:opacity-50"
                >
                    <MdOutlineSync
                        size={20}
                    />
                </button>
            </div>
            <div className="px-2 p-3 rounded-lg bg-neutral-800 w-48 h-10 animate-pulse"></div>
            <div className="flex flex-col gap-2 w-full">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 w-full bg-neutral-800 rounded-lg p-3">
                        <div className="bg-neutral-700 h-4 rounded-lg w-1/2 animate-pulse"></div>
                        <div className="bg-neutral-700 h-4 rounded-lg w-3/4 animate-pulse"></div>
                        <div className="w-32 h-3 bg-neutral-700 rounded-full animate-pulse"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}