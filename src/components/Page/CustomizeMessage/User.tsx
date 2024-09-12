import { LuFile } from "react-icons/lu";
import { useLanguage } from "../../../hooks/useLanguage";
import Avatar from "../../Mixed/Avatar";
import { InitialPageConnectionFlags as flagsType } from "../../../types";

export interface Props {
	avatar: string;
	username: string;
	hour: string;
	flags?: flagsType[];
}

export default function UserEmbed({ avatar, username, hour }: Props) {
	const l = useLanguage();

	return (
		<div className="flex gap-3 p-2 h-full items-center">
			<div className="flex items-start gap-2">
				<div className="min-w-10 min-h-10">
					<Avatar src={avatar} className="w-10 h-10" />
				</div>
				<div className="flex flex-col text-start">
					<div className="flex gap-1 items-center">
						<span className="font-bold">{username}</span>
						<span className="text-neutral-400 text-xs mt-1">
							{l.home.embeds.hour} {hour}
						</span>
					</div>
					<div className="flex flex-col ">
						{l.home.conversation.spyei.message}
						<span>😃😁</span>
						<a
							className="text-blue-500 underline"
							href="https://squarecloud.app/"
							target="_blank"
							rel="noreferrer"
						>
							https://squarecloud.app/
						</a>
						<div
							className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg 
flex-col border-neutral-700 border-2 mt-1"
						>
							<LuFile size={18} />
							<span className="text-neutral-300 text-sm">{l.home.file}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
