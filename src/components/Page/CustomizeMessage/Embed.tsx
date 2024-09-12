import { useLanguage } from "../../../hooks/useLanguage";
import { InitialPageConnectionFlags as flagsType } from "../../../types";
import Image from "next/image";
import ConnectionsEmbed from "./Connections";
import UserEmbed from "./User";

export interface CustomizeUserProps {
	avatar: string;
	username: string;
	hour: string;
	flags?: flagsType[];
}

interface Props {
	flags: flagsType[];
	author: CustomizeUserProps;
}

export default function EditedConnectionsEmbed({ flags, author }: Props) {
	const l = useLanguage();

	return (
		<div className="flex gap-2 w-full tablet:flex-col items-start justify-center h-full">
			<div className="bg-neutral-800 p-3 rounded-lg flex flex-col gap-2 h-full w-full">
				<div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50">
					<Image
						width={40}
						height={40}
						src="/guilds/spyei.png"
						alt="Spyei's Guild"
						className="rounded-full"
					/>
					<span className="text-lg font-semibold">
						{l.home.conversation.spyei.server}
					</span>
				</div>
				<UserEmbed
					flags={flags}
					avatar={author.avatar}
					username={author.username}
					hour={author.hour}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full h-full">
				<div className="bg-neutral-800 p-3 rounded-lg flex flex-col gap-3 h-full w-[125%] tablet:w-full">
					<div className="flex gap-2 items-center w-full rounded-lg p-2 bg-neutral-900/50">
						<Image
							width={40}
							height={40}
							src="/guilds/unreal.png"
							alt="Unreal's Guild"
							className="rounded-full"
						/>
						<span className="text-lg font-semibold">
							{l.home.conversation.unreal.server}
						</span>
					</div>
					<ConnectionsEmbed flags={flags} author={author} hour={author.hour} />
				</div>
			</div>
		</div>
	);
}
