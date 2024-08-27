import { Switch } from "@nextui-org/switch";
import { RiHashtag } from "react-icons/ri";

export default function ConnectionPageSkeleton() {
	return (
		<div className="w-full p-6 rounded-lg bg-neutral-800 text-white">
			<div className="flex gap-5 flex-col">
				<div className="flex gap-3 mobile:items-center mobile:flex-col">
					<div className="h-20 w-20 rounded-full bg-neutral-700 animate-pulse"></div>
					<div className="flex flex-col gap-2 mobile:items-center">
						<div className="bg-neutral-700 rounded-full animate-pulse w-32 h-7"></div>
						<div className="bg-neutral-700 rounded-full animate-pulse w-72 mobile:w-full h-4"></div>
						<div className="flex items-center w-full gap-2 flex-wrap">
							{Array(Math.floor(Math.random() * 3) + 2)
								.fill(0)
								.map((_, index) => (
									<div
										key={index}
										className="p-1 px-2 flex gap-2 items-center bg-neutral-700 rounded-lg animate-pulse"
									>
										<RiHashtag fill="#d946ef" />
										<div className="h-4 w-12 bg-neutral-600 rounded-lg" />
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-1 items-center">
						<Switch color="secondary" />
						<div className="w-44 rounded-full bg-neutral-700 animate-pulse h-6"></div>
					</div>
					<div className="w-full rounded-full bg-neutral-700 animate-pulse h-4"></div>
					<div className="w-4/5 rounded-full bg-neutral-700 animate-pulse h-4"></div>
				</div>
				<div className="w-full p-4 bg-red-500/30 rounded-lg flex-col gap-3 flex">
					<div className="flex flex-col gap-1">
						<div className="bg-neutral-700 rounded-full animate-pulse w-40 h-7"></div>
						<div className="w-full rounded-full bg-neutral-700 animate-pulse h-4"></div>
						<div className="w-4/5 rounded-full bg-neutral-700 animate-pulse h-4"></div>
					</div>
					<div className="bg-red-500 rounded-lg h-11 w-32 px-2 flex items-center">
						<div className="w-full animate-pulse bg-neutral-700 rounded-full h-4"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
