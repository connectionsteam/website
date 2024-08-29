import { Switch } from "@nextui-org/switch";

export default function GuildSkeleton() {
	return (
		<section className="flex flex-col gap-2 w-full">
			<div className="bg-neutral-800 p-3 rounded-lg w-full flex items-center mobile:flex-col mobile:gap-4">
				<div className="flex gap-3 items-center flex-grow mobile:flex-col">
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
				<div className="bg-neutral-700 w-20 h-5 rounded-full animate-pulse"></div>
				<div className="bg-neutral-700 w-28 h-5 rounded-full animate-pulse"></div>
			</div>
			<div className="bg-neutral-800 p-4 rounded-lg w-full flex gap-4 flex-col">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<div className="rounded-full animate-pulse bg-neutral-700 h-5 w-24"></div>
							<div className="rounded-full animate-pulse bg-neutral-700 h-4 w-44"></div>
						</div>
						<div className="h-12 w-28 rounded-lg animate-pulse bg-neutral-900/50"></div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<div className="rounded-full animate-pulse bg-neutral-700 h-5 w-36"></div>
							<div className="rounded-full animate-pulse bg-neutral-700 h-4 w-56"></div>
						</div>
						<div className="h-12 w-40 rounded-lg animate-pulse bg-neutral-900/50"></div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<div className="rounded-full animate-pulse bg-neutral-700 h-5 w-44"></div>
							<div className="rounded-full animate-pulse bg-neutral-700 h-4 w-64"></div>
						</div>
						<div className="gap-4 grid grid-cols-3 tablet:grid-cols-1 items-start">
							{Array.from({ length: 11 })
								.fill(null)
								.map((_, index) => (
									<div
										key={index}
										className="flex flex-col gap-2 p-3 rounded-lg bg-neutral-900/50 
										h-full place-content-center"
									>
										<div className="flex items-center gap-1">
											<Switch color="secondary" />
											<div className="bg-neutral-700 animate-pulse rounded-full h-5 w-24"></div>
										</div>
										<div className="bg-neutral-700 animate-pulse rounded-full h-3 w-full"></div>
									</div>
								))}
						</div>
					</div>
					<div>
						<div className="flex gap-2 mobile:flex-col">
							<div className="flex flex-col gap-2">
								<div className="bg-neutral-700 rounded-full animate-pulse w-40 h-6"></div>
								<div className="bg-neutral-700 rounded-full animate-pulse w-full h-4"></div>
								<div className="flex flex-col gap-2">
									{Array(3)
										.fill(0)
										.map((_, i) => (
											<div
												key={i}
												className="flex gap-2 items-center bg-neutral-900/50 rounded-lg p-3 w-[360px] mobile:w-full h-16"
											>
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
				</div>
			</div>
		</section>
	);
}
