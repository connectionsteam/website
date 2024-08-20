export default function TeamSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="bg-neutral-800 p-3 rounded-lg w-full">
                <div className="flex gap-3 items-center">
                    <div className="h-20 w-20">
                        <div className="min-w-20 min-h-20 rounded-full animate-pulse bg-neutral-700"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-6 w-44 rounded-full bg-neutral-700 animate-pulse"></div>
                        <div className="h-4 w-32 rounded-full bg-neutral-700 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center gap-2">
                <div className="bg-neutral-800 p-3 rounded-lg flex items-center justify-center">
                    <div className="bg-neutral-700 w-24 h-5 rounded-full animate-pulse"></div>
                </div>
                <div className="bg-neutral-700 w-28 h-5 rounded-full animate-pulse"></div>
                <div className="bg-neutral-700 w-20 h-5 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg w-full flex gap-4 flex-col">
                <div className="flex flex-col gap-2">
                    <div className="animate-pulse bg-neutral-700 rounded-full w-40 h-8"></div>
                    <div className="animate-pulse bg-neutral-700 rounded-full w-full h-4"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 flex-col">
                        <div className="bg-neutral-700 animate-pulse rounded-full h-5 w-32"></div>
                        <div className="bg-neutral-900/50 animate-pulse p-4 rounded-lg h-12 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {Array(3).fill(0).map((_, index) => (
                            <div key={index} className="bg-neutral-900/50 animate-pulse rounded-lg p-3 w-full flex gap-3">
                                <div className="h-12 w-12">
                                    <div className="min-w-12 min-h-12 rounded-full animate-pulse bg-neutral-700"></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="animate-pulse h-6 rounded-full w-32 bg-neutral-700"></div>
                                    <span className="h-3 rounded-full animate-pulse w-48 bg-neutral-700"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}