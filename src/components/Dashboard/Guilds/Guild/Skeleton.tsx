export default function GuildSkeleton() {
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="flex mb-1 bg-neutral-800 rounded-lg p-1 gap-4 items-center w-full">
                <div className="px-4 rounded-lg py-2 bg-neutral-700 h-10 w-32 flex items-center">
                    <div className="rounded-lg py-2 bg-neutral-600 h-3 w-full px-4"></div>
                </div>
                <div className="px-4 rounded-lg py-2 bg-neutral-700 h-3 w-14"></div>
                <div className="px-4 rounded-lg py-2 bg-neutral-700 h-3 w-20"></div>
                <div className="px-4 rounded-lg py-2 bg-neutral-700 h-3 w-20"></div>
            </div>
            <div className="bg-neutral-800 rounded-lg gap-4 flex flex-col w-full p-6">
                <div className="w-full rounded-lg bg-neutral-800 transition flex flex-col gap-4">
                    <div className="bg-neutral-700 rounded-full animate-pulse w-32 h-5"></div>
                    <div className="flex gap-3">
                        <div className="w-16 h-16 bg-neutral-700 rounded-full animate-pulse"></div>
                        <div className="flex gap-2 flex-col">
                            <div className="bg-neutral-700 h-6 rounded-full animate-pulse w-64 mobile:w-44"></div>
                            <div className="bg-neutral-700 h-4 rounded-full animate-pulse w-36 mobile:w-24"></div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mobile:flex-col">
                    <div className="flex flex-col gap-2">
                        <div className="bg-neutral-700 rounded-full animate-pulse w-40 h-6"></div>
                        <div className="bg-neutral-700 rounded-full animate-pulse w-full h-4"></div>
                        <div className="flex flex-col gap-2">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex gap-2 items-center bg-neutral-900/50 rounded-lg p-3 w-[360px] mobile:w-full h-16">
                                    <div className="rounded-full animate-pulse w-12 mobile:min-w-12 h-12 bg-neutral-700"></div>
                                    <div className="flex flex-col gap-2 text-start mobile:w-full">
                                        <div className="bg-neutral-700 h-5 rounded-full animate-pulse w-36 mobile:w-full"></div>
                                        <div className="bg-neutral-700 h-4 rounded-full animate-pulse w-56 mobile:w-[80%]"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                    <div className="bg-neutral-700 rounded-full animate-pulse w-32 h-6"></div>
                    <div className="bg-neutral-700 rounded-full animate-pulse w-full h-4"></div>
                        <div className="flex w-full">
                            <div className="flex gap-2 items-center bg-neutral-900/50 rounded-lg p-3 w-full">
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="bg-neutral-700 h-5 rounded-full animate-pulse w-[80%]"></div>
                                    <div className="bg-neutral-700 h-4 rounded-full animate-pulse w-[60%]"></div>
                                    <div className="bg-neutral-700 h-4 rounded-full animate-pulse w-[80%]"></div>
                                    <div className="bg-neutral-700 h-3 rounded-full animate-pulse w-[40%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}