import { Skeleton } from "@nextui-org/react";

export default function ConnectionsSkeleton({ fill = 4 }) {
	return Array(fill)
		.fill(0)
		.map((_, index) => (
			<div
				key={index}
				className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800 transition w-full"
			>
				<div className="w-16 h-12 rounded-full bg-neutral-700 animate-pulse" />
				<div className="flex flex-col gap-1 w-full">
					<Skeleton className="bg-neutral-700 h-5 w-[50%] animate-pulse rounded-lg"></Skeleton>
					<Skeleton className="bg-neutral-700 h-4 w-[90%] animate-pulse rounded-lg"></Skeleton>
				</div>
			</div>
		));
}
