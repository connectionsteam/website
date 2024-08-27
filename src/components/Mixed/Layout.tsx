import type { ReactNode } from "react";

export default function DefaultLayout({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	return (
		<div className="flex items-center justify-center text-white">
			<div
				className={`${className} flex w-full max-w-[1100px] items-start flex-col gap-4 z-10 px-2 mt-24`}
			>
				{children}
			</div>
		</div>
	);
}
