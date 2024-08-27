import DefaultLayout from "../../../../components/Mixed/Layout";

export default function ConnectionGuildPageSkeleton() {
	return (
		<DefaultLayout>
			<div className="relative w-full">
				<div className="w-full rounded-lg bg-neutral-800 p-6 transition flex flex-col gap-4">
					<div className="flex gap-4 items-center">
						<div className="flex gap-2 items-center bg-neutral-900/50 rounded-lg w-16 h-9 animate-pulse"></div>
						<div className="bg-neutral-700 h-6 w-56 rounded-lg animate-pulse"></div>
					</div>
					<div className="flex flex-col gap-7">
						<div className="flex gap-3">
							<div className="w-16 h-16 bg-neutral-700 rounded-full animate-pulse"></div>
							<div className="flex gap-2 flex-col">
								<div className="bg-neutral-700 h-6 w-32 rounded-lg animate-pulse"></div>
								<div className="bg-neutral-700 h-4 w-48 rounded-lg animate-pulse"></div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="bg-neutral-700 h-6 w-32 rounded-lg animate-pulse"></div>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-1">
									<div className="bg-neutral-700 h-5 w-36 rounded-full animate-pulse"></div>
									<div className="bg-neutral-700 h-4 w-48 rounded-full animate-pulse"></div>
								</div>
								<div className="flex items-center gap-1">
									<div className="bg-neutral-700 h-5 w-20 rounded-full animate-pulse"></div>
									<div className="bg-neutral-700 h-4 w-52 rounded-full animate-pulse"></div>
								</div>
								<div className="flex items-center gap-1">
									<div className="bg-neutral-700 h-5 w-24 rounded-full animate-pulse"></div>
									<div className="bg-neutral-900 h-5 w-48 rounded-full animate-pulse"></div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="bg-neutral-700 h-6 w-32 rounded-lg animate-pulse"></div>
							<div className="flex flex-col gap-3">
								<div className="flex flex-col gap-3">
									<div className="flex flex-col">
										<div className="bg-neutral-700 h-6 w-48 rounded-lg animate-pulse"></div>
										<div className="bg-neutral-700 h-4 w-full rounded-lg animate-pulse mt-2"></div>
									</div>
									<div className="w-full">
										<div className="flex gap-2 flex-col relative z-20">
											<div className="flex flex-wrap gap-2 p-3 rounded-lg bg-neutral-900 min-h-14">
												{Array(3)
													.fill(0)
													.map((_, index) => (
														<div
															key={index}
															className="px-3 p-1 rounded-lg bg-neutral-700 flex items-center gap-2 animate-pulse w-24 h-8"
														></div>
													))}
												<div className="outline-none bg-transparent h-8 w-full bg-neutral-700 rounded-lg animate-pulse"></div>
											</div>
											<div className="p-3 bg-neutral-900 transition hover:bg-neutral-900/50 rounded-lg max-w-28 justify-center flex gap-2 items-center animate-pulse h-10"></div>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<div className="flex flex-col gap-1">
										<div className="bg-neutral-700 h-6 w-32 rounded-lg animate-pulse"></div>
										<div className="bg-neutral-700 h-4 w-full rounded-lg animate-pulse mt-2"></div>
									</div>
									<div className="gap-4 grid grid-cols-3 tablet:grid-cols-1 items-start">
										{Array(6)
											.fill(0)
											.map((_, index) => (
												<div
													key={index}
													className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-900 h-full place-content-center"
												>
													<div className="flex items-center gap-1">
														<div className="relative">
															<div className="w-14 h-8 bg-neutral-700 rounded-full animate-pulse"></div>
														</div>
														<div className="bg-neutral-700 h-4 w-32 rounded-lg animate-pulse ml-2"></div>
													</div>
													<div className="bg-neutral-700 h-4 w-48 rounded-lg animate-pulse mt-1"></div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
