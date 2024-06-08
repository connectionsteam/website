import ConnectionsSkeleton from "../../ConnectionsSkeleton";

export default function GuildSkeleton() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-4 w-full flex-col">
                <span className="font-bold text-xl">Servidor</span>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 w-full">
                    <div className="w-12 h-12 bg-neutral-700 rounded-full animate-pulse"></div>
                    <div className="flex flex-col gap-2 text-start">
                        <div className="bg-neutral-700 h-6 rounded-lg animate-pulse w-36"></div>
                        <div className="bg-neutral-700 h-4 rounded-lg animate-pulse w-64"></div>
                    </div>
                </div>
                <div className="flex gap-2 rounded-lg w-full flex-col">
                    <div className="font-bold text-xl">Conexões</div>
                    <div className="grid grid-cols-3 gap-3 w-full">
                        <ConnectionsSkeleton key={Math.random()} />
                    </div>
                </div>
            </div>
        </div>
    );
}