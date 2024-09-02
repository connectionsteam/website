import { useRouter } from "next/router";
import { LanguageContext } from "../../../../contexts/Language";
import { languages } from "../../../../locale";
import type { ConnectionPayload, RequestPost } from "../../../../types";
import { api } from "../../../../utils/api";
import {
	type Dispatch,
	type SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
	post: RequestPost;
	setErrors: (value: string[]) => void;
	errors: string[];
	onClose: () => void;
	setConnections: Dispatch<SetStateAction<ConnectionPayload[]>>;
	connections: ConnectionPayload[];
}

export default function CreateConnection({
	post,
	setErrors,
	errors,
	connections,
	setConnections,
	onClose,
}: Props) {
	const [loading, setLoading] = useState(false);
	const { language } = useContext(LanguageContext);
	const router = useRouter();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				createConnection();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [post]);

	const createConnection = async () => {
		setLoading(true);
	
		const { name, description, icon, maxConnections } = post;
	
		const postBody: Partial<typeof post> = {
			name: name?.trim() || "",
			description: description?.trim() || "",
			icon: icon,
			maxConnections: maxConnections
				? Number.parseFloat(maxConnections.toString())
				: undefined,
		};

		for (const key in postBody) {
			if (postBody[key as keyof typeof postBody] === "") {
				delete postBody[key as keyof typeof postBody];
			}
		}
	
		if (!postBody.name || postBody.name.length < 1 || postBody.name.length > 16) {
			setErrors([...errors, "name"]);
			
			return setLoading(false);
		}
	
		if (postBody.description && (postBody.description.length < 20 || postBody.description.length > 50)) {
			setErrors([...errors, "description"]);
			
			return setLoading(false);
		}

		if (postBody.maxConnections && (postBody.maxConnections < 2 || postBody.maxConnections > 100)) {
			setErrors([...errors, "maxConnections"]);
			
			return setLoading(false);
		}

		try {
			const { data } = await api.put("/users/@me/connections", postBody);
	
			setLoading(false);
			setErrors([]);
			onClose();
			setConnections([...connections, data]);
			router.push(`/dashboard/connection/${data.name}`);
		} catch (error: any) {
			setLoading(false);

			if (error.response.data?.extra?.path?.includes("name")) {
				return setErrors([...errors, "invalidConnectionName"]);
			}

			const { code } = error.response.data;

			if (code === 2005) {
				return setErrors([...errors, "alreadyExists"]);
			}
		}
	};

	return (
		<div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
			<button
				disabled={loading}
				onClick={createConnection}
				className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}
			>
				{loading ? (
					<div className="flex gap-2 items-center w-full justify-center">
						<AiOutlineLoading3Quarters className="animate-spin" />
						<span className="font-semibold">
							{
								languages[language].dashboard.connections
									.createConnectionLoading
							}
						</span>
					</div>
				) : (
					<span className="font-semibold">
						{languages[language].dashboard.connections.createConnection}
					</span>
				)}
			</button>
		</div>
	);
}
