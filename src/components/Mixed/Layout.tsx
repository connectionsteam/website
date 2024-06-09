import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center text-white">
            <div className="flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 tablet:px-3 mt-28">
                {children}
            </div>
        </div>
    );
}