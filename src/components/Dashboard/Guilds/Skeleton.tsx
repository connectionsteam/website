import { Input } from "@nextui-org/input";
import ConnectionsSkeleton from "../ConnectionsSkeleton";

export default function GuildsSkeleton() {
    return (
        <div className="flex items-center justify-center text-white">
            <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-3xl">Servidores</div>
                    <div className="text-neutral-300">Selecione o servidor que deseja gerenciar</div>
                </div>
                <Input classNames={{
                    inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
                }} type="string" label="Filtrar conexão" />
                <div className="grid grid-cols-3 gap-3 w-full">
                    <ConnectionsSkeleton key={Math.random()} />
                </div>
            </div>
        </div>
    );
}