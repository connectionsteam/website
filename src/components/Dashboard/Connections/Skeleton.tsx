export default function ConnectionsSkeletonC() {
    return (
        <div className="p-2 bg-neutral-800 rounded-lg w-full justify-center flex flex-col tablet:max-w-none">
            <div className="flex items-center justify-center flex-col gap-3 w-full">
                <div className="flex items-center flex-col justify-center gap-4 w-full">
                    <div className="h-20 w-20 bg-neutral-700 rounded-full animate-pulse"></div>
                    <div className="bg-neutral-700 h-8 w-40 rounded-lg animate-pulse"></div>
                    <div className="transition w-full p-5 rounded-lg bg-neutral-900/50 animate-pulse"></div>
                </div>
                <div className="transition w-full p-8 rounded-lg bg-neutral-900/50 animate-pulse"></div>
                <div className="bg-neutral-700 w-full p-6 rounded-lg animate-pulse"></div>
                <div className="flex flex-col bg-neutral-700 bg-opacity-10 p-3 rounded-lg w-full gap-2">
                    <div className="h-5 w-24 bg-neutral-700 rounded-full animate-pulse"></div>
                    <div className="h-5 w-32 pr-6 bg-neutral-700 rounded-full animate-pulse"></div>
                    <div className="flex gap-2 tablet:max-w-none justify-center items-center bg-neutral-700 transition p-6 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}