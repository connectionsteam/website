import {
	ConnectedConnectionFlags,
	type ConnectedConnectionPayload,
	GuildPayload,
} from "../../../../types";
import { api } from "../../../../utils/api";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiX } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../../../../hooks/useLanguage";

interface Props {
	connection: ConnectedConnectionPayload;
	setConnection: (connection: ConnectedConnectionPayload) => void;
	guildId: string;
}

const regex_identifier = "RE_";

export default function BlockedWords({
	connection,
	setConnection,
	guildId,
}: Props) {
	const [words, setWords] = useState(connection.blockwords || []);
	const [word, setWord] = useState("");
	const [loading, setLoading] = useState({ loading: false, check: false });
	const [regex, setRegex] = useState({
		focus: false,
		modal: false,
		regex: "",
	});
	const l = useLanguage();

	const saveRegex = (regex: string) => {
		setRegex({
			modal: false,
			focus: false,
			regex: "",
		});
		return setWords([...words, regex_identifier + regex]);
	};

	const handleSaveWords = async () => {
		try {
			setLoading({ loading: true, check: false });

			await api.patch(`/guilds/${guildId}/connections/${connection.name}`, {
				blockwords: words,
			});

			setConnection({
				...connection,
				blockwords: words,
			});

			setLoading({ loading: false, check: true });

			setTimeout(() => {
				setLoading({ ...loading, check: false });
			}, 2000);
		} catch {}
	};

	const addNewWord = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		if (regex.modal && regex.focus) {
			return setRegex({
				...regex,
				modal: true,
				regex: value,
			});
		}

		if (value.trim().startsWith(regex_identifier)) {
			setWord("");
			return setRegex({
				...regex,
				modal: true,
				regex: "",
			});
		}

		setWord(value);

		if (value.trim().includes(",")) {
			const newWords = value
				.split(",")
				.map((w) => w.trim())
				.filter((w) => w.length > 0 && !words.includes(w));

			if (newWords.length > 0) {
				setWords([...words, ...newWords]);
			}

			setWord("");
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (regex.modal && regex.focus && event.key === "Enter") {
			return saveRegex(regex.regex.replace(regex_identifier, ""));
		}

		if (event.key === "Backspace" && word === "") {
			setWord(words.reverse()[0]);
			setWords(words.reverse().splice(0, words.length - 1));
		}
	};

	const removeWord = (word: string) => {
		setWords(words.filter((w) => w !== word));
	};

	const focusedInput = (focus: boolean) => () => {
		setRegex({
			...regex,
			focus,
		});
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col">
				<div className="text-lg">
					{l.dashboard.guilds.connections.blockedWords.title}
				</div>
				<span className="text-neutral-300">
					{l.dashboard.guilds.connections.blockedWords.description}
				</span>
			</div>
			<div className="w-full relative">
				{connection.flags.includes(ConnectedConnectionFlags.Frozen) && (
					<>
						<div
							className="bg-gradient-to-tr from-cyan-300 via-sky-200 to-sky-500 
                        absolute z-10 opacity-80 w-[25%] h-full rounded-l-lg"
						></div>
						<div
							className="bg-gradient-to-br from-sky-500 via-sky-200 to-cyan-300 
                        absolute z-10 opacity-80 left-[25%] w-[25%] h-full"
						></div>
						<div
							className="bg-gradient-to-tr from-cyan-300 via-sky-200 to-sky-500 
                        absolute z-10 opacity-80 left-[50%] w-[25%] h-full"
						></div>
						<div
							className="bg-gradient-to-br from-sky-500 via-sky-200 to-cyan-300 
                        absolute z-10 opacity-80 left-[75%] w-[25%] h-full rounded-r-lg"
						></div>
					</>
				)}
				<div className="flex gap-2 flex-col">
					<div className="flex flex-wrap gap-2 p-3 rounded-lg bg-neutral-900 min-h-14">
						<AnimatePresence>
							{words.map((word, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									className="px-3 p-1 rounded-lg bg-neutral-700 flex items-center gap-2"
								>
									<span>{word}</span>
									<button onClick={() => removeWord(word)}>
										<BiX
											className="hover:fill-red-500 hover:bg-neutral-800 
                                            transition rounded-full font-bold"
											size={23}
										/>
									</button>
								</motion.div>
							))}
						</AnimatePresence>
						<input
							className="outline-none bg-transparent"
							placeholder={l.dashboard.guilds.connections.blockedWords.type}
							type="text"
							value={word}
							onClick={focusedInput(false)}
							onKeyDown={handleKeyDown}
							onChange={addNewWord}
						/>
						{regex.modal && (
							<div className="flex gap-2 bg-neutral-800 rounded-lg p-0.5 pl-2">
								<input
									className="outline-none bg-transparent flex-grow flex"
									placeholder={l.dashboard.guilds.connections.blockedWords.type}
									type="text"
									value={regex.regex}
									onKeyDown={handleKeyDown}
									onChange={addNewWord}
									onClick={focusedInput(true)}
								/>
								<button
									className="p-2 text-sm bg-neutral-900 transition hover:bg-neutral-900/50 rounded-lg
                                    max-w-28 justify-center flex gap-2 items-center"
									onClick={() =>
										saveRegex(regex.regex.replace(regex_identifier, ""))
									}
								>
									<span>
										{l.dashboard.guilds.connections.blockedWords.save}
									</span>
								</button>
							</div>
						)}
					</div>
					<button
						className="p-3 bg-neutral-900 transition hover:bg-neutral-900/50 rounded-lg
                        max-w-28 justify-center flex gap-2 items-center"
						onClick={handleSaveWords}
					>
						<span>{l.dashboard.guilds.connections.blockedWords.save}</span>
						{loading.loading && (
							<AiOutlineLoading3Quarters className="animate-spin" size={18} />
						)}
						{loading.check && (
							<FaCheckCircle className="text-green-500" size={18} />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
