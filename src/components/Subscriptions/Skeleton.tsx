import { Skeleton } from "@nextui-org/react";

export default function SubscriptionSkeleton() {
	const fill = 5;

	return (
		<div className="flex gap-3 w-full items-start justify-center tablet:flex-col">
			<div className="p-0.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-700 w-full">
				<div className="flex flex-col gap-3 w-full items-center justify-center bg-neutral-800 p-3 rounded-lg">
					<div className="w-full flex items-center justify-cebter flex-col">
						<div className="h-8 bg-neutral-700 rounded-lg animate-pulse w-32 mb-2" />
						<div className="h-5 bg-neutral-700 rounded-lg animate-pulse w-48" />
					</div>
					<div className="rounded-lg p-3 bg-neutral-700 w-full h-10 animate-pulse" />
					<div className="flex flex-col gap-2 w-full overflow-y-auto max-h-48">
						{Array(fill)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 transition w-full"
								>
									<div className="min-w-12 h-12 rounded-full bg-neutral-700 animate-pulse" />
									<div className="flex flex-col gap-1 w-full">
										<Skeleton className="bg-neutral-700 h-5 w-[50%] animate-pulse rounded-lg" />
										<Skeleton className="bg-neutral-700 h-4 w-[90%] animate-pulse rounded-lg" />
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className="p-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-700 w-full">
				<div className="flex flex-col gap-3 w-full items-center justify-center bg-neutral-800 p-3 rounded-lg">
					<div className="w-full flex items-center justify-center flex-col">
						<div className="h-8 bg-neutral-700 rounded-lg animate-pulse w-32 mb-2" />
						<div className="h-5 bg-neutral-700 rounded-lg animate-pulse w-48" />
					</div>
					<div className="rounded-lg p-3 bg-neutral-700 w-full h-10 animate-pulse" />
					<div className="flex flex-col gap-2 w-full overflow-y-auto max-h-48">
						{Array(fill)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 transition w-full"
								>
									<div className="min-w-12 h-12 rounded-full bg-neutral-700 animate-pulse" />
									<div className="flex flex-col gap-1 w-full">
										<Skeleton className="bg-neutral-700 h-5 w-[50%] animate-pulse rounded-lg" />
										<Skeleton className="bg-neutral-700 h-4 w-[90%] animate-pulse rounded-lg" />
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
