export default function ConnectionPageSkeleton() {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="bg-neutral-800 p-3 rounded-lg w-full flex items-center mobile:flex-col mobile:gap-4">
				<div className="flex gap-3 items-center flex-grow">
					<div className="h-20 w-20">
						<div className="min-w-20 min-h-20 rounded-full animate-pulse bg-neutral-700"></div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="h-6 w-44 rounded-full bg-neutral-700 animate-pulse"></div>
					</div>
				</div>
				<div className="bg-neutral-700 animate-pulse rounded-lg h-12 w-48"></div>
			</div>
			<div className="w-full flex items-center gap-2">
				<div className="bg-neutral-800 p-3 rounded-lg flex items-center justify-center">
					<div className="bg-neutral-700 w-24 h-5 rounded-full animate-pulse"></div>
				</div>
				<div className="bg-neutral-700 w-28 h-5 rounded-full animate-pulse"></div>
			</div>
			<div className="bg-neutral-800 p-4 rounded-lg w-full flex gap-4 flex-col">
				<div className="flex flex-col gap-2">
					<div className="animate-pulse bg-neutral-700 rounded-full w-40 h-8"></div>
					<div className="animate-pulse bg-neutral-700 rounded-full w-72 h-4"></div>
				</div>
				<div className="flex flex-col gap-2 w-full">
					{Array(3)
						.fill(0)
						.map((_, index) => (
							<div key={index} className="flex flex-col gap-1">
								<div className="rounded-full animate-pulse bg-neutral-700 h-5 w-24"></div>
								<div className="h-14 w-full rounded-lg animate-pulse bg-neutral-900/50"></div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
