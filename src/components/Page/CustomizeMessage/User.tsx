import { LuFile } from "react-icons/lu";
import { useLanguage } from "../../../hooks/useLanguage";
import Avatar from "../../Mixed/Avatar";
import { InitialPageConnectionFlags as flagsType } from "../../../types";
import Image from "next/image";

export interface Props {
	avatar: string;
	username: string;
	hour: string;
	flags?: flagsType[];
	file?: File | null;
	setFile: (file: File | null) => void;
}

export default function UserEmbed({
	avatar,
	username,
	hour,
	file,
	setFile,
}: Props) {
	const l = useLanguage();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;

		const selectedFile = files ? files[0] : null;

		setFile(selectedFile);
	};

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
					<div className="flex flex-col">
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
						<label className="flex items-center gap-2 mt-1 cursor-pointer">
							{file ? (
								file.type === "image/png" ? (
									<Image
										className="rounded-lg"
										width={200}
										height={200}
										src={URL.createObjectURL(file)}
										alt={file.name}
									/>
								) : (
									<div className="p-3 py-4 flex gap-2 items-center border-neutral-700 border-2 rounded-lg">
										<LuFile size={18} />
										<span className="text-neutral-300 text-sm">
											{file.name.length > 20
												? file.name.slice(0, 20) + "..."
												: file.name}
										</span>
									</div>
								)
							) : (
								<div className="p-3 py-4 flex gap-2 items-center border-neutral-700 border-2 rounded-lg">
									<LuFile size={18} />
									<span className="text-neutral-300 text-sm">
										{l.home.file}
									</span>
								</div>
							)}
							<input
								onChange={handleFileChange}
								type="file"
								className="hidden"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
