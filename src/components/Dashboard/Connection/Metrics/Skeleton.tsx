export default function ConnectionMetricsSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<div className="h-8 w-64 bg-neutral-700 animate-pulse rounded-full"></div>
					<div className="h-6 w-32 bg-neutral-700 animate-pulse rounded-full"></div>
				</div>
				<div className="h-4 w-80 bg-neutral-700 animate-pulse rounded-full"></div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-2">
					<div className="h-6 w-44 bg-neutral-700 animate-pulse rounded-full"></div>
					<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-4">
						<div className="h-4 w-48 bg-neutral-700 animate-pulse rounded-full"></div>
						<div className="h-6 w-64 bg-neutral-700 animate-pulse rounded-full"></div>
					</div>
				</div>
				<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-2">
					<div className="h-6 w-44 bg-neutral-700 animate-pulse rounded-full"></div>
					<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-4">
						<div className="h-4 w-48 bg-neutral-700 animate-pulse rounded-full"></div>
						<div className="h-6 w-64 bg-neutral-700 animate-pulse rounded-full"></div>
					</div>
				</div>
				<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-2">
					<div className="h-6 w-44 bg-neutral-700 animate-pulse rounded-full"></div>
					<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-4">
						<div className="h-4 w-48 bg-neutral-700 animate-pulse rounded-full"></div>
						<div className="h-6 w-64 bg-neutral-700 animate-pulse rounded-full"></div>
					</div>
				</div>
				<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-2">
					<div className="h-6 w-64 bg-neutral-700 animate-pulse rounded-full"></div>
					<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-4">
						<div className="h-4 w-48 bg-neutral-700 animate-pulse rounded-full"></div>
						<div className="h-48 w-full bg-neutral-700 animate-pulse rounded-lg"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
