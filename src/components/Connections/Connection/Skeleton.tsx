import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function ConnectionSkeleton() {
	return (
		<div className="w-full relative">
			<div
				className="p-3 h-full bg-neutral-800 rounded-lg transition mobile:gap-2
                    w-full flex items-start justify-center mobile:flex-col
                    mobile:items-center border-2 border-transparent"
			>
				<div className="flex gap-3 mobile:flex-col items-center flex-grow h-full">
					<div className="h-full flex items-center justify-center">
						<div className="w-16 h-16 bg-neutral-700 rounded-full animate-pulse" />
					</div>
					<div className="flex flex-col gap-2 items-start mobile:items-center">
						<div className="h-8 w-32 bg-neutral-700 rounded-full animate-pulse" />
						<div className="flex items-start text-start w-full break-words rounded-lg animate-pulse text-lg mobile:items-center mobile:text-center">
							<div className="h-6 w-full bg-neutral-700 rounded-full animate-pulse" />
						</div>
						<div className="text-neutral-300 px-2 bg-neutral-700 rounded-lg flex items-center justify-center transition animate-pulse">
							<div className="h-4 w-8 bg-neutral-600 rounded-lg" />
							<MdOutlineKeyboardArrowUp size={20} />
						</div>
					</div>
				</div>
				<div className="flex gap-2 mobile:w-full">
					<div className="p-2 bg-neutral-700 rounded-lg transition h-8 w-20 flex items-center animate-pulse"></div>
					<div className="p-2 bg-neutral-700 rounded-lg transition h-8 w-20 flex gap-2 items-center animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
