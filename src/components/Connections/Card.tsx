import type { ConnectionsPageStructure } from "../../types";
import Link from "next/link";
import Avatar from "../Mixed/Avatar";
import abbreviateNumber from "../../utils/abbreviate";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useLanguage } from "../../hooks/useLanguage";

export default function ConnectionPageCard({
	connection,
}: { connection: ConnectionsPageStructure }) {
	const l = useLanguage();

	return (
		<Link
			className={`p-3 rounded-lg bg-neutral-800 items-center flex
            transition hover:bg-neutral-700 relative ${"promotingSince" in connection ? "border-2 border-rose-600" : ""}`}
			href={`/connection/${connection.name}`}
			key={connection.name}
		>
			{"promotingSince" in connection && (
				<div className="absolute px-2 font-semibold -top-3 text-sm flex rounded-full bg-rose-600 right-3">
					{l.connection.promoted}
				</div>
			)}
			<div className="flex gap-3">
				{connection.icon && (
					<Avatar src={connection.icon} className="w-12 h-12 rounded-full" />
				)}
				<div className="flex flex-col">
					<span className="font-bold text-lg">{connection.name}</span>
					<div
						className="text-neutral-300 rounded-lg 
                    transition text-sm flex items-center"
					>
						<span className="bg-neutral-700 pl-2 rounded-l-lg">
							{abbreviateNumber(
								connection.votes?.reduce(
									(total, { count }) => total + count,
									0,
								),
							) ?? 0}
						</span>
						<div
							className="h-full bg-neutral-700 flex 
                        items-center justify-center px-1 rounded-r-lg"
						>
							<MdOutlineKeyboardArrowUp size={16} />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
