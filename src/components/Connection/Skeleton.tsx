import { RiHashtag } from "react-icons/ri";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import DefaultLayout from "../Mixed/Layout";
import ConnectionSkeleton from "../Connections/Connection/Skeleton";

export default function ConnectionPageSkeleton() {
	return (
		<DefaultLayout>
			<div className="bg-neutral-800 rounded-lg w-full flex flex-col gap-4 p-6">
				<div className="flex w-full tablet:flex-col tablet:gap-4">
					<div className="flex gap-4 items-center flex-grow mobile:flex-col">
						<div className="w-24 h-24 bg-neutral-700 rounded-full animate-pulse" />
						<div className="flex flex-col gap-2 items-start mobile:items-center">
							<div className="h-8 w-52 bg-neutral-700 rounded-full animate-pulse" />
							<div className="flex items-start text-start w-full break-words rounded-lg mobile:text-center">
								<div className="h-4 w-64 bg-neutral-700 rounded-lg animate-pulse" />
							</div>
							<div className="text-neutral-300 px-2 bg-neutral-700 rounded-lg animate-pulse flex items-center justify-center transition">
								<span className="h-4 w-8 bg-neutral-600 rounded-lg" />
								<MdOutlineKeyboardArrowUp size={20} />
							</div>
						</div>
					</div>
					<div className="flex gap-3 min-w-[450px] justify-start items-start tablet:min-w-full mobile:flex-col">
						<div className="h-12 w-full bg-neutral-700 rounded-lg animate-pulse" />
						<div className="h-12 w-full bg-neutral-700 rounded-lg animate-pulse" />
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="h-6 w-24 bg-neutral-700 rounded-full" />
					<div className="w-8 h-8 bg-neutral-700 rounded-full" />
					<div className="h-6 w-24 bg-neutral-700 rounded-full" />
				</div>
				<div className="flex items-center w-full gap-2">
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
				<div className="h-4 w-48 bg-neutral-700 rounded-full animate-pulse" />
			</div>
			<div className="flex flex-col gap-4 w-full">
				<div className="h-8 w-48 bg-neutral-700 rounded-full animate-pulse" />
				<div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-1">
					{Array(2)
						.fill(0)
						.map((_, index) => (
							<ConnectionSkeleton key={index} />
						))}
				</div>
			</div>
		</DefaultLayout>
	);
}
